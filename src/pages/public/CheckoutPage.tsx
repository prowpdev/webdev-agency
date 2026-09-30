import React, { useState } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { StorageService } from '../../services/storageService';
import { CHECKOUT_ADDONS } from '../../data/mockData';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { params, navigate } = useNavigation();
  const { success, error } = useToast();
  const { register } = useAuth();

  const services = StorageService.getServices();
  const pricingPackages = StorageService.getPricing();

  // Find initial package or service from params
  const initialPackage =
    pricingPackages.find((p) => p.id === params.package) ||
    pricingPackages[1]; // default Business Flagship ($999)

  const [selectedPackage, setSelectedPackage] = useState(initialPackage);
  const [addons, setAddons] = useState(CHECKOUT_ADDONS);

  // Client Details
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    notes: '',
  });

  // Mock Payment info
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '4242 •••• •••• 4242',
    expDate: '12/28',
    cvc: '888',
    nameOnCard: 'Alex Morgan',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);

  // Calculations
  const basePrice = selectedPackage.price;
  const addonsTotal = addons
    .filter((a) => a.selected)
    .reduce((sum, a) => sum + a.price, 0);
  const discount = 0;
  const total = basePrice + addonsTotal - discount;

  const toggleAddon = (id: string) => {
    setAddons((prev) =>
      prev.map((a) => (a.id === id ? { ...a, selected: !a.selected } : a))
    );
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientInfo.name.trim() || !clientInfo.email.trim()) {
      error('Missing Details', 'Please complete your name and work email.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      // 1. Create registered client or link
      const clientUser = register(clientInfo.name, clientInfo.email, clientInfo.company);

      // 2. Create project in active projects list
      const newProject = StorageService.addProject({
        name: `${clientInfo.company || clientInfo.name} - ${selectedPackage.name}`,
        clientName: clientInfo.name,
        clientEmail: clientInfo.email,
        clientId: clientUser.id,
        service: selectedPackage.name,
        category: 'Websites',
        budget: total,
        startDate: new Date().toISOString().split('T')[0],
        deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'Planning',
        progress: 10,
        assignedDeveloper: 'Marcus Vance',
        description: `Project initialized via online checkout. Addons: ${addons
          .filter((a) => a.selected)
          .map((a) => a.name)
          .join(', ') || 'None'}. Notes: ${clientInfo.notes}`,
      });

      // 3. Create order record
      const order = StorageService.addOrder({
        orderNumber: `ORD-${Date.now().toString().slice(-5)}`,
        customerName: clientInfo.name,
        customerEmail: clientInfo.email,
        customerCompany: clientInfo.company || 'Direct Client',
        serviceName: selectedPackage.name,
        packageTier: selectedPackage.name,
        addons: addons.filter((a) => a.selected).map((a) => a.name),
        total,
        status: 'Paid',
        notes: clientInfo.notes || undefined,
        assignedProject: newProject.id,
      });

      // 4. Create paid invoice
      const invoice = StorageService.addInvoice({
        invoiceNumber: `INV-${Date.now().toString().slice(-4)}`,
        clientId: clientUser.id,
        clientName: clientInfo.name,
        clientEmail: clientInfo.email,
        clientCompany: clientInfo.company || 'Client Organization',
        projectId: newProject.id,
        projectName: newProject.name,
        amount: total,
        status: 'Paid',
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date().toISOString().split('T')[0],
        paidAt: new Date().toISOString().split('T')[0],
        items: [
          {
            description: `${selectedPackage.name} Project Package`,
            quantity: 1,
            unitPrice: basePrice,
            total: basePrice,
          },
          ...addons
            .filter((a) => a.selected)
            .map((a) => ({
              description: `Add-on: ${a.name}`,
              quantity: 1,
              unitPrice: a.price,
              total: a.price,
            })),
        ],
      });

      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });

      setCompletedOrder({
        orderId: `ORD-${Date.now().toString().slice(-6)}`,
        project: newProject,
        invoice,
        total,
      });

      setIsProcessing(false);
      success('Order Confirmed!', 'Your project workspace and client portal have been generated.');
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Order & Kickoff</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          Service Configurator & Secure Checkout
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Configure your package, select modular add-ons, and secure your production slot with immediate client portal
          provisioning.
        </p>
      </div>

      {completedOrder ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-emerald-300 shadow-md text-center space-y-6 animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 font-display">Project Order Confirmed!</h2>
            <p className="text-sm text-slate-600">
              Payment of <span className="text-emerald-700 font-bold font-mono">${completedOrder.total.toLocaleString()}</span>{' '}
              cleared via simulated Stripe card checkout.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-lg mx-auto text-xs space-y-2.5 text-slate-600">
            <div className="flex justify-between">
              <span>Order Reference:</span>
              <span className="text-slate-900 font-mono font-semibold">{completedOrder.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span>Invoice Generated:</span>
              <span className="text-emerald-700 font-mono font-semibold">
                {completedOrder.invoice.invoiceNumber} (Status: Paid)
              </span>
            </div>
            <div className="flex justify-between">
              <span>Initialized Project:</span>
              <span className="text-slate-900 font-semibold">{completedOrder.project.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Lead Architect:</span>
              <span className="text-indigo-600 font-semibold">{completedOrder.project.assignedDeveloper}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/portal/projects')}
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Enter Your Client Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Configuration Steps */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Package Selection */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                1. Select Core Service Tier
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pricingPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedPackage.id === pkg.id
                        ? 'bg-indigo-50/60 border-indigo-600 shadow-xs ring-1 ring-indigo-600/20'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900">{pkg.name}</span>
                      <span className="text-sm font-extrabold text-slate-900 font-mono">
                        ${pkg.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{pkg.tagline}</p>
                    <span className="text-[10px] text-indigo-600 font-mono font-medium mt-2 block">
                      {pkg.deliveryTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Add-ons */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                2. Recommended Performance Add-ons
              </h3>

              <div className="space-y-2.5">
                {addons.map((addon) => (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors cursor-pointer ${
                      addon.selected
                        ? 'bg-indigo-50/70 border-indigo-600 text-slate-900'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addon.selected}
                        onChange={() => {}}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-semibold block text-slate-900">{addon.name}</span>
                        <span className="text-[11px] text-slate-500 block">{addon.description}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold font-mono shrink-0 pl-3 text-slate-900">
                      +${addon.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Client Details */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                3. Customer & Project Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="Morgan Design Labs"
                    value={clientInfo.company}
                    onChange={(e) => setClientInfo({ ...clientInfo, company: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kickoff Brief & Key URLs (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Provide initial project notes, competitors you admire, or repository links..."
                    value={clientInfo.notes}
                    onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Summary & Payment Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6 sticky top-24">
            <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span>Order Summary</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </h3>

            {/* Line items */}
            <div className="space-y-3 text-xs divide-y divide-slate-100">
              <div className="flex justify-between pt-1">
                <span className="text-slate-700">{selectedPackage.name}</span>
                <span className="font-mono font-bold text-slate-900">${basePrice.toLocaleString()}</span>
              </div>

              {addons
                .filter((a) => a.selected)
                .map((a) => (
                  <div key={a.id} className="flex justify-between pt-2">
                    <span className="text-slate-500 truncate pr-2">Add-on: {a.name}</span>
                    <span className="font-mono text-slate-800">+${a.price}</span>
                  </div>
                ))}

              <div className="flex justify-between pt-3 text-sm font-bold">
                <span className="text-slate-900">Total Investment</span>
                <span className="text-emerald-700 font-mono text-xl">${total.toLocaleString()}</span>
              </div>
            </div>

            {/* Mock Payment form */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-indigo-600" />
                  Simulated Stripe Checkout
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-mono font-medium">
                  Test Sandbox
                </span>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">Card Number</label>
                <input
                  type="text"
                  value={paymentDetails.cardNumber}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500 block mb-0.5">Expires</label>
                  <input
                    type="text"
                    value={paymentDetails.expDate}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, expDate: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-0.5">CVC</label>
                  <input
                    type="text"
                    value={paymentDetails.cvc}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cvc: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-900"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95"
            >
              {isProcessing ? (
                <span>Authorizing Payment...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Pay ${total.toLocaleString()}</span>
                </>
              )}
            </button>

            <div className="text-[11px] text-slate-500 text-center space-y-1">
              <div>Instant client portal account created upon payment.</div>
              <div>30-day money-back milestone satisfaction guarantee.</div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

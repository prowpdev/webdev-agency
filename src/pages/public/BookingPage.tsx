import React, { useState } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { StorageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import confetti from 'canvas-confetti';
import {
  Calendar as CalendarIcon,
  Clock,
  Globe,
  CheckCircle2,
  Video,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const BookingPage: React.FC = () => {
  const { params, navigate } = useNavigation();
  const { success, error } = useToast();

  const meetingTypes = [
    {
      title: 'Discovery Call',
      duration: '30 mins',
      desc: 'Discuss your project vision, target audience, scope, and technical architecture.',
    },
    {
      title: 'Project Kickoff',
      duration: '45 mins',
      desc: 'Review contract specifications, milestones, and shared client portal onboarding.',
    },
    {
      title: 'Design Review',
      duration: '45 mins',
      desc: 'Collaborative walkthrough of Figma wireframes, component systems, and responsive layouts.',
    },
    {
      title: 'Development Review',
      duration: '30 mins',
      desc: 'Live staging demo and acceptance testing for active code deliverables.',
    },
  ];

  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '11:45 AM',
    '02:00 PM',
    '03:30 PM',
    '04:45 PM',
  ];

  const timezones = [
    'UTC-7 (America/Los_Angeles - Pacific)',
    'UTC-4 (America/New_York - Eastern)',
    'UTC+0 (Europe/London - GMT)',
    'UTC+2 (Europe/Berlin - CET)',
    'UTC+8 (Asia/Singapore - SGT)',
  ];

  const [selectedMeetingType, setSelectedMeetingType] = useState<any>(meetingTypes[0].title);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState<string>(timeSlots[1]);
  const [selectedTimezone, setSelectedTimezone] = useState<string>(timezones[0]);

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [notes, setNotes] = useState(params.service ? `Inquiry regarding ${params.service}` : '');

  const [bookingConfirmed, setBookingConfirmed] = useState<any | null>(null);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName.trim() || !clientEmail.trim()) {
      error('Missing Information', 'Please provide your name and email address.');
      return;
    }

    const newBooking = StorageService.addBooking({
      clientName,
      clientEmail,
      clientCompany: clientCompany || undefined,
      meetingType: selectedMeetingType,
      serviceType: params.service || 'General Web Consultation',
      date: selectedDate,
      time: selectedTime,
      timezone: selectedTimezone,
      notes: notes || undefined,
    });

    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    setBookingConfirmed(newBooking);
    success('Consultation Booked!', `Scheduled for ${selectedDate} at ${selectedTime}.`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Direct Calendar</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          Book an Engineering Consultation
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Select an available slot with Marcus Vance (Lead Technical Architect) and our senior engineering team. No sales
          fluff—pure technical and scoping discussion.
        </p>
      </div>

      {bookingConfirmed ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-emerald-300 shadow-md text-center space-y-6 animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">Meeting Confirmed!</h2>
            <p className="text-sm text-slate-600">
              A Google Meet invitation has been created and sent to{' '}
              <span className="text-indigo-600 font-mono font-medium">{bookingConfirmed.clientEmail}</span>.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto text-xs space-y-2.5 text-slate-600">
            <div className="flex justify-between">
              <span>Session:</span>
              <span className="text-slate-900 font-semibold">{bookingConfirmed.meetingType}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span className="text-slate-800 font-mono">{bookingConfirmed.date}</span>
            </div>
            <div className="flex justify-between">
              <span>Time:</span>
              <span className="text-slate-800 font-mono">
                {bookingConfirmed.time} ({bookingConfirmed.timezone.split(' ')[0]})
              </span>
            </div>
            <div className="flex justify-between">
              <span>Platform:</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Video className="w-3.5 h-3.5" /> Google Meet Video
              </span>
            </div>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Return Home
            </button>
            <button
              onClick={() => navigate('/portfolio')}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              View Our Work
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleBook} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Step 1: Meeting Type & Slot Selection */}
          <div className="lg:col-span-7 space-y-6">
            {/* Meeting Type */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                1. Select Consultation Focus
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {meetingTypes.map((type) => (
                  <div
                    key={type.title}
                    onClick={() => setSelectedMeetingType(type.title)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      selectedMeetingType === type.title
                        ? 'bg-indigo-50/70 border-indigo-600 shadow-xs ring-1 ring-indigo-600/20'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{type.title}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{type.duration}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{type.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                2. Select Date & Slot
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Date</label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Timezone</label>
                  <select
                    value={selectedTimezone}
                    onChange={(e) => setSelectedTimezone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  >
                    {timezones.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Available Timeslots</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2 text-xs font-mono rounded-lg transition-colors cursor-pointer border ${
                        selectedTime === slot
                          ? 'bg-indigo-600 border-indigo-600 text-white font-bold shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Contact Form */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              3. Attendee Information
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Marcus Aurelius"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Work Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="marcus@company.com"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization</label>
              <input
                type="text"
                placeholder="Roma Digital"
                value={clientCompany}
                onChange={(e) => setClientCompany(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Topic / Notes</label>
              <textarea
                rows={3}
                placeholder="Any specific questions, links to current sites, or tech stacks to discuss..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Confirm Video Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <p className="text-[10px] text-slate-500 text-center mt-2">
                Calendar invite with Google Meet link sent automatically upon confirmation.
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

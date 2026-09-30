import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { Booking, BookingStatus } from '../../types';
import { useToast } from '../../contexts/ToastContext';
import { Calendar as CalendarIcon, Clock, Check, X, RotateCcw, Video } from 'lucide-react';

export const AdminBookingsPage: React.FC = () => {
  const { success } = useToast();
  const [bookings, setBookings] = useState<Booking[]>(() => StorageService.getBookings());

  const handleUpdateStatus = (bookingId: string, status: BookingStatus) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    booking.status = status;
    StorageService.updateBooking(booking);
    setBookings([...StorageService.getBookings()]);
    success('Booking Updated', `Meeting status set to ${status}.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-display">Consultation Calendar & Bookings</h2>
          <p className="text-xs text-slate-500 mt-1">
            Review incoming discovery appointments, approve calendar slots, and coordinate Google Meet links.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    b.status === 'Confirmed'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : b.status === 'Completed'
                      ? 'bg-slate-100 text-slate-600'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {b.status}
                </span>

                <span className="text-[11px] text-indigo-600 font-medium flex items-center gap-1">
                  <Video className="w-3.5 h-3.5" />
                  Google Meet
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 font-display">{b.meetingType}</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {b.clientName} {b.clientCompany ? `(${b.clientCompany})` : ''}
              </p>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">{b.clientEmail}</div>

              <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold">{b.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono text-slate-600">{b.time} (30 mins)</span>
                </div>
              </div>

              {b.notes && (
                <div className="mt-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase mb-0.5">Prospect Notes</span>
                  <p className="line-clamp-2">{b.notes}</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              {b.status === 'Pending' ? (
                <>
                  <button
                    onClick={() => handleUpdateStatus(b.id, 'Confirmed')}
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Confirm Slot</span>
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(b.id, 'Cancelled')}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Decline"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : b.status === 'Confirmed' ? (
                <button
                  onClick={() => handleUpdateStatus(b.id, 'Completed')}
                  className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mark Meeting Held</span>
                </button>
              ) : (
                <span className="text-[11px] text-slate-400 font-medium">Session Concluded</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

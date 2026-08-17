import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const NotificationToast: React.FC = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div
      id="global-toast-notification"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#1E1B18] text-white p-4 rounded-2xl shadow-2xl border border-amber-500/30 flex items-center gap-3 animate-slide-up"
    >
      <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
        <Sparkles className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <p className="text-xs font-semibold text-neutral-200 leading-snug">{toastMessage}</p>
      </div>
    </div>
  );
};

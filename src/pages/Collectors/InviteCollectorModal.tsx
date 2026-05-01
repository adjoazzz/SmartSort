import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

interface InviteCollectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InviteCollectorModal({ isOpen, onClose }: InviteCollectorModalProps) {
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('North Sector');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  if (!isOpen) return null;

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('sending');
    
    // Generate a random 8-character password
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    let generatedPassword = '';
    for (let i = 0; i < 8; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    try {
      await emailjs.send(
        'service_bcr70ms',    // Service ID
        'template_65z65qd',   // Template ID
        {
          collector_email: email,
          temp_password: generatedPassword,
          invite_link: `${window.location.origin}/?role=collector`,
          region: region
        },
        'v5igHVOqku3cMfXGW' // Public Key
      );

      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setEmail('');
      }, 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setStatus('idle');
      alert('Failed to send invite email. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0b1c30]/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col relative">
        
        {/* Header */}
        <div className="border-b border-[#e2e8f0] px-6 py-4 flex items-center justify-between bg-[#f8fafc]">
          <h2 className="text-lg font-bold text-[#0b1c30]">Invite New Collector</h2>
          <button 
            onClick={onClose} 
            disabled={status === 'sending' || status === 'success'}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f1f5f9] text-[#64748b] transition-colors disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {status === 'success' ? (
          <div className="p-8 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0b1c30]">Invite Sent!</h3>
              <p className="text-sm text-[#515f74] mt-2 leading-relaxed">
                An email has been sent to <span className="font-semibold">{email}</span> with a system-generated password and login instructions.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleInvite} className="p-6 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-[#515f74] uppercase tracking-wider">
                Collector Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="e.g., kwame@smartsort.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#0b1c30] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="region" className="text-xs font-semibold text-[#515f74] uppercase tracking-wider">
                Assigned Region
              </label>
              <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="h-11 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#0b1c30] bg-white focus:outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49] transition-all cursor-pointer"
              >
                <option value="North Sector">North Sector</option>
                <option value="East Sector">East Sector</option>
                <option value="South Sector">South Sector</option>
                <option value="West Sector">West Sector</option>
                <option value="Central Hub">Central Hub</option>
              </select>
            </div>

            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-3 mt-2 flex gap-3 items-start">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <p className="text-[11px] text-[#515f74] leading-relaxed">
                The collector will automatically receive a welcome email with a link to the platform and a secure, system-generated temporary password.
              </p>
            </div>

            <div className="flex gap-3 justify-end mt-2 pt-4 border-t border-[#f1f5f9]">
              <button 
                type="button" 
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-[#515f74] hover:bg-[#f1f5f9] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={status === 'sending' || !email}
                className="px-5 py-2 bg-[#006c49] text-white text-sm font-bold rounded-lg hover:bg-[#005a3c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {status === 'sending' ? 'Sending...' : 'Send Invite'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
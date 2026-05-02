import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router';
import imgUserProfileAvatar from '../assets/6c7b9dccb9925ee83b19c4f4237c7c6aa454950a.png';

interface ProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
}

const otherAccounts = [
  {
    initials: 'J',
    name: 'Jane Simmons',
    email: 'JaneSimmons@user.com',
    color: '#78909C',
  },
  // {
  //   initials: 'j',
  //   name: 'jilon elorm kwame asigbee',
  //   email: 'jilonasigbee17@gmail.com',
  //   color: '#AB47BC',
  //   ringColor: '#43A047',
  // },
];

export function ProfilePopup({ isOpen, onClose, anchorRef }: ProfilePopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [showAccounts, setShowAccounts] = useState(true);
  const [position, setPosition] = useState({ top: 0, right: 0 });

  // Calculate position relative to anchor button
  useEffect(() => {
    if (!isOpen || !anchorRef.current) return;

    function updatePosition() {
      if (!anchorRef.current) return;
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen, anchorRef]);

  // Close on click outside — defer to avoid catching the opening click
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        popupRef.current && !popupRef.current.contains(target) &&
        anchorRef.current && !anchorRef.current.contains(target)
      ) {
        onClose();
      }
    }

    // Wait a frame so the opening click doesn't immediately close the popup
    const rafId = requestAnimationFrame(() => {
      document.addEventListener('mousedown', handleClickOutside);
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  // Close on Escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={popupRef}
      className="profile-popup"
      role="dialog"
      aria-label="Account menu"
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        right: `${position.right}px`,
      }}
    >
      {/* Top: Email + Close */}
      <div className="profile-popup__header">
        <span className="profile-popup__email">jayycrypt@gmail.com</span>
        <button
          onClick={onClose}
          className="profile-popup__close"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Avatar + Greeting */}
      <div className="profile-popup__hero">
        <div className="profile-popup__avatar-ring">
          <div className="profile-popup__avatar">
            <img src={imgUserProfileAvatar} alt="User Profile" />
          </div>
          <button className="profile-popup__camera" aria-label="Change profile picture">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z" />
              <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
            </svg>
          </button>
        </div>
        <h2 className="profile-popup__greeting">Hi, kf!</h2>
        <Link to="/profile" onClick={onClose} className="profile-popup__manage-btn">
          Manage your Account
        </Link>
      </div>

      {/* Accounts Section */}
      <div className="profile-popup__accounts-section">
        <button
          className="profile-popup__toggle"
          onClick={() => setShowAccounts((prev) => !prev)}
        >
          <span>{showAccounts ? 'Hide more accounts' : 'Show more accounts'}</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`profile-popup__chevron ${showAccounts ? 'profile-popup__chevron--up' : ''}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {showAccounts && (
          <div className="profile-popup__account-list">
            {otherAccounts.map((account) => (
              <button key={account.email} className="profile-popup__account-row">
                <div
                  className="profile-popup__account-avatar"
                  style={{
                    backgroundColor: account.color,
                    boxShadow: account.ringColor
                      ? `0 0 0 2px ${account.ringColor}`
                      : undefined,
                  }}
                >
                  {account.initials}
                </div>
                <div className="profile-popup__account-info">
                  <span className="profile-popup__account-name">{account.name}</span>
                  <span className="profile-popup__account-email">{account.email}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Add another account */}
        <button className="profile-popup__action-row">
          <div className="profile-popup__action-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <span>Add another account</span>
        </button>
      </div>

      {/* Sign out */}
      <div className="profile-popup__signout-section">
        <button className="profile-popup__action-row">
          <div className="profile-popup__action-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </div>
          <span>Sign out of all accounts</span>
        </button>
      </div>

      {/* Footer */}
      <div className="profile-popup__footer">
        <a href="#" className="profile-popup__footer-link">Privacy Policy</a>
        <span className="profile-popup__footer-dot">·</span>
        <a href="#" className="profile-popup__footer-link">Terms of Service</a>
      </div>
    </div>,
    document.body
  );
}

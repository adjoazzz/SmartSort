import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { supabase } from "../lib/supabaseClient";
import { X, Camera, ChevronDown, Plus, LogOut } from "lucide-react";
import imgUserProfileAvatar from "../assets/6c7b9dccb9925ee83b19c4f4237c7c6aa454950a.png";

interface ProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
}

export function ProfilePopup({
  isOpen,
  onClose,
  anchorRef,
}: ProfilePopupProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const popupRef = useRef<HTMLDivElement>(null);
  const [showAccounts, setShowAccounts] = useState(true);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const [userEmail, setUserEmail] = useState<string>("Loading...");
  const [userName, setUserName] = useState<string>("User");
  const [otherAccounts, setOtherAccounts] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      let currentEmail = "";
      if (user && user.email) {
        currentEmail = user.email;
        setUserEmail(user.email);
        setUserName(user.email.split("@")[0]);
      } else {
        setUserEmail("Not logged in");
        setUserName("Guest");
      }

      const savedAccountsStr = localStorage.getItem("savedAccounts");
      if (savedAccountsStr) {
        try {
          const savedAccounts = JSON.parse(savedAccountsStr);
          const others = savedAccounts.filter(
            (a: any) => a.email !== currentEmail,
          );
          setOtherAccounts(others);
        } catch (e) {}
      }
    });
  }, []);

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
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, anchorRef]);

  // Close on click outside — defer to avoid catching the opening click
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        popupRef.current &&
        !popupRef.current.contains(target) &&
        anchorRef.current &&
        !anchorRef.current.contains(target)
      ) {
        onClose();
      }
    }

    // Wait a frame so the opening click doesn't immediately close the popup
    const rafId = requestAnimationFrame(() => {
      document.addEventListener("mousedown", handleClickOutside);
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  // Close on Escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={popupRef}
      className="profile-popup"
      role="dialog"
      aria-label="Account menu"
      style={{
        position: "fixed",
        top: `${position.top}px`,
        right: `${position.right}px`,
      }}
    >
      {/* Top: Email + Close */}
      <div className="profile-popup__header">
        <span className="profile-popup__email">{userEmail}</span>
        <button
          onClick={onClose}
          className="profile-popup__close"
          aria-label="Close"
        >
          <X className="w-[18px] h-[18px]" strokeWidth={2.5} />
        </button>
      </div>

      {/* Avatar + Greeting */}
      <div className="profile-popup__hero">
        <div className="profile-popup__avatar-ring">
          <div className="profile-popup__avatar">
            <img src={imgUserProfileAvatar} alt="User Profile" />
          </div>
          <button
            className="profile-popup__camera"
            aria-label="Change profile picture"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
        <h2 className="profile-popup__greeting">Hi, {userName}!</h2>
        <Link
          to="/profile"
          onClick={onClose}
          className="profile-popup__manage-btn"
        >
          {t("profilePopup.manageAccount")}
        </Link>
      </div>

      {/* Accounts Section */}
      <div className="profile-popup__accounts-section">
        <button
          className="profile-popup__toggle"
          onClick={() => setShowAccounts((prev) => !prev)}
        >
          <span>
            {showAccounts
              ? t("profilePopup.hideAccounts")
              : t("profilePopup.showAccounts")}
          </span>
          <ChevronDown
            className={`w-[18px] h-[18px] profile-popup__chevron ${showAccounts ? "profile-popup__chevron--up" : ""}`}
            strokeWidth={2.5}
          />
        </button>

        {showAccounts && (
          <div className="profile-popup__account-list">
            {otherAccounts.map((account) => (
              <button
                key={account.email}
                className="profile-popup__account-row"
                onClick={() => {
                  onClose();
                  navigate(`/login?email=${encodeURIComponent(account.email)}`);
                }}
              >
                <div
                  className="profile-popup__account-avatar"
                  style={{
                    backgroundColor: account.color || "#78909C",
                    boxShadow: account.ringColor
                      ? `0 0 0 2px ${account.ringColor}`
                      : undefined,
                  }}
                >
                  {account.initials}
                </div>
                <div className="profile-popup__account-info">
                  <span className="profile-popup__account-name">
                    {account.name}
                  </span>
                  <span className="profile-popup__account-email">
                    {account.email}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Add another account */}
        <Link
          to="/login"
          onClick={onClose}
          className="profile-popup__action-row"
        >
          <div className="profile-popup__action-icon">
            <Plus className="w-[18px] h-[18px]" strokeWidth={2} />
          </div>
          <span>{t("profilePopup.addAccount")}</span>
        </Link>
      </div>

      {/* Sign out */}
      <div className="profile-popup__signout-section">
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            localStorage.removeItem("userRole");
            onClose();
            navigate("/login");
          }}
          className="profile-popup__action-row w-full text-left cursor-pointer"
        >
          <div className="profile-popup__action-icon">
            <LogOut className="w-[18px] h-[18px]" strokeWidth={2} />
          </div>
          <span>{t("profilePopup.signOut")}</span>
        </button>
      </div>

      {/* Footer */}
      <div className="profile-popup__footer">
        <a href="#" className="profile-popup__footer-link">
          {t("profilePopup.privacyPolicy")}
        </a>
        <span className="profile-popup__footer-dot">·</span>
        <a href="#" className="profile-popup__footer-link">
          {t("profilePopup.termsOfService")}
        </a>
      </div>
    </div>,
    document.body,
  );
}

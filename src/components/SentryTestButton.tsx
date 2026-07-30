import * as Sentry from '@sentry/react';

// Button component to test Sentry's error tracking
export default function ErrorButton() {
  return (
    <button
      onClick={() => {
        Sentry.captureMessage("Test message captured via Sentry ErrorButton");
        throw new Error('This is your first error!');
      }}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
    >
      <span>⚡</span> Break the world (Test Sentry)
    </button>
  );
}

import { useRouteError, isRouteErrorResponse, Link } from "react-router";

export function RouteErrorBoundary() {
  const error = useRouteError();
  
  let errorMessage = "An unexpected application error occurred.";
  let errorDetails = "";

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
    errorDetails = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorDetails = error.stack || "";
  } else if (typeof error === "string") {
    errorMessage = error;
  }

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-center items-center p-6 text-center font-sans">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Oops! Something went wrong.
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {errorMessage}
          </p>
        </div>

        {errorDetails && (
          <pre className="w-full bg-slate-50 dark:bg-slate-950 p-4 rounded-lg text-left text-xs text-red-600 dark:text-red-400 overflow-x-auto max-h-32 border border-slate-100 dark:border-slate-800 break-words whitespace-pre-wrap">
            {errorDetails}
          </pre>
        )}

        <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
          <button
            onClick={handleReload}
            className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md active:scale-[0.98]"
          >
            Reload Application
          </button>
          <Link
            to="/"
            className="flex-1 h-11 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200 font-semibold text-sm rounded-xl transition-all flex items-center justify-center"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

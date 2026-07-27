import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { ErrorBoundary } from "../components/ErrorBoundary";

function RouteLoadingSkeleton() {
  return (
    <div className="w-full h-screen animate-pulse bg-slate-50 p-8 flex flex-col gap-4">
      <div className="h-16 w-full bg-slate-200 rounded-md"></div>
      <div className="h-96 w-full max-w-4xl mx-auto bg-slate-200 rounded-lg mt-8"></div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster position="top-right" richColors />
      <ErrorBoundary>
        <RouterProvider router={router} fallbackElement={<RouteLoadingSkeleton />} />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

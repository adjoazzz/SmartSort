import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { supabase } from "../lib/supabaseClient";
import { AlertsProvider } from "../contexts/AlertsContext";

export function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const publicPaths = [
        "/",
        "/login",
        "/onboarding-1",
        "/onboarding-2",
        "/onboarding-3",
      ];
      if (publicPaths.includes(location.pathname)) {
        setLoading(false);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        setLoading(false);
        return;
      }

      const role = localStorage.getItem("userRole"); // still stored during login for fast UI toggle
      if (role === "collector") {
        const allowedPaths = [
          "/collector-dashboard",
          "/collector-map",
          "/profile",
        ];
        if (!allowedPaths.includes(location.pathname)) {
          navigate("/collector-dashboard");
        }
      }
      setLoading(false);
    };

    checkSession();
  }, [location.pathname, navigate]);

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#f8fafc] dark:bg-[#071321] flex flex-col items-center justify-center gap-7">
        <img
          src="/logo.png"
          alt="SmartSort Logo"
          className="w-[120px] h-[120px] object-contain rounded-[20px] shadow-lg shadow-emerald-950/10"
        />
        <div className="w-[180px] h-[5px] bg-[#e2e8f0] dark:bg-slate-800 rounded-full overflow-hidden relative shadow-inner">
          <div
            className="absolute h-full rounded-full"
            style={{
              width: "50%",
              background:
                "linear-gradient(90deg, #006c49, #10b981, #6ffbbe, #3b82f6, #006c49)",
              backgroundSize: "250% 100%",
              animation:
                "smartsortLineMove 1.8s infinite ease-in-out, smartsortColorShift 3s infinite linear",
              boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <AlertsProvider>
      <div className="relative w-full h-screen bg-slate-50">
        <Outlet />
      </div>
    </AlertsProvider>
  );
}

import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { supabase } from "../lib/supabaseClient";

export function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const publicPaths = ["/", "/login", "/onboarding-1", "/onboarding-2", "/onboarding-3"];
      if (publicPaths.includes(location.pathname)) {
        setLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        setLoading(false);
        return;
      }

      const role = localStorage.getItem("userRole"); // still stored during login for fast UI toggle
      if (role === "collector") {
        const allowedPaths = ["/collector-dashboard", "/profile"];
        if (!allowedPaths.includes(location.pathname)) {
          navigate("/collector-dashboard");
        }
      } else {
        if (location.pathname === "/collector-dashboard") {
          navigate("/dashboard");
        }
      }
      setLoading(false);
    };

    checkSession();
  }, [location.pathname, navigate]);

  if (loading) {
    return <div className="h-screen w-full bg-slate-50 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="relative w-full h-screen bg-slate-50">
      <Outlet />
    </div>
  );
}
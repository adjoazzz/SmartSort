import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

export function Root() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const publicPaths = ["/", "/login", "/onboarding-1", "/onboarding-2", "/onboarding-3"];
    
    if (publicPaths.includes(location.pathname)) {
      return;
    }

    if (!role) {
      navigate("/login");
      return;
    }

    if (role === "collector") {
      const allowedPaths = ["/collector-dashboard", "/collector-map", "/profile"];
      if (!allowedPaths.includes(location.pathname)) {
        navigate("/collector-dashboard");
      }
    } else {
      if (location.pathname === "/collector-dashboard") {
        navigate("/dashboard");
      }
    }
  }, [location.pathname, navigate]);

  return (
    <div className="relative w-full h-screen bg-slate-50">
      <Outlet />
    </div>
  );
}
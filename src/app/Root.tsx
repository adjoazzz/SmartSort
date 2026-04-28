import { Outlet } from "react-router";

export function Root() {
  return (
    <div className="relative w-full h-screen bg-slate-50">
      <Outlet />
    </div>
  );
}
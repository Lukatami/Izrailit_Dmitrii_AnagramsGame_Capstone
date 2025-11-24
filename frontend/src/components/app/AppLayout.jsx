import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader.jsx";

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <AppHeader />
      <main className="flex-1 w-full max-w-5xl mx-auto px-1 py-1">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;

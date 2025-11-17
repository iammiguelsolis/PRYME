import { Sidebar } from "../components/organismos/Sidebar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 h-full overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

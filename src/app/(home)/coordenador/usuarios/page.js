"use client";

import UserManagementDashboard from "@/components/usuarios/UserManagementDashboard";
import Topbar from "@/components/topbar/Topbar";

export default function CoordenadorUsuariosPage() {
  return (
    <div className="flex flex-1 flex-col pb-4 gap-4">
      <Topbar />
      <UserManagementDashboard />
    </div>
  );
}

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { LoadingAnimation } from "@/components/ui/loading-animation";

export default function Admin() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingAnimation isVisible={true} />;
  }

  if (!user?.isAuthenticated) {
    return <LoginForm />;
  }

  return <AdminPanel />;
}

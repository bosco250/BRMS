import { getSessionUser } from "./session";
import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";

const routeByRole: Record<string, string> = {
  admin: "/dashboard/admin",
  business_owner: "/dashboard/owner",
  manager: "/dashboard/manager",
  accountant: "/dashboard/accountant",
  waiter: "/dashboard/waiter",
  customer: "/dashboard/customer",
  kitchen: "/dashboard/kitchen",
};

export function withRoleGuard<TProps extends Record<string, any>>(
  Component: (props: TProps) => ReactElement,
  role: keyof typeof routeByRole
) {
  return function Guarded(props: TProps) {
    const user = getSessionUser();
    if (!user) return <Navigate to="/login" replace />;

    // Normalize role to lowercase for comparison
    const userRole = user.role?.toLowerCase();
    const requiredRole = role.toLowerCase();

    if (userRole !== requiredRole) {
      return <Navigate to={routeByRole[userRole] || "/"} replace />;
    }
    return <Component {...props} />;
  };
}

import { getSessionUser } from "./session";
import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";

const routeByRole: Record<string, string> = {
  Admin: "/dashboard/admin",
  Owner: "/dashboard/owner",
  Manager: "/dashboard/manager",
  Accountant: "/dashboard/accountant",
  Waiter: "/dashboard/waiter",
  Customer: "/dashboard/customer",
  Kitchen: "/dashboard/kitchen",
};

export function withRoleGuard<TProps extends Record<string, any>>(
  Component: (props: TProps) => ReactElement,
  role: keyof typeof routeByRole
) {
  return function Guarded(props: TProps) {
    const user = getSessionUser();
    if (!user) return <Navigate to="/login" replace />;
    if (user.role !== role)
      return <Navigate to={routeByRole[user.role] || "/"} replace />;
    return <Component {...props} />;
  };
}

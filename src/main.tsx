import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Landing from "./pages/Landing.tsx";
import Bars from "./pages/Bars.tsx";
import Resto from "./pages/Resto.tsx";
import RestaurantProfile from "./pages/RestaurantProfile.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import ForgotPassword from "./pages/auth/ForgotPassword.tsx";
import Checkout from "./pages/Checkout.tsx";
import OrderSuccess from "./pages/OrderSuccess.tsx";
// Admin Dashboard Components
import AdminDashboardLayout from "./pages/dashboard/admin/AdminDashboardLayout.tsx";
import AdminDashboardMain from "./pages/dashboard/admin/Dashboard.tsx";
import AdminBusinesses from "./pages/dashboard/admin/Businesses.tsx";
import AdminSubscriptions from "./pages/dashboard/admin/Subscriptions.tsx";
import AdminUserManagement from "./pages/dashboard/admin/UserManagement.tsx";
import AdminSystemAnalytics from "./pages/dashboard/admin/SystemAnalytics.tsx";
import AdminAuditLogs from "./pages/dashboard/admin/AuditLogs.tsx";
import AdminOrders from "./pages/dashboard/admin/Orders.tsx";
import AdminSettings from "./pages/dashboard/admin/Settings.tsx";
// Manager Dashboard Components
import ManagerDashboardLayout from "./pages/dashboard/manager/ManagerDashboardLayout.tsx";
import ManagerDashboardMain from "./pages/dashboard/manager/Dashboard.tsx";
import TableManagement from "./pages/dashboard/manager/TableManagement.tsx";
import StaffManagement from "./pages/dashboard/manager/StaffManagement.tsx";
import InventoryManagement from "./pages/dashboard/manager/InventoryManagement.tsx";
import MenuManagement from "./pages/dashboard/manager/MenuManagement.tsx";
import ReportsAnalytics from "./pages/dashboard/manager/ReportsAnalytics.tsx";
import CustomerManagement from "./pages/dashboard/manager/CustomerManagement.tsx";
import ManagerOrders from "./pages/dashboard/manager/Orders.tsx";
import Settings from "./pages/dashboard/manager/Settings.tsx";

// Owner Dashboard Components
import OwnerDashboardLayout from "./pages/dashboard/owner/OwnerDashboardLayout.tsx";
import OwnerDashboardMain from "./pages/dashboard/owner/Dashboard.tsx";
import Restaurants from "./pages/dashboard/owner/Restaurants.tsx";
import Financial from "./pages/dashboard/owner/Financial.tsx";
import OwnerStaffManagement from "./pages/dashboard/owner/StaffManagement.tsx";
import Reports from "./pages/dashboard/owner/Reports.tsx";
import OwnerSettings from "./pages/dashboard/owner/Settings.tsx";

// Accountant Dashboard Components
import AccountantDashboardLayout from "./pages/dashboard/accountant/AccountantDashboardLayout.tsx";
import AccountantDashboardMain from "./pages/dashboard/accountant/Dashboard.tsx";
import FinancialRecords from "./pages/dashboard/accountant/FinancialRecords.tsx";
import Invoices from "./pages/dashboard/accountant/Invoices.tsx";
import TaxManagement from "./pages/dashboard/accountant/TaxManagement.tsx";
import AccountantReports from "./pages/dashboard/accountant/Reports.tsx";
import AccountantSettings from "./pages/dashboard/accountant/Settings.tsx";

// Waiter Dashboard Components
import WaiterDashboardLayout from "./pages/dashboard/waiter/WaiterDashboardLayout.tsx";
import WaiterDashboardMain from "./pages/dashboard/waiter/Dashboard.tsx";
import WaiterTables from "./pages/dashboard/waiter/Tables.tsx";
import WaiterReservations from "./pages/dashboard/waiter/Reservations.tsx";
import WaiterSettings from "./pages/dashboard/waiter/Settings.tsx";

// Customer Dashboard Components
import CustomerDashboardLayout from "./pages/dashboard/customer/CustomerDashboardLayout.tsx";
import Dashboard from "./pages/dashboard/customer/Dashboard.tsx";
import BrowseMenu from "./pages/dashboard/customer/BrowseMenu.tsx";
import AccountProfile from "./pages/dashboard/customer/AccountProfile.tsx";
import LoyaltyProgram from "./pages/dashboard/customer/LoyaltyProgram.tsx";
import Reservations from "./pages/dashboard/customer/Reservations.tsx";
import Communication from "./pages/dashboard/customer/Communication.tsx";
import CustomerOrders from "./pages/dashboard/customer/Orders.tsx";
import HelpSupport from "./pages/dashboard/customer/HelpSupport.tsx";
import CustomerSettings from "./pages/dashboard/customer/Settings.tsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  // App layout routes (with Navbar/Footer)
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: "bars", element: <Bars /> },
      { path: "resto", element: <Resto /> },
      { path: "resto/:id", element: <RestaurantProfile /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot", element: <ForgotPassword /> },
      { path: "checkout", element: <Checkout /> },
      { path: "order-success", element: <OrderSuccess /> },
    ],
  },
  // Admin Dashboard with nested routes
  {
    path: "/dashboard/admin",
    element: <AdminDashboardLayout />,
    children: [
      { index: true, element: <AdminDashboardMain /> },
      { path: "businesses", element: <AdminBusinesses /> },
      { path: "subscriptions", element: <AdminSubscriptions /> },
      { path: "users", element: <AdminUserManagement /> },
      { path: "analytics", element: <AdminSystemAnalytics /> },
      { path: "logs", element: <AdminAuditLogs /> },
      { path: "orders", element: <AdminOrders /> },
      { path: "settings", element: <AdminSettings /> },
    ],
  },

  // Waiter Dashboard with nested routes
  {
    path: "/dashboard/waiter",
    element: <WaiterDashboardLayout />,
    children: [
      { index: true, element: <WaiterDashboardMain /> },
      { path: "tables", element: <WaiterTables /> },
      { path: "reservations", element: <WaiterReservations /> },
      { path: "settings", element: <WaiterSettings /> },
    ],
  },

  // Manager Dashboard with nested routes
  {
    path: "/dashboard/manager",
    element: <ManagerDashboardLayout />,
    children: [
      { index: true, element: <ManagerDashboardMain /> },
      { path: "tables", element: <TableManagement /> },
      { path: "staff", element: <StaffManagement /> },
      { path: "inventory", element: <InventoryManagement /> },
      { path: "menu", element: <MenuManagement /> },
      {
        path: "reports",
        element: <ReportsAnalytics />,
      },
      {
        path: "customers",
        element: <CustomerManagement />,
      },
      { path: "orders", element: <ManagerOrders /> },
      { path: "settings", element: <Settings /> },
    ],
  },

  // Owner Dashboard with nested routes
  {
    path: "/dashboard/owner",
    element: <OwnerDashboardLayout />,
    children: [
      { index: true, element: <OwnerDashboardMain /> },
      { path: "restaurants", element: <Restaurants /> },
      { path: "financial", element: <Financial /> },
      { path: "staff", element: <OwnerStaffManagement /> },
      { path: "reports", element: <Reports /> },
      { path: "settings", element: <OwnerSettings /> },
    ],
  },

  // Accountant Dashboard with nested routes
  {
    path: "/dashboard/accountant",
    element: <AccountantDashboardLayout />,
    children: [
      { index: true, element: <AccountantDashboardMain /> },
      { path: "records", element: <FinancialRecords /> },
      { path: "invoices", element: <Invoices /> },
      { path: "taxes", element: <TaxManagement /> },
      { path: "reports", element: <AccountantReports /> },
      { path: "settings", element: <AccountantSettings /> },
    ],
  },

  // Customer Dashboard with nested routes
  {
    path: "/dashboard/customer",
    element: <CustomerDashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "menu", element: <BrowseMenu /> },
      { path: "profile", element: <AccountProfile /> },
      { path: "loyalty", element: <LoyaltyProgram /> },
      { path: "reservations", element: <Reservations /> },
      { path: "communication", element: <Communication /> },
      { path: "orders", element: <CustomerOrders /> },
      { path: "help", element: <HelpSupport /> },
      { path: "settings", element: <CustomerSettings /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar
      theme="colored"
    />
  </StrictMode>
);

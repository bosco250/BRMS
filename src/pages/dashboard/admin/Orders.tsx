import React from "react";
import OrderManagement from "../../../components/OrderManagement";

const AdminOrders: React.FC = () => {
  return (
    <div className="p-6">
      <OrderManagement userRole="admin" />
    </div>
  );
};

export default AdminOrders;

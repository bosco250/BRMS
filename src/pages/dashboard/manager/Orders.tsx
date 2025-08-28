import React from "react";
import OrderManagement from "../../../components/OrderManagement";

const ManagerOrders: React.FC = () => {
  return (
    <div className="p-6">
      <OrderManagement userRole="manager" />
    </div>
  );
};

export default ManagerOrders;

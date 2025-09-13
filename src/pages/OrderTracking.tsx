import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";

const OrderTracking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber, isGuest = true } = location.state || {};

  // const [orderStatus, setOrderStatus] = useState("preparing");

  const statusSteps = [
    { id: "pending", label: "Order Received", icon: "📝", completed: true },
    { id: "confirmed", label: "Order Confirmed", icon: "✅", completed: true },
    {
      id: "preparing",
      label: "Preparing",
      icon: "👨‍🍳",
      completed: true,
      current: true,
    },
    { id: "ready", label: "Ready", icon: "🍽️", completed: false },
    {
      id: "out_for_delivery",
      label: "Out for Delivery",
      icon: "🚚",
      completed: false,
    },
    { id: "delivered", label: "Delivered", icon: "🎉", completed: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h1 className="text-xl font-bold text-gray-900">Order Tracking</h1>
            <div className="w-20" />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {orderNumber ? (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order #{orderNumber}
                </h2>
                {isGuest && (
                  <span className="text-xs bg-brand/10 text-brand px-2 py-1 rounded-full">
                    Guest Order
                  </span>
                )}
              </div>
              <p className="text-gray-600">
                Track your order status in real-time
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Status
              </h3>
              <div className="space-y-4">
                {statusSteps.map((step) => (
                  <div key={step.id} className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                        step.completed
                          ? "bg-green-100 text-green-600"
                          : step.current
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {step.completed ? "✓" : step.current ? "⏳" : step.icon}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-medium ${
                          step.completed
                            ? "text-green-600"
                            : step.current
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      >
                        {step.label}
                      </p>
                      {step.current && (
                        <p className="text-sm text-gray-600">
                          Currently in progress
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand/5 border border-brand/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand mt-0.5" />
                <div>
                  <h4 className="font-medium text-brand mb-1">
                    Estimated Time
                  </h4>
                  <p className="text-sm text-brand/80">
                    Your order should be ready in approximately 25-30 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📦</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              No Order Found
            </h1>
            <p className="text-gray-600 mb-6">
              Please provide a valid order number to track your order.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-brand text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-hover transition-colors"
            >
              Go Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;

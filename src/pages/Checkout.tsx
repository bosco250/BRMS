import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { checkoutSteps, formatCurrency } from "../data/checkoutData";
import CartReviewStep from "../components/checkout/CartReviewStep";
import ShippingStep from "../components/checkout/ShippingStep";
import BillingStep from "../components/checkout/BillingStep";
import PaymentStep from "../components/checkout/PaymentStep";
import OrderReviewStep from "../components/checkout/OrderReviewStep";
import { toast } from "react-toastify";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { state, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // State for each step
  const [shippingDetails, setShippingDetails] = useState<any>(null);
  const [billingDetails, setBillingDetails] = useState<any>(null);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  const cart = state;
  const totalSteps = checkoutSteps.length;

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-surface-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            Your cart is empty
          </h1>
          <p className="text-text-secondary mb-6">
            Add some items to your cart to proceed with checkout.
          </p>
          <button
            onClick={() => navigate("/resto")}
            className="bg-brand text-white px-6 py-3 rounded-lg hover:bg-brand-dark transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleShippingComplete = (details: any) => {
    setShippingDetails(details);
    handleNext();
  };

  const handleBillingComplete = (details: any) => {
    setBillingDetails(details);
    handleNext();
  };

  const handlePaymentComplete = (details: any) => {
    setPaymentDetails(details);
    handleNext();
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Here you would typically send the order to your backend
    const orderData = {
      items: cart.items,
      shipping: shippingDetails,
      billing: billingDetails,
      payment: paymentDetails,
      total: cart.items.reduce((sum, item) => sum + item.totalPrice, 0),
      orderNumber: `ORD-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Order placed successfully

    // Show success toast
    toast.success(
      <div>
        <div className="font-medium">Order Placed Successfully! 🎉</div>
        <div className="text-sm text-gray-600">
          Order #{orderData.orderNumber}
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );

    // Clear cart and redirect to success page
    clearCart();
    navigate("/order-success", {
      state: {
        orderNumber: orderData.orderNumber,
        orderData: orderData,
      },
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <CartReviewStep onNext={handleNext} />;
      case 1:
        return (
          <ShippingStep onNext={handleShippingComplete} onBack={handleBack} />
        );
      case 2:
        return (
          <BillingStep
            onNext={handleBillingComplete}
            onBack={handleBack}
            shippingDetails={shippingDetails}
          />
        );
      case 3:
        return (
          <PaymentStep onNext={handlePaymentComplete} onBack={handleBack} />
        );
      case 4:
        return (
          <OrderReviewStep
            onPlaceOrder={handlePlaceOrder}
            onBack={handleBack}
            shippingDetails={shippingDetails}
            billingDetails={billingDetails}
            paymentDetails={paymentDetails}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Header */}
      <div className="bg-white border-b border-border-primary">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-text-secondary hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-text-primary">Checkout</h1>
            <div className="w-20" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {checkoutSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    index <= currentStep
                      ? "border-brand bg-brand text-white"
                      : "border-border-primary bg-white text-text-secondary"
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="ml-3">
                  <h3
                    className={`text-sm font-medium ${
                      index <= currentStep
                        ? "text-text-primary"
                        : "text-text-secondary"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-xs ${
                      index <= currentStep
                        ? "text-text-secondary"
                        : "text-text-tertiary"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
                {index < totalSteps - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-4 ${
                      index < currentStep ? "bg-brand" : "bg-border-primary"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm border border-border-primary p-6 mb-6">
          {renderStepContent()}
        </div>

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-text-primary mb-2">
                Processing Your Order
              </h3>
              <p className="text-text-secondary">
                Please wait while we process your payment and confirm your
                order...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;

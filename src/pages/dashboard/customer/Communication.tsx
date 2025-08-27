import { Mail, MessageSquare } from "lucide-react";
import { useCustomerDashboard } from "./context";

export default function Communication() {
  const { customer } = useCustomerDashboard();
  return (
    <div className="space-y-6">
             <div
         className="p-6 rounded-lg border border-border-primary bg-dashboard"
       >
         <h3 className="text-lg font-semibold text-text-primary mb-4">
           Notification Preferences
         </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">
                Order Updates
              </p>
              <p className="text-xs text-text-secondary">
                Get notified about order status changes
              </p>
            </div>
            <button className="w-12 h-6 bg-brand rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">
                Promotional Offers
              </p>
              <p className="text-xs text-text-secondary">
                Receive special deals and discounts
              </p>
            </div>
            <button className="w-12 h-6 bg-surface-secondary rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1" />
            </button>
          </div>
        </div>
      </div>

             <div
         className="p-6 rounded-lg border border-border-primary bg-dashboard"
       >
         <h3 className="text-lg font-semibold text-text-primary mb-4">
           Communication Channels
         </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-text-secondary" />
                <span className="text-sm text-text-primary">Email</span>
              </div>
              <button className="w-12 h-6 bg-brand rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </button>
            </div>
            <input
              type="email"
              value={customer.email}
              className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-text-secondary" />
                <span className="text-sm text-text-primary">SMS</span>
              </div>
              <button className="w-12 h-6 bg-brand rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </button>
            </div>
            <input
              type="tel"
              value={customer.phone}
              className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

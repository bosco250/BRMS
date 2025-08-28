import { Award } from "lucide-react";
import { useCustomerDashboard } from "./context";
import { toast } from "react-toastify";

export default function LoyaltyProgram() {
  const { customer, rewards } = useCustomerDashboard();

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-lg border border-border-primary bg-dashboard">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Points Balance
        </h3>
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-brand mb-2">
            {customer.loyaltyPoints}
          </div>
          <p className="text-text-secondary">Available Points</p>
          <div className="w-full bg-surface-secondary rounded-full h-3 mt-4">
            <div
              className="bg-accent h-3 rounded-full"
              style={{
                width: `${Math.min(
                  (customer.loyaltyPoints / 1000) * 100,
                  100
                )}%`,
              }}
            />
          </div>
          <p className="text-xs text-text-secondary mt-2">
            {1000 - customer.loyaltyPoints} points until next tier
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-surface-secondary rounded-lg">
            <Award className="w-8 h-8 text-brand mx-auto mb-2" />
            <div className="text-lg font-bold text-text-primary">Bronze</div>
            <div className="text-xs text-text-secondary">0-999 points</div>
          </div>
          <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
            <Award className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-lg font-bold text-accent">Silver</div>
            <div className="text-xs text-text-secondary">1000-4999 points</div>
            <div className="text-xs text-accent mt-1">Current Tier</div>
          </div>
          <div className="text-center p-4 bg-surface-secondary rounded-lg">
            <Award className="w-8 h-8 text-warning mx-auto mb-2" />
            <div className="text-lg font-bold text-warning">Gold</div>
            <div className="text-xs text-text-secondary">5000+ points</div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg border border-border-primary bg-dashboard">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Available Rewards
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`p-4 rounded-lg border ${
                reward.available
                  ? "bg-surface-secondary border-border-secondary"
                  : "bg-surface-secondary/50 border-border-secondary"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4
                    className={`font-medium ${
                      reward.available ? "text-text-primary" : "text-text-muted"
                    }`}
                  >
                    {reward.name}
                  </h4>
                  <p className="text-xs text-text-secondary">
                    {reward.description}
                  </p>
                </div>
                <span
                  className={`text-sm font-medium ${
                    reward.available ? "text-accent" : "text-text-muted"
                  }`}
                >
                  {reward.points} pts
                </span>
              </div>
              <button
                disabled={!reward.available}
                onClick={() => {
                  if (reward.available) {
                    // Add redemption logic here
                    toast.success(`${reward.name} redeemed successfully!`);
                  }
                }}
                className={`w-full py-2 text-sm font-medium rounded-lg ${
                  reward.available
                    ? "bg-accent text-white hover:bg-accent/90"
                    : "bg-surface-card text-text-muted cursor-not-allowed"
                }`}
              >
                {reward.available ? "Redeem" : "Not Enough Points"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

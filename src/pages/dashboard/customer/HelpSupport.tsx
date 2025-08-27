import { ChevronRight, Phone, Mail } from "lucide-react";

export default function HelpSupport() {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-lg border border-border-primary bg-dashboard">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {[
            "How do I earn loyalty points?",
            "Can I modify my reservation?",
            "What payment methods do you accept?",
            "How do I update my dietary preferences?",
          ].map((q) => (
            <div key={q} className="border border-border-secondary rounded-lg">
              <button className="w-full p-4 text-left flex items-center justify-between hover:bg-surface-secondary">
                <span className="text-sm font-medium text-text-primary">
                  {q}
                </span>
                <ChevronRight className="w-4 h-4 text-text-secondary" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-lg border border-border-primary bg-dashboard">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Contact Support
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-surface-secondary rounded-lg">
            <Phone className="w-8 h-8 text-brand mb-3" />
            <h4 className="font-medium text-text-primary mb-2">
              Phone Support
            </h4>
            <p className="text-sm text-text-secondary mb-3">
              Available 24/7 for urgent issues
            </p>
            <p className="text-sm font-medium text-text-primary">
              +250 788 123 456
            </p>
          </div>
          <div className="p-4 bg-surface-secondary rounded-lg">
            <Mail className="w-8 h-8 text-brand mb-3" />
            <h4 className="font-medium text-text-primary mb-2">
              Email Support
            </h4>
            <p className="text-sm text-text-secondary mb-3">
              Response within 2 hours
            </p>
            <p className="text-sm font-medium text-text-primary">
              support@restaurant.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

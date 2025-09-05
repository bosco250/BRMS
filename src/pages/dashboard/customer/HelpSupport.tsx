import { useState } from "react";
import {
  ChevronRight,
  Phone,
  Mail,
  MessageSquare,
  Search,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

export default function HelpSupport() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    priority: "medium",
  });

  const faqs = [
    {
      question: "How do I earn loyalty points?",
      answer:
        "You earn loyalty points for every order you place. Points are calculated based on your order value: 1 point for every 100 RWF spent. You can also earn bonus points during special promotions and events.",
    },
    {
      question: "Can I modify my reservation?",
      answer:
        "Yes, you can modify your reservation up to 2 hours before your scheduled time. Simply go to the Reservations section in your dashboard and click the edit button. Changes are subject to availability.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept mobile money (MTN MoMo, Airtel Money, M-Pesa), credit/debit cards, and cash payments. All online payments are processed securely through our payment gateway.",
    },
    {
      question: "How do I update my dietary preferences?",
      answer:
        "You can update your dietary preferences in your Account Profile. Go to Settings > Profile and add any allergies or dietary restrictions. This information will be shared with our kitchen staff.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Reservations can be cancelled up to 2 hours before your scheduled time without any charges. Late cancellations may incur a small fee. Orders can be cancelled within 10 minutes of placement.",
    },
    {
      question: "How do I track my order?",
      answer:
        "You can track your order in real-time through the Orders section in your dashboard. You'll also receive notifications at each stage: confirmed, preparing, ready, and delivered.",
    },
  ];

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.subject || !contactForm.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success(
      "Support ticket submitted successfully! We'll get back to you soon."
    );
    setContactForm({ subject: "", message: "", priority: "medium" });
    setShowContactForm(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Help & Support</h2>
        <p className="text-text-secondary">
          Find answers to common questions and get help when you need it
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
        <input
          type="text"
          placeholder="Search for help topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
      </div>

      {/* FAQs */}
      <div className="p-6 rounded-lg border border-border-primary bg-dashboard">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">
            Frequently Asked Questions
          </h3>
          <button
            onClick={() => setShowContactForm(true)}
            className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2 border border-brand-dark"
          >
            <MessageSquare className="w-4 h-4" />
            Contact Support
          </button>
        </div>
        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <div
              key={faq.question}
              className="border border-border-secondary rounded-lg"
            >
              <button
                onClick={() =>
                  setExpandedFAQ(
                    expandedFAQ === faq.question ? null : faq.question
                  )
                }
                className="w-full p-4 text-left flex items-center justify-between hover:bg-surface-secondary transition-colors border border-transparent hover:border-border-secondary"
              >
                <span className="text-sm font-medium text-text-primary">
                  {faq.question}
                </span>
                <ChevronRight
                  className={`w-4 h-4 text-text-secondary transition-transform ${
                    expandedFAQ === faq.question ? "rotate-90" : ""
                  }`}
                />
              </button>
              {expandedFAQ === faq.question && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        {filteredFAQs.length === 0 && (
          <div className="text-center py-8">
            <Search className="w-16 h-16 text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">
              No help topics found for your search.
            </p>
          </div>
        )}
      </div>

      {/* Contact Support */}
      <div className="p-6 rounded-lg border border-border-primary bg-dashboard">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Contact Support
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-surface-secondary rounded-lg border border-border-secondary">
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
          <div className="p-4 bg-surface-secondary rounded-lg border border-border-secondary">
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

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto border border-border-primary">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-text-primary">
                    Contact Support
                  </h3>
                  <p className="text-text-secondary">
                    Submit a support ticket and we'll get back to you
                  </p>
                </div>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        subject: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Priority
                  </label>
                  <select
                    value={contactForm.priority}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        priority: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Message *
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                    rows={4}
                    placeholder="Describe your issue or question..."
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-brand text-white py-2 px-4 rounded-lg font-medium hover:bg-brand-dark transition-colors border border-brand-dark"
                  >
                    Submit Ticket
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 bg-surface-secondary text-text-primary py-2 px-4 rounded-lg font-medium hover:bg-surface-card transition-colors border border-border-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

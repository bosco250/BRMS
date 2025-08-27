export default function Footer() {
  return (
    <footer
      className="border-t border-border-secondary bg-surface-primary"
      id="contact"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-8 w-8 rounded bg-brand" />
              <span className="text-lg font-bold text-text-primary">BRMS</span>
            </div>
            <p className="mt-3 text-sm text-text-secondary max-w-xs">
              Bar & Restaurant Management System: inventory, orders, payments,
              CRM, and analytics in one platform.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary">Product</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  className="hover:text-text-primary text-text-secondary"
                  href="#features"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  className="hover:text-text-primary text-text-secondary"
                  href="#subscriptions"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  className="hover:text-text-primary text-text-secondary"
                  href="#"
                >
                  Integrations
                </a>
              </li>
              <li>
                <a
                  className="hover:text-text-primary text-text-secondary"
                  href="#"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  className="hover:text-text-primary text-text-secondary"
                  href="#"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  className="hover:text-text-primary text-text-secondary"
                  href="#"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  className="hover:text-text-primary text-text-secondary"
                  href="#"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary">
              Resources
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  className="hover:text-text-primary text-text-secondary"
                  href="#"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  className="hover:text-text-primary text-text-secondary"
                  href="#"
                >
                  API Docs
                </a>
              </li>
              <li>
                <a
                  className="hover:text-text-primary text-text-secondary"
                  href="#"
                >
                  Status
                </a>
              </li>
              <li>
                <a
                  className="hover:text-text-primary text-text-secondary"
                  href="#"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-secondary border-t border-border-subtle pt-6">
          <p>© {new Date().getFullYear()} BRMS. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-text-primary text-text-secondary" href="#">
              Privacy
            </a>
            <a className="hover:text-text-primary text-text-secondary" href="#">
              Terms
            </a>
            <a className="hover:text-text-primary text-text-secondary" href="#">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

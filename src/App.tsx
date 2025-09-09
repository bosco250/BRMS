import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./contexts/CartContext";
import CartSidebar from "./components/CartSidebar";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <div className="min-h-dvh flex flex-col bg-surface-primary text-text-primary">
          <Navbar />
          <main className="flex-1">
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </main>
          <Footer />
          <CartSidebar />

          {/* Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastClassName="rounded-lg shadow-lg"
            progressClassName="bg-brand"
          />
        </div>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;

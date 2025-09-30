import { Outlet } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";
import ErrorBoundary from "./components/ErrorBoundary";
import FloatingCartButton from "./components/FloatingCartButton";

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-dvh flex flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-1">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
        <Footer />
        <CartSidebar />
        <FloatingCartButton />
        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={7000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="rounded-lg shadow-lg"
          progressClassName="bg-orange-500"
          transition={Slide}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;

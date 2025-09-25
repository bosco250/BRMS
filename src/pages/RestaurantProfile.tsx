import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  FaStar,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaGlobe,
  FaWheelchair,
  FaHeart,
  FaShare,
  FaCalendarAlt,
  FaUtensils,
  FaWineGlassAlt,
  FaWifi,
  FaParking,
  FaUsers,
  FaEnvelope,
  FaCreditCard,
  FaPrint,
  FaTimes,
  FaCheck,
  FaExternalLinkAlt,
  FaMapPin,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { fetchBusinessById } from "./businessApiServise";
import type { ApiBusinessDetail } from "./businessApiServise";
import { useCart } from "../contexts/CartContext";
import type { CartItem } from "../data/checkoutTypes";
import { toast } from "react-toastify";
import RestaurantProfileSkeleton from "../components/RestaurantProfileSkeleton";


function Rating({ value }: { value: number }) {
  const fullStars = Math.floor(value);
  const hasHalf = value - fullStars >= 0.5;
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < fullStars || (i === fullStars && hasHalf);
    return (
      <FaStar
        key={i}
        className={`h-4 w-4 ${filled ? "text-warning" : "text-border-subtle"}`}
      />
    );
  });
  return <div className="flex items-center gap-1">{stars}</div>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function RestaurantProfile() {
  const { id } = useParams<{ id: string }>();
  const [business, setBusiness] = useState<ApiBusinessDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [showExplore, setShowExplore] = useState(true);
  const { addItem } = useCart();

  // State for various modals and interactions
  const [isFavorited, setIsFavorited] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showHoursModal, setShowHoursModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // New state for user-friendly features
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("menu");

  // Reservation form state
  const [reservationData, setReservationData] = useState({
    date: "",
    time: "",
    guests: 2,
    name: "",
    phone: "",
    email: "",
    specialRequests: "",
  });

  // Fetch business data
  useEffect(() => {
    if (!id) return;

    let isMounted = true;
    setLoading(true);
    setError("");

    fetchBusinessById(id)
      .then((data) => {
        if (!isMounted) return;
        setBusiness(data);
      })
      .catch((e) => {
        if (!isMounted) return;
        setError("Failed to load business details");
        console.error(e);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY > 120) {
        setShowExplore(false);
        window.removeEventListener("scroll", onScroll);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Show loading state
  if (loading) {
    return <RestaurantProfileSkeleton />;
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-surface-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-error mb-4">{error}</p>
          <Link
            to="/businesses"
            className="inline-flex items-center px-4 py-2 bg-brand text-text-inverted rounded-md hover:bg-brand-dark"
          >
            Back to Businesses
          </Link>
        </div>
      </div>
    );
  }

  // Redirect to businesses page if business not found
  if (!business) {
    return <Navigate to="/businesses" replace />;
  }

  // Handler functions
  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast.success(
      isFavorited ? "Removed from favorites" : "Added to favorites"
    );
  };

  const handleShare = async () => {
    const shareData = {
      title: business.name,
      text: `Check out ${business.name} - ${business.cuisine}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("Shared successfully!");
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleReservation = () => {
    setShowReservationModal(true);
  };

  const handleOrderOnline = () => {
    const menuSection = document.getElementById("menu-section");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleGetDirections = () => {
    const address = encodeURIComponent(business.address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
    window.open(mapsUrl, "_blank");
    toast.success("Opening directions in Google Maps");
  };

  const handleViewHours = () => {
    setShowHoursModal(true);
  };

  const handleCheckAvailability = () => {
    setShowAvailabilityModal(true);
  };

  const handleViewPaymentOptions = () => {
    setShowPaymentModal(true);
  };

  const handlePrintMenu = () => {
    window.print();
    toast.success("Print dialog opened");
  };

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success(
        "Reservation confirmed! You'll receive a confirmation email shortly."
      );
      setShowReservationModal(false);
      setReservationData({
        date: "",
        time: "",
        guests: 2,
        name: "",
        phone: "",
        email: "",
        specialRequests: "",
      });
    } catch (error) {
      toast.error("Failed to make reservation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const categories =
    business.menu && business.menu.length > 0
      ? [...new Set(business.menu.map((item: any) => item.category))]
      : [];

  // Filter menu items based on category
  const filteredMenuItems =
    business.menu?.filter((item: any) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      return matchesCategory;
    }) || [];

  // Get popular items for quick order
  const popularItems = business.menu?.filter((item: any) => item.popular) || [];

  return (
    <section className="min-h-screen bg-gradient-to-br from-surface-secondary via-surface-primary to-surface-secondary relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-success/3 rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Link
            to="/businesses"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-brand transition-all duration-300 mb-8 group bg-surface-primary/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border-subtle/50 hover:border-brand/30 hover:shadow-lg"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">
              ←
            </span>
            Back to Businesses
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Restaurant Header */}
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h1 className="text-5xl font-bold text-text-primary bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
                        {business.name}
                      </h1>
                      <div
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                          business.type === "business"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {business.type === "business" ? (
                          <FaUtensils className="w-4 h-4" />
                        ) : (
                          <FaWineGlassAlt className="w-4 h-4" />
                        )}
                        <span className="capitalize">{business.type}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleFavorite}
                          className={`p-3 transition-all duration-300 hover:scale-110 rounded-full ${
                            isFavorited
                              ? "text-error bg-error/10"
                              : "text-text-muted hover:text-error hover:bg-error/10"
                          }`}
                        >
                          <FaHeart
                            className={`h-5 w-5 ${
                              isFavorited ? "fill-current" : ""
                            }`}
                          />
                        </button>
                        <button
                          onClick={handleShare}
                          className="p-3 text-text-muted hover:text-brand transition-all duration-300 hover:scale-110 hover:bg-brand/10 rounded-full"
                        >
                          <FaShare className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl text-accent font-semibold bg-accent/10 px-4 py-2 rounded-full">
                        {business.cuisine}
                      </span>
                      {business.openNow && (
                        <span className="bg-success text-text-inverted px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-pulse">
                          Open Now
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex items-center gap-2">
                        <Rating value={business.rating} />
                        <span className="text-text-secondary font-semibold text-lg">
                          {business.rating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-text-secondary">•</span>
                      <span className="text-text-secondary font-medium">
                        {business.priceRange}
                      </span>
                      <span className="text-text-secondary">•</span>
                      <span className="text-text-secondary">
                        {business.capacity} seats
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed text-lg">
                  {business.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleReservation}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand to-brand-hover px-8 py-4 text-lg font-semibold text-text-inverted hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!business.acceptsReservations}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-hover to-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      <FaCalendarAlt className="h-5 w-5" />
                      {business.acceptsReservations
                        ? "Reserve Table"
                        : "Reservations Unavailable"}
                    </div>
                  </button>
                  <button
                    onClick={handleOrderOnline}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent to-accent-hover px-8 py-4 text-lg font-semibold text-text-inverted hover:shadow-2xl transition-all duration-300 hover:scale-105 ring-2 ring-accent/30 hover:ring-accent/50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-hover to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      {business.type === "restaurant" ? (
                        <FaUtensils className="h-5 w-5" />
                      ) : (
                        <FaWineGlassAlt className="h-5 w-5" />
                      )}
                      {business.type === "restaurant"
                        ? "🍽️ View Menu & Order"
                        : "🍷 View Menu"}
                    </div>
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  Features
                </h3>
                <div className="flex flex-wrap gap-3">
                  {business.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-gradient-to-r from-brand/10 to-brand/5 px-6 py-3 text-sm font-medium text-brand ring-1 ring-brand/20 hover:bg-brand/20 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  Amenities
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {business.amenities.map((amenity: string) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 text-text-secondary bg-surface-primary/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-border-subtle/50 hover:border-brand/30 transition-all duration-300"
                    >
                      {amenity.includes("WiFi") && (
                        <FaWifi className="h-5 w-5 text-brand" />
                      )}
                      {amenity.includes("Parking") && (
                        <FaParking className="h-5 w-5 text-accent" />
                      )}
                      {amenity.includes("Wheelchair") && (
                        <FaWheelchair className="h-5 w-5 text-success" />
                      )}
                      {amenity.includes("Outdoor") && (
                        <FaUsers className="h-5 w-5 text-info" />
                      )}
                      <span className="font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Image Gallery */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative group">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border-subtle/50 bg-gradient-to-br from-border-subtle/40 to-border-subtle/20">
                  <img
                    src={business.image}
                    alt={business.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="eager"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=900&fit=crop";
                    }}
                  />
                </div>

                {/* Image overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl"></div>

                {/* Status badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-3">
                  {business.openNow && (
                    <div className="bg-success text-text-inverted px-4 py-2 rounded-full text-sm font-medium shadow-xl backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-text-inverted rounded-full animate-pulse"></div>
                        Open Now
                      </div>
                    </div>
                  )}
                </div>

                {/* Rating badge */}
                <div className="absolute top-6 right-6 bg-surface-primary/90 backdrop-blur-sm text-text-primary px-4 py-2 rounded-full shadow-xl">
                  <div className="flex items-center gap-2">
                    <FaStar className="h-4 w-4 text-warning" />
                    <span className="font-semibold">
                      {business.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional image thumbnails */}
              <div className="flex gap-3 mt-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex-1 aspect-video rounded-xl overflow-hidden shadow-lg ring-1 ring-border-subtle/50 hover:ring-brand/50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="h-full w-full bg-gradient-to-br from-border-subtle/40 to-border-subtle/20 flex items-center justify-center">
                      <span className="text-text-muted text-sm">+{i}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Info Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div
              className="group relative bg-gradient-to-br from-brand/10 to-brand/5 rounded-2xl p-6 border border-brand/30 hover:border-brand/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              onClick={handleOrderOnline}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-brand/20 to-brand/10 group-hover:scale-110 transition-transform duration-300">
                    <FaUtensils className="text-brand h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-brand">
                    Quick Menu
                  </h3>
                </div>
                <p className="text-text-secondary leading-relaxed mb-3">
                  Browse our delicious menu and start ordering
                </p>
                <div className="flex items-center gap-2 text-brand font-medium text-sm">
                  <span>View Menu</span>
                  <FaChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="group relative bg-gradient-to-br from-surface-primary to-surface-secondary rounded-2xl p-6 border border-border-subtle/50 hover:border-brand/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-brand/10 to-brand/5 group-hover:scale-110 transition-transform duration-300">
                    <FaMapMarkerAlt className="text-brand h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    Location
                  </h3>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  {business.address}
                </p>
                <button
                  onClick={handleGetDirections}
                  className="mt-3 text-brand hover:text-brand-hover font-medium text-sm transition-colors duration-300 flex items-center gap-2 hover:gap-3"
                >
                  <FaMapPin className="w-3 h-3" />
                  Get Directions
                  <FaExternalLinkAlt className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="group relative bg-gradient-to-br from-surface-primary to-surface-secondary rounded-2xl p-6 border border-border-subtle/50 hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 group-hover:scale-110 transition-transform duration-300">
                    <FaClock className="text-accent h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    Hours
                  </h3>
                </div>
                <div className="space-y-2">
                  <p className="text-text-secondary font-medium">
                    {business.opensAt} - {business.closesAt}
                  </p>
                  <p className="text-sm text-text-muted">
                    Avg. wait: {business.averageWaitTime}
                  </p>
                </div>
                <button
                  onClick={handleViewHours}
                  className="mt-3 text-accent hover:text-accent-hover font-medium text-sm transition-colors duration-300 flex items-center gap-2 hover:gap-3"
                >
                  <FaClock className="w-3 h-3" />
                  View Full Hours
                  <FaChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="group relative bg-gradient-to-br from-surface-primary to-surface-secondary rounded-2xl p-6 border border-border-subtle/50 hover:border-success/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-success/10 to-success/5 group-hover:scale-110 transition-transform duration-300">
                    <FaUsers className="text-success h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    Capacity
                  </h3>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-success">
                    {business.capacity}
                  </p>
                  <p className="text-text-secondary">seats available</p>
                </div>
                <button
                  onClick={handleCheckAvailability}
                  className="mt-3 text-success hover:text-success/80 font-medium text-sm transition-colors duration-300 flex items-center gap-2 hover:gap-3"
                >
                  <FaUsers className="w-3 h-3" />
                  Check Availability
                  <FaChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="group relative bg-gradient-to-br from-surface-primary to-surface-secondary rounded-2xl p-6 border border-border-subtle/50 hover:border-info/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-info/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-info/10 to-info/5 group-hover:scale-110 transition-transform duration-300">
                    <FaCreditCard className="text-info h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    Payment
                  </h3>
                </div>
                <div className="space-y-2">
                  <p className="text-text-secondary">
                    {business.paymentMethods.join(", ")}
                  </p>
                </div>
                <button
                  onClick={handleViewPaymentOptions}
                  className="mt-3 text-info hover:text-info/80 font-medium text-sm transition-colors duration-300 flex items-center gap-2 hover:gap-3"
                >
                  <FaCreditCard className="w-3 h-3" />
                  View Options
                  <FaChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Contact Info */}
        <motion.div
          className="grid sm:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div className="group relative bg-gradient-to-br from-surface-primary to-surface-secondary rounded-2xl p-6 border border-border-subtle/50 hover:border-brand/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-brand/10 to-brand/5 group-hover:scale-110 transition-transform duration-300">
                    <FaPhone className="text-brand h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    Phone
                  </h3>
                </div>
                <a
                  href={`tel:${business.phone}`}
                  className="text-text-secondary hover:text-brand transition-colors font-medium"
                >
                  {business.phone}
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="group relative bg-gradient-to-br from-surface-primary to-surface-secondary rounded-2xl p-6 border border-border-subtle/50 hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 group-hover:scale-110 transition-transform duration-300">
                    <FaEnvelope className="text-accent h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    Email
                  </h3>
                </div>
                <a
                  href={`mailto:${business.email}`}
                  className="text-text-secondary hover:text-accent transition-colors font-medium"
                >
                  {business.email}
                </a>
              </div>
            </div>
          </motion.div>

          {business.website && (
            <motion.div variants={itemVariants}>
              <div className="group relative bg-gradient-to-br from-surface-primary to-surface-secondary rounded-2xl p-6 border border-border-subtle/50 hover:border-success/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-success/10 to-success/5 group-hover:scale-110 transition-transform duration-300">
                      <FaGlobe className="text-success h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      Website
                    </h3>
                  </div>
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-success transition-colors font-medium"
                  >
                    Visit website
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Floating Explore Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={showExplore ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-x-0 bottom-6 z-40 flex justify-center pointer-events-none"
        >
          {showExplore && (
            <motion.button
              onClick={() => {
                const el = document.getElementById("menu-section");
                if (el)
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              animate={{
                boxShadow: [
                  "0 8px 24px rgba(0,0,0,0.12)",
                  "0 10px 28px rgba(0,0,0,0.16)",
                  "0 8px 24px rgba(0,0,0,0.12)",
                ],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              aria-label="Scroll to explore our menu"
              className="pointer-events-auto px-5 py-3 rounded-full bg-accent/15 text-accent font-semibold shadow-xl hover:bg-accent/25 transition-colors flex items-center gap-2 ring-1 ring-accent/30 backdrop-blur-xl"
            >
              <motion.span
                animate={{ y: [0, 3, 0], opacity: [1, 0.9, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: "easeInOut",
                }}
                className="inline-block"
              >
                ↓
              </motion.span>
              <span>Scroll to explore our menu</span>
            </motion.button>
          )}
        </motion.div>

        {/* Sticky Navigation Tabs */}
        <div className="sticky top-16 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab("menu")}
                className={`px-6 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === "menu"
                    ? "border-brand text-brand"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                🍽️ Menu
              </button>
              <button
                onClick={() => setActiveTab("info")}
                className={`px-6 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === "info"
                    ? "border-brand text-brand"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                ℹ️ Info
              </button>
              <button
                onClick={() => setActiveTab("reserve")}
                className={`px-6 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === "reserve"
                    ? "border-brand text-brand"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                📅 Reserve
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "menu" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div
              id="menu-section"
              className="sticky top-32 z-40 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-8 bg-surface-primary/95 backdrop-blur-xl border-b border-border-secondary/50 mb-12 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-text-primary mb-2">
                    {business.type === "restaurant"
                      ? "Our Menu"
                      : "Our Drinks & Menu"}
                  </h2>
                  <p className="text-text-secondary">
                    {business.type === "restaurant"
                      ? "Discover our delicious food offerings"
                      : "Explore our curated selection of drinks and bites"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-text-muted">
                    {business.menu.length} items available
                  </div>
                  <button
                    onClick={handlePrintMenu}
                    className="group relative overflow-hidden rounded-lg bg-brand hover:bg-brand-hover px-4 py-2 text-sm font-semibold text-text-inverted transition-all duration-200 hover:shadow-lg"
                  >
                    <div className="relative flex items-center gap-2">
                      <FaPrint className="h-4 w-4" />
                      Print Menu
                    </div>
                  </button>
                </div>
              </div>

              {/* Category Filter */}
              <div className="mt-6">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === "all"
                        ? "bg-brand text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All Items
                  </button>
                  {categories.map((category: string) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === category
                          ? "bg-brand text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Popular Items Section */}
            {popularItems.length > 0 && (
              <motion.div className="mb-12" variants={itemVariants}>
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-xl font-bold text-text-primary">
                    ⭐ Popular Items
                  </h3>
                  <div className="text-sm text-text-muted bg-orange-100 px-2 py-1 rounded-full">
                    {popularItems.length} popular
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {popularItems.map((item: any) => (
                    <motion.div
                      key={`popular_${item.id}`}
                      className="group bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* Image */}
                      <div className="relative h-40 bg-gray-100 overflow-hidden">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&q=80`;
                            }}
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                            <FaUtensils className="w-8 h-8 text-gray-400" />
                          </div>
                        )}

                        {/* Popular Badge */}
                        <div className="absolute top-2 left-2">
                          <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                            ⭐ POPULAR
                          </span>
                        </div>

                        {/* Price */}
                        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded shadow-sm">
                          <span className="font-bold text-sm text-green-600">
                            RWF {item.price.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-3">
                        <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                          {item.description}
                        </p>

                        {/* Add to Cart Button */}
                        {item.available ? (
                          <button
                            onClick={() => {
                              const cartItem: CartItem = {
                                id: `popular_${Date.now()}`,
                                productId: item.id,
                                name: item.name,
                                description: item.description,
                                price: item.price,
                                quantity: 1,
                                totalPrice: item.price,
                                image: item.image,
                                category: item.category,
                                modifiers: [],
                              };
                              addItem(cartItem);
                            }}
                            className="w-full bg-brand hover:bg-brand-hover text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
                          >
                            Add to Cart
                          </button>
                        ) : (
                          <button
                            disabled
                            className="w-full bg-gray-300 text-gray-500 py-2 px-3 rounded-lg text-sm font-medium cursor-not-allowed"
                          >
                            Out of Stock
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Menu Categories */}
            {categories.map((category: string) => {
              const categoryItems = filteredMenuItems.filter(
                (item: any) => item.category === category
              );
              if (categoryItems.length === 0) return null;

              return (
                <motion.div
                  key={category}
                  className="mb-12"
                  variants={itemVariants}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-xl font-bold text-text-primary">
                      {category}
                    </h3>
                    <div className="text-sm text-text-muted bg-gray-100 px-2 py-1 rounded-full">
                      {categoryItems.length} items
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categoryItems.map((item: any) => (
                      <motion.div
                        key={item.id}
                        className="group bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                      >
                        {/* Image */}
                        <div className="relative h-40 bg-gray-100 overflow-hidden">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.src = `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&q=80`;
                              }}
                            />
                          ) : (
                            <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                              <FaUtensils className="w-8 h-8 text-gray-400" />
                            </div>
                          )}

                          {/* Badges */}
                          <div className="absolute top-2 left-2 flex flex-col gap-1">
                            {item.popular && (
                              <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                                ⭐ Popular
                              </span>
                            )}
                            {item.spicy && (
                              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                                🌶️ Spicy
                              </span>
                            )}
                            {item.vegetarian && (
                              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                                🌱 Veg
                              </span>
                            )}
                          </div>

                          {/* Price */}
                          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded shadow-sm">
                            <span className="font-bold text-sm text-green-600">
                              RWF {item.price.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-3">
                          <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">
                            {item.name}
                          </h4>
                          <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                            {item.description}
                          </p>

                          {/* Add to Cart Button */}
                          {item.available ? (
                            <button
                              onClick={() => {
                                const cartItem: CartItem = {
                                  id: `item_${Date.now()}`,
                                  productId: item.id,
                                  name: item.name,
                                  description: item.description,
                                  price: item.price,
                                  quantity: 1,
                                  totalPrice: item.price,
                                  image: item.image,
                                  category: item.category,
                                  modifiers: [],
                                };
                                addItem(cartItem);
                              }}
                              className="w-full bg-brand hover:bg-brand-hover text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
                            >
                              Add to Cart
                            </button>
                          ) : (
                            <button
                              disabled
                              className="w-full bg-gray-300 text-gray-500 py-2 px-3 rounded-lg text-sm font-medium cursor-not-allowed"
                            >
                              Out of Stock
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Info Tab */}
        {activeTab === "info" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-16"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div variants={itemVariants}>
                <div className="group relative bg-gradient-to-br from-surface-primary to-surface-secondary rounded-2xl p-6 border border-border-subtle/50 hover:border-brand/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-brand/10 to-brand/5 group-hover:scale-110 transition-transform duration-300">
                        <FaMapMarkerAlt className="text-brand h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Location
                      </h3>
                    </div>
                    <p className="text-text-secondary leading-relaxed">
                      {business.address}
                    </p>
                    <button
                      onClick={handleGetDirections}
                      className="mt-3 text-brand hover:text-brand-hover font-medium text-sm transition-colors duration-300 flex items-center gap-2 hover:gap-3"
                    >
                      <FaMapPin className="w-3 h-3" />
                      Get Directions
                      <FaExternalLinkAlt className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="group relative bg-gradient-to-br from-surface-primary to-surface-secondary rounded-2xl p-6 border border-border-subtle/50 hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 group-hover:scale-110 transition-transform duration-300">
                        <FaClock className="text-accent h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Hours
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-text-secondary font-medium">
                        {business.opensAt} - {business.closesAt}
                      </p>
                      <p className="text-sm text-text-muted">
                        Avg. wait: {business.averageWaitTime}
                      </p>
                    </div>
                    <button
                      onClick={handleViewHours}
                      className="mt-3 text-accent hover:text-accent-hover font-medium text-sm transition-colors duration-300 flex items-center gap-2 hover:gap-3"
                    >
                      <FaClock className="w-3 h-3" />
                      View Full Hours
                      <FaChevronDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="group relative bg-gradient-to-br from-surface-primary to-surface-secondary rounded-2xl p-6 border border-border-subtle/50 hover:border-success/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-success/10 to-success/5 group-hover:scale-110 transition-transform duration-300">
                        <FaUsers className="text-success h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Availability
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-text-secondary font-medium">
                        {business.capacity} seats available
                      </p>
                      <p className="text-sm text-text-muted">
                        Currently {business.openNow ? "Open" : "Closed"}
                      </p>
                    </div>
                    <button
                      onClick={handleCheckAvailability}
                      className="mt-3 text-success hover:text-success-hover font-medium text-sm transition-colors duration-300 flex items-center gap-2 hover:gap-3"
                    >
                      <FaUsers className="w-3 h-3" />
                      Check Availability
                      <FaChevronDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="group relative bg-gradient-to-br from-surface-primary to-surface-secondary rounded-2xl p-6 border border-border-subtle/50 hover:border-info/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-info/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-info/10 to-info/5 group-hover:scale-110 transition-transform duration-300">
                        <FaCreditCard className="text-info h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Payment
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-text-secondary font-medium">
                        {business.paymentMethods.length} methods accepted
                      </p>
                      <p className="text-sm text-text-muted">Secure payments</p>
                    </div>
                    <button
                      onClick={handleViewPaymentOptions}
                      className="mt-3 text-info hover:text-info-hover font-medium text-sm transition-colors duration-300 flex items-center gap-2 hover:gap-3"
                    >
                      <FaCreditCard className="w-3 h-3" />
                      View Payment Options
                      <FaChevronDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Reserve Tab */}
        {activeTab === "reserve" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-16"
          >
            <div className="max-w-2xl mx-auto">
              <div className="bg-surface-primary rounded-3xl p-8 shadow-2xl border border-border-subtle/20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-brand/10 rounded-full">
                    <FaCalendarAlt className="w-6 h-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary">
                      Reserve a Table
                    </h3>
                    <p className="text-text-secondary text-sm">
                      Book your perfect dining experience
                    </p>
                  </div>
                </div>

                <form onSubmit={handleReservationSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-text-primary">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        value={reservationData.date}
                        onChange={(e) =>
                          setReservationData({
                            ...reservationData,
                            date: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border-2 border-border-subtle px-4 py-3 text-text-primary bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-text-primary">
                        Time
                      </label>
                      <input
                        type="time"
                        required
                        value={reservationData.time}
                        onChange={(e) =>
                          setReservationData({
                            ...reservationData,
                            time: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border-2 border-border-subtle px-4 py-3 text-text-primary bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-text-primary">
                      Number of Guests
                    </label>
                    <select
                      value={reservationData.guests}
                      onChange={(e) =>
                        setReservationData({
                          ...reservationData,
                          guests: parseInt(e.target.value),
                        })
                      }
                      className="w-full rounded-xl border-2 border-border-subtle px-4 py-3 text-text-primary bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-text-primary">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={reservationData.name}
                      onChange={(e) =>
                        setReservationData({
                          ...reservationData,
                          name: e.target.value,
                        })
                      }
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border-2 border-border-subtle px-4 py-3 text-text-primary bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-text-primary">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={reservationData.phone}
                        onChange={(e) =>
                          setReservationData({
                            ...reservationData,
                            phone: e.target.value,
                          })
                        }
                        placeholder="+250 7xx xxx xxx"
                        className="w-full rounded-xl border-2 border-border-subtle px-4 py-3 text-text-primary bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-text-primary">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={reservationData.email}
                        onChange={(e) =>
                          setReservationData({
                            ...reservationData,
                            email: e.target.value,
                          })
                        }
                        placeholder="your@email.com"
                        className="w-full rounded-xl border-2 border-border-subtle px-4 py-3 text-text-primary bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-text-primary">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      value={reservationData.specialRequests}
                      onChange={(e) =>
                        setReservationData({
                          ...reservationData,
                          specialRequests: e.target.value,
                        })
                      }
                      rows={3}
                      placeholder="Any special dietary requirements, celebrations, or preferences..."
                      className="w-full rounded-xl border-2 border-border-subtle px-4 py-3 text-text-primary bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200 resize-none"
                    />
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setActiveTab("menu")}
                      className="flex-1 px-6 py-3 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-xl font-semibold transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-brand to-brand-hover hover:from-brand-hover hover:to-brand text-text-inverted px-6 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-text-inverted/30 border-t-text-inverted rounded-full animate-spin"></div>
                          Confirming...
                        </div>
                      ) : (
                        "Confirm Reservation"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {/* Reservation Modal */}
        {showReservationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowReservationModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-surface-primary rounded-3xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-border-subtle/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-brand/10 rounded-full">
                    <FaCalendarAlt className="w-6 h-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary">
                      Reserve a Table
                    </h3>
                    <p className="text-text-secondary text-sm">
                      Book your perfect dining experience
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowReservationModal(false)}
                  className="p-3 text-text-muted hover:text-text-primary hover:bg-surface-secondary rounded-full transition-all duration-200"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleReservationSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-text-primary">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={reservationData.date}
                      onChange={(e) =>
                        setReservationData({
                          ...reservationData,
                          date: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border-2 border-border-subtle px-4 py-3 text-text-primary bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-text-primary">
                      Time
                    </label>
                    <input
                      type="time"
                      required
                      value={reservationData.time}
                      onChange={(e) =>
                        setReservationData({
                          ...reservationData,
                          time: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border-2 border-border-subtle px-4 py-3 text-text-primary bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-text-primary">
                    Number of Guests
                  </label>
                  <select
                    value={reservationData.guests}
                    onChange={(e) =>
                      setReservationData({
                        ...reservationData,
                        guests: parseInt(e.target.value),
                      })
                    }
                    className="w-full rounded-xl border-2 border-border-subtle px-4 py-3 text-text-primary bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-text-primary">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={reservationData.name}
                    onChange={(e) =>
                      setReservationData({
                        ...reservationData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border-2 border-border-subtle px-4 py-3 text-text-primary bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-text-primary">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={reservationData.phone}
                      onChange={(e) =>
                        setReservationData({
                          ...reservationData,
                          phone: e.target.value,
                        })
                      }
                      placeholder="+250 7xx xxx xxx"
                      className="w-full rounded-xl border-2 border-border-subtle px-4 py-3 text-text-primary bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-text-primary">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={reservationData.email}
                      onChange={(e) =>
                        setReservationData({
                          ...reservationData,
                          email: e.target.value,
                        })
                      }
                      placeholder="your@email.com"
                      className="w-full rounded-xl border-2 border-border-subtle px-4 py-3 text-text-primary bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-text-primary">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    value={reservationData.specialRequests}
                    onChange={(e) =>
                      setReservationData({
                        ...reservationData,
                        specialRequests: e.target.value,
                      })
                    }
                    rows={3}
                    placeholder="Any special dietary requirements, celebrations, or preferences..."
                    className="w-full rounded-xl border-2 border-border-subtle px-4 py-3 text-text-primary bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200 resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowReservationModal(false)}
                    className="flex-1 px-6 py-3 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-xl font-semibold transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-brand to-brand-hover hover:from-brand-hover hover:to-brand text-text-inverted px-6 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-text-inverted/30 border-t-text-inverted rounded-full animate-spin"></div>
                        Confirming...
                      </div>
                    ) : (
                      "Confirm Reservation"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Hours Modal */}
        {showHoursModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowHoursModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-surface-primary rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-border-subtle/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <FaClock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary">
                      Operating Hours
                    </h3>
                    <p className="text-text-secondary text-sm">
                      When we're open for business
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowHoursModal(false)}
                  className="p-3 text-text-muted hover:text-text-primary hover:bg-surface-secondary rounded-full transition-all duration-200"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {[
                  {
                    day: "Monday - Friday",
                    hours: `${business.opensAt} - ${business.closesAt}`,
                  },
                  {
                    day: "Saturday",
                    hours: `${business.opensAt} - ${business.closesAt}`,
                  },
                  {
                    day: "Sunday",
                    hours: `${business.opensAt} - ${business.closesAt}`,
                  },
                ].map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-surface-secondary rounded-xl hover:bg-surface-secondary/80 transition-colors duration-200"
                  >
                    <span className="font-semibold text-text-primary">
                      {schedule.day}
                    </span>
                    <span className="text-text-secondary font-medium">
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className={`mt-8 p-6 rounded-2xl ${
                  business.openNow
                    ? "bg-success/10 border border-success/20"
                    : "bg-error/10 border border-error/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      business.openNow ? "bg-success/20" : "bg-error/20"
                    }`}
                  >
                    <FaCheck
                      className={`w-5 h-5 ${
                        business.openNow ? "text-success" : "text-error"
                      }`}
                    />
                  </div>
                  <div>
                    <span
                      className={`font-bold text-lg ${
                        business.openNow ? "text-success" : "text-error"
                      }`}
                    >
                      Currently {business.openNow ? "Open" : "Closed"}
                    </span>
                    <p className="text-text-secondary text-sm mt-1">
                      {business.openNow
                        ? "We're ready to serve you!"
                        : "We'll be back soon!"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Availability Modal */}
        {showAvailabilityModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAvailabilityModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg">
                    <FaUsers className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">
                      Seating Availability
                    </h3>
                    <p className="text-gray-600 text-lg">
                      Current table availability status
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAvailabilityModal(false)}
                  className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              {/* Main Capacity Display */}
              <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 mb-8">
                <div className="relative">
                  <div className="text-8xl font-bold text-green-600 mb-4">
                    {business.capacity}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    Seats Available
                  </div>
                  <div className="text-gray-600 text-lg">
                    Out of {business.capacity} total capacity
                  </div>

                  {/* Availability Status Badge */}
                  <div className="mt-4 inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Excellent Availability
                  </div>
                </div>
              </div>

              {/* Status Information */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 mb-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <FaCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      Great News! 🎉
                    </h4>
                    <div className="space-y-2 text-gray-700">
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Plenty of seating available for your visit
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        No need to worry about finding a table
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Walk-ins welcome at any time
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Group seating available
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center border border-blue-200"
                >
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    2-5 min
                  </div>
                  <div className="text-gray-700 font-semibold">
                    Average Wait Time
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Quick seating guaranteed
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center border border-purple-200"
                >
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    95%
                  </div>
                  <div className="text-gray-700 font-semibold">
                    Availability Rate
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Consistently high availability
                  </div>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleReservation}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  📅 Make a Reservation
                </button>
                <button
                  onClick={() => setShowAvailabilityModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
                >
                  Close
                </button>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 flex items-center justify-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="p-2 bg-green-100 rounded-full">
                  <FaCheck className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">
                  ✅ Real-time availability updates
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Payment Options Modal */}
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                    <FaCreditCard className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">
                      Payment Methods
                    </h3>
                    <p className="text-gray-600 text-lg">
                      Choose your preferred payment option
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              {/* Payment Methods Grid */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {business.paymentMethods.map(
                  (method: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl group-hover:scale-110 transition-transform duration-300">
                          <FaCreditCard className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900 mb-1">
                            {method}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Secure & instant payment
                          </p>
                        </div>
                        <div className="p-2 bg-green-100 rounded-full">
                          <FaCheck className="w-5 h-5 text-green-600" />
                        </div>
                      </div>

                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>
                  )
                )}
              </div>

              {/* Payment Info Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 mb-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <FaCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      Payment Information
                    </h4>
                    <div className="space-y-2 text-gray-700">
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        All major payment methods accepted
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Contactless payments preferred for safety
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Split bills and group payments available
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Instant payment confirmation
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="p-2 bg-green-100 rounded-full">
                  <FaCheck className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-green-800 font-semibold text-lg">
                  🔒 Secure & Encrypted Payments
                </span>
              </div>

              {/* Close Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

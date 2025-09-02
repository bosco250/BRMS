import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  FaWifi,
  FaParking,
  FaUsers,
  FaEnvelope,
  FaCreditCard,
  FaPrint,
} from "react-icons/fa";
import { getRestaurantById } from "../data/restaurants";
import InfoCard from "../components/InfoCard";
import { useCart } from "../contexts/CartContext";
import type { CartItem } from "../data/checkoutData";

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
  const restaurant = id ? getRestaurantById(id) : undefined;
  const [showExplore, setShowExplore] = useState(true);
  const { addItem } = useCart();

  // Redirect to restaurants page if restaurant not found
  if (!restaurant) {
    return <Navigate to="/resto" replace />;
  }

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

  const categories = [...new Set(restaurant.menu.map((item) => item.category))];

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
            to="/resto"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-brand transition-all duration-300 mb-8 group bg-surface-primary/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border-subtle/50 hover:border-brand/30 hover:shadow-lg"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">
              ←
            </span>
            Back to Restaurants
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Restaurant Header */}
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h1 className="text-5xl font-bold text-text-primary bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
                        {restaurant.name}
                      </h1>
                      <div className="flex gap-2">
                        <button className="p-3 text-text-muted hover:text-error transition-all duration-300 hover:scale-110 hover:bg-error/10 rounded-full">
                          <FaHeart className="h-5 w-5" />
                        </button>
                        <button className="p-3 text-text-muted hover:text-brand transition-all duration-300 hover:scale-110 hover:bg-brand/10 rounded-full">
                          <FaShare className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl text-accent font-semibold bg-accent/10 px-4 py-2 rounded-full">
                        {restaurant.cuisine}
                      </span>
                      {restaurant.openNow && (
                        <span className="bg-success text-text-inverted px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-pulse">
                          Open Now
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex items-center gap-2">
                        <Rating value={restaurant.rating} />
                        <span className="text-text-secondary font-semibold text-lg">
                          {restaurant.rating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-text-secondary">•</span>
                      <span className="text-text-secondary font-medium">
                        {restaurant.priceRange}
                      </span>
                      <span className="text-text-secondary">•</span>
                      <span className="text-text-secondary">
                        {restaurant.capacity} seats
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed text-lg">
                  {restaurant.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand to-brand-hover px-8 py-4 text-lg font-semibold text-text-inverted hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-hover to-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      <FaCalendarAlt className="h-5 w-5" />
                      Reserve Table
                    </div>
                  </button>
                  <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent to-accent-hover px-8 py-4 text-lg font-semibold text-text-inverted hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-hover to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      <FaUtensils className="h-5 w-5" />
                      Order Online
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
                  {restaurant.tags.map((tag) => (
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
                  {restaurant.amenities.map((amenity) => (
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
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border-subtle/50">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="eager"
                  />
                </div>

                {/* Image overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl"></div>

                {/* Status badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-3">
                  {restaurant.openNow && (
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
                      {restaurant.rating.toFixed(1)}
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
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
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
                    <FaMapMarkerAlt className="text-brand h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    Location
                  </h3>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  {restaurant.address}
                </p>
                <button className="mt-3 text-brand hover:text-brand-hover font-medium text-sm transition-colors duration-300">
                  Get Directions →
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
                    {restaurant.opensAt} - {restaurant.closesAt}
                  </p>
                  <p className="text-sm text-text-muted">
                    Avg. wait: {restaurant.averageWaitTime}
                  </p>
                </div>
                <button className="mt-3 text-accent hover:text-accent-hover font-medium text-sm transition-colors duration-300">
                  View Full Hours →
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
                    {restaurant.capacity}
                  </p>
                  <p className="text-text-secondary">seats available</p>
                </div>
                <button className="mt-3 text-success hover:text-success/80 font-medium text-sm transition-colors duration-300">
                  Check Availability →
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
                    {restaurant.paymentMethods.join(", ")}
                  </p>
                </div>
                <button className="mt-3 text-info hover:text-info/80 font-medium text-sm transition-colors duration-300">
                  View Options →
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
                  href={`tel:${restaurant.phone}`}
                  className="text-text-secondary hover:text-brand transition-colors font-medium"
                >
                  {restaurant.phone}
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
                  href={`mailto:${restaurant.email}`}
                  className="text-text-secondary hover:text-accent transition-colors font-medium"
                >
                  {restaurant.email}
                </a>
              </div>
            </div>
          </motion.div>

          {restaurant.website && (
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
                    href={restaurant.website}
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

        {/* Customer Reviews Section */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Customer Reviews
            </h2>
            <p className="text-text-secondary text-lg">
              What our customers are saying
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                rating: 5,
                comment:
                  "Amazing food and excellent service! The atmosphere is perfect for a romantic dinner.",
                date: "2 days ago",
              },
              {
                name: "Michael Chen",
                rating: 4,
                comment:
                  "Great variety of dishes and reasonable prices. Will definitely come back again.",
                date: "1 week ago",
              },
              {
                name: "Emily Rodriguez",
                rating: 5,
                comment:
                  "The staff was incredibly friendly and the food was absolutely delicious. Highly recommended!",
                date: "2 weeks ago",
              },
            ].map((review, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-gradient-to-br from-surface-primary to-surface-secondary rounded-2xl p-6 border border-border-subtle/50 hover:border-brand/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand/20 to-brand/10 rounded-full flex items-center justify-center">
                      <span className="text-brand font-bold text-lg">
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary">
                        {review.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <Rating value={review.rating} />
                        <span className="text-sm text-text-muted">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-gradient-to-r from-brand to-brand-hover text-text-inverted px-8 py-3 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
              View All Reviews
            </button>
          </div>
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

        {/* Enhanced Menu */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div
            id="menu-section"
            className="sticky top-16 z-40 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-6 bg-surface-primary/90 backdrop-blur-xl supports-[backdrop-filter]:bg-surface-primary/80 border-b border-border-secondary/50 mb-12"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-bold text-text-primary mb-2">
                  Our Menu
                </h2>
                <p className="text-text-secondary">
                  Discover our delicious offerings
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand to-brand-hover px-6 py-3 text-sm font-semibold text-text-inverted hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-hover to-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-2">
                    <FaPrint className="h-4 w-4" />
                    Print Menu
                  </div>
                </button>
              </div>
            </div>
          </div>

          {categories.map((category) => (
            <motion.div
              key={category}
              className="mb-16"
              variants={itemVariants}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-2 h-12 bg-gradient-to-b from-brand to-brand-hover rounded-full"></div>
                <h3 className="text-3xl font-bold text-text-primary">
                  {category}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-border-subtle to-transparent"></div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {restaurant.menu
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <motion.div
                      key={item.id}
                      className="group relative bg-gradient-to-br from-surface-primary to-surface-secondary rounded-3xl border border-border-subtle/50 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
                      whileHover={{ scale: 1.03 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      {/* Background gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {item.image && (
                        <div className="aspect-[4/3] bg-border-subtle/40 relative overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                          {/* Badges */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {item.popular && (
                              <span className="bg-gradient-to-r from-accent to-accent-hover text-text-inverted px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                Popular
                              </span>
                            )}
                            {item.spicy && (
                              <span className="bg-gradient-to-r from-error to-error/80 text-text-inverted px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                Spicy
                              </span>
                            )}
                            {item.vegetarian && (
                              <span className="bg-gradient-to-r from-success to-success/80 text-text-inverted px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                Vegetarian
                              </span>
                            )}
                          </div>

                          {/* Price badge */}
                          <div className="absolute top-4 right-4 bg-surface-primary/90 backdrop-blur-sm text-text-primary px-3 py-1 rounded-full shadow-lg">
                            <span className="font-bold text-lg">
                              RWF {item.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="relative p-6">
                        <div className="mb-4">
                          <h4 className="font-bold text-text-primary text-xl mb-3 group-hover:text-brand transition-colors duration-300">
                            {item.name}
                          </h4>
                          <p className="text-text-secondary leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {!item.available && (
                          <div className="mb-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-error/10 text-error border border-error/20">
                              Out of stock
                            </span>
                          </div>
                        )}

                        {item.available && (
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
                            className="w-full group/btn relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand to-brand-hover py-3 px-4 font-semibold text-text-inverted hover:shadow-xl transition-all duration-300 hover:scale-105"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-hover to-brand opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex items-center justify-center gap-2">
                              <FaUtensils className="h-4 w-4" />
                              Add to Cart
                            </div>
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

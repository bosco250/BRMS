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
    <section className="py-16 sm:py-20 bg-gradient-to-br from-surface-secondary via-surface-primary to-surface-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Link
            to="/resto"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-brand transition-colors mb-6 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            Back to Restaurants
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div variants={itemVariants}>
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-bold text-text-primary">
                      {restaurant.name}
                    </h1>
                    <button className="p-2 text-text-muted hover:text-error transition-colors">
                      <FaHeart className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-text-muted hover:text-brand transition-colors">
                      <FaShare className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-xl text-accent font-medium mb-3">
                    {restaurant.cuisine}
                  </p>
                  <div className="flex items-center gap-6 mb-4">
                    <Rating value={restaurant.rating} />
                    <span className="text-text-secondary font-medium">
                      {restaurant.rating.toFixed(1)} rating
                    </span>
                    <span className="text-text-secondary">•</span>
                    <span className="text-text-secondary">
                      {restaurant.priceRange}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <button className="rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-text-inverted hover:bg-brand-hover transition-colors shadow-lg hover:shadow-xl">
                    <FaCalendarAlt className="mr-2 inline" />
                    Reserve Table
                  </button>
                  <button className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-text-inverted hover:bg-accent-hover transition-colors shadow-lg hover:shadow-xl">
                    <FaUtensils className="mr-2 inline" />
                    Order Online
                  </button>
                </div>
              </div>

              <p className="text-text-secondary leading-relaxed mb-6">
                {restaurant.description}
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                {restaurant.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-brand/10 px-4 py-2 text-sm font-medium text-brand ring-1 ring-brand/20 hover:bg-brand/20 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                {restaurant.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 text-text-secondary"
                  >
                    {amenity.includes("WiFi") && <FaWifi className="h-4 w-4" />}
                    {amenity.includes("Parking") && (
                      <FaParking className="h-4 w-4" />
                    )}
                    {amenity.includes("Wheelchair") && (
                      <FaWheelchair className="h-4 w-4" />
                    )}
                    {amenity.includes("Outdoor") && (
                      <FaUsers className="h-4 w-4" />
                    )}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
              </div>
              {restaurant.openNow && (
                <div className="absolute top-4 left-4 bg-success text-text-inverted px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  Open Now
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Info Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <InfoCard
              title="Location"
              icon={<FaMapMarkerAlt className="text-brand h-6 w-6" />}
              accentClass="bg-brand/10"
            >
              <p className="text-sm text-text-secondary leading-relaxed">
                {restaurant.address}
              </p>
            </InfoCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <InfoCard
              title="Hours"
              icon={<FaClock className="text-accent h-6 w-6" />}
              accentClass="bg-accent/10"
            >
              <p className="text-sm text-text-secondary">
                {restaurant.opensAt} - {restaurant.closesAt}
              </p>
              <p className="text-xs text-text-muted mt-1">
                Avg. wait: {restaurant.averageWaitTime}
              </p>
            </InfoCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <InfoCard
              title="Capacity"
              icon={<FaUsers className="text-success h-6 w-6" />}
              accentClass="bg-success/10"
            >
              <p className="text-sm text-text-secondary">
                {restaurant.capacity} seats
              </p>
            </InfoCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <InfoCard
              title="Payment"
              icon={<FaCreditCard className="text-info h-6 w-6" />}
              accentClass="bg-info/10"
            >
              <p className="text-sm text-text-secondary">
                {restaurant.paymentMethods.join(", ")}
              </p>
            </InfoCard>
          </motion.div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="grid sm:grid-cols-3 gap-6 mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <InfoCard
              title="Phone"
              icon={<FaPhone className="text-brand h-5 w-5" />}
              accentClass="bg-brand/10"
            >
              <a
                href={`tel:${restaurant.phone}`}
                className="text-sm text-text-secondary hover:text-brand transition-colors"
              >
                {restaurant.phone}
              </a>
            </InfoCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <InfoCard
              title="Email"
              icon={<FaEnvelope className="text-accent h-5 w-5" />}
              accentClass="bg-accent/10"
            >
              <a
                href={`mailto:${restaurant.email}`}
                className="text-sm text-text-secondary hover:text-accent transition-colors"
              >
                {restaurant.email}
              </a>
            </InfoCard>
          </motion.div>

          {restaurant.website && (
            <motion.div variants={itemVariants}>
              <InfoCard
                title="Website"
                icon={<FaGlobe className="text-success h-5 w-5" />}
                accentClass="bg-success/10"
              >
                <a
                  href={restaurant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-success transition-colors"
                >
                  Visit website
                </a>
              </InfoCard>
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

        {/* Menu */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div
            id="menu-section"
            className="sticky top-16 z-40 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 bg-surface-primary/85 backdrop-blur supports-[backdrop-filter]:bg-surface-primary/75 border-b border-border-secondary mb-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-text-primary">Menu</h2>
              <div className="flex items-center gap-4">
                <button className="rounded-lg bg-brand flex justify-center items-center px-6 py-3 text-sm font-semibold text-text-inverted hover:bg-brand-hover transition-colors shadow-lg hover:shadow-xl">
                  <FaPrint className="mr-2" />
                  Print Menu
                </button>
              </div>
            </div>
          </div>

          {categories.map((category) => (
            <motion.div
              key={category}
              className="mb-12"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold text-text-primary mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-brand rounded-full"></span>
                {category}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {restaurant.menu
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <motion.div
                      key={item.id}
                      className="group rounded-2xl bg-dashboard ring-1 ring-border-subtle overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      {item.image && (
                        <div className="aspect-[4/3] bg-border-subtle/40 relative overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3 flex gap-2">
                            {item.popular && (
                              <span className="bg-accent text-text-inverted px-2 py-1 rounded-full text-xs font-medium">
                                Popular
                              </span>
                            )}
                            {item.spicy && (
                              <span className="bg-error text-text-inverted px-2 py-1 rounded-full text-xs font-medium">
                                Spicy
                              </span>
                            )}
                            {item.vegetarian && (
                              <span className="bg-success text-text-inverted px-2 py-1 rounded-full text-xs font-medium">
                                Veg
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-text-primary text-lg mb-2">
                              {item.name}
                            </h4>
                            <p className="text-sm text-text-secondary leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-right">
                            <p className="font-bold text-text-primary text-lg">
                              RWF {item.price.toLocaleString()}
                            </p>
                            {!item.available && (
                              <span className="text-xs text-error font-medium">
                                Out of stock
                              </span>
                            )}
                          </div>
                        </div>
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

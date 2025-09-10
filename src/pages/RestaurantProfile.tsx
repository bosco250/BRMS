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
} from "react-icons/fa";
import { getRestaurantById } from "../data/restaurants";
import { useCart } from "../contexts/CartContext";
import type { CartItem } from "../data/checkoutData";
import { toast } from "react-toastify";

// Mock bar data (same as in Resto.tsx)
const bars = [
  {
    id: "b1",
    name: "Sky Lounge",
    cuisine: "Cocktail Bar",
    rating: 4.5,
    city: "Kigali",
    address: "Kacyiru, KG 2 Ave, Kigali, Rwanda",
    phone: "+250 788 234 567",
    email: "info@skylounge.rw",
    website: "https://skylounge.rw",
    openNow: true,
    opensAt: "18:00",
    closesAt: "02:00",
    tags: ["Cocktails", "Rooftop", "Live Music", "Premium"],
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop",
    description:
      "Elegant rooftop bar with panoramic city views and craft cocktails",
    capacity: 80,
    acceptsReservations: true,
    paymentMethods: ["Cash", "Card", "Mobile Money"],
    menu: [
      {
        id: "b1_d1",
        name: "Signature Cocktails",
        description: "Premium craft cocktails made with premium spirits",
        price: 0,
        category: "Cocktails",
        available: true,
        image:
          "https://images.unsplash.com/photo-1514362545857-3bc16c4c7f1a?w=300&h=200&fit=crop",
        popular: true,
      },
      {
        id: "b1_d2",
        name: "Sky High Martini",
        description: "Gin martini with a twist, served with city views",
        price: 15,
        category: "Cocktails",
        available: true,
        popular: true,
      },
      {
        id: "b1_d3",
        name: "Sunset Spritz",
        description: "Aperol spritz with prosecco and orange slice",
        price: 12,
        category: "Cocktails",
        available: true,
      },
      {
        id: "b1_d4",
        name: "Rooftop Old Fashioned",
        description: "Classic bourbon cocktail with house-made simple syrup",
        price: 18,
        category: "Cocktails",
        available: true,
      },
      {
        id: "b1_d5",
        name: "Champagne Selection",
        description: "Premium champagne by the glass",
        price: 25,
        category: "Wine",
        available: true,
      },
      {
        id: "b1_d6",
        name: "Craft Beer Selection",
        description: "Local and international craft beers",
        price: 8,
        category: "Beer",
        available: true,
      },
      {
        id: "b1_d7",
        name: "Bar Snacks",
        description: "Artisanal nuts, olives, and charcuterie board",
        price: 16,
        category: "Food",
        available: true,
      },
    ],
    amenities: ["Rooftop", "Live Music", "Valet Parking", "WiFi"],
    averageWaitTime: "5-10 min",
    priceRange: "$$$",
    type: "bar",
  },
  {
    id: "b2",
    name: "Brew & Bites",
    cuisine: "Craft Beer Bar",
    rating: 4.3,
    city: "Kigali",
    address: "Nyamirambo, KG 1 Ave, Kigali, Rwanda",
    phone: "+250 788 345 678",
    email: "info@brewbites.rw",
    website: "https://brewbites.rw",
    openNow: true,
    opensAt: "16:00",
    closesAt: "01:00",
    tags: ["Craft Beer", "Pub Food", "Sports", "Casual"],
    image:
      "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=400&h=300&fit=crop",
    description: "Local craft beer bar with pub food and sports viewing",
    capacity: 60,
    acceptsReservations: false,
    paymentMethods: ["Cash", "Card"],
    menu: [
      {
        id: "b2_d1",
        name: "Craft Beer Flight",
        description: "Sample 4 different local craft beers",
        price: 20,
        category: "Beer",
        available: true,
        popular: true,
      },
      {
        id: "b2_d2",
        name: "IPA Selection",
        description: "Rotating selection of hoppy IPAs",
        price: 6,
        category: "Beer",
        available: true,
        popular: true,
      },
      {
        id: "b2_d3",
        name: "Stout & Porter",
        description: "Dark, rich beers for the connoisseur",
        price: 7,
        category: "Beer",
        available: true,
      },
      {
        id: "b2_d4",
        name: "Wheat Beer",
        description: "Light and refreshing wheat beers",
        price: 5,
        category: "Beer",
        available: true,
      },
      {
        id: "b2_d5",
        name: "Barley Wine",
        description: "Strong, complex ale aged to perfection",
        price: 12,
        category: "Beer",
        available: true,
      },
      {
        id: "b2_d6",
        name: "Buffalo Wings",
        description: "Spicy wings with blue cheese dip",
        price: 14,
        category: "Food",
        available: true,
        popular: true,
      },
      {
        id: "b2_d7",
        name: "Loaded Nachos",
        description: "Tortilla chips with cheese, jalapeños, and sour cream",
        price: 12,
        category: "Food",
        available: true,
      },
      {
        id: "b2_d8",
        name: "Beer Battered Fish",
        description: "Fresh fish in our signature beer batter",
        price: 16,
        category: "Food",
        available: true,
      },
      {
        id: "b2_d9",
        name: "Soft Pretzels",
        description: "Warm pretzels with beer cheese sauce",
        price: 8,
        category: "Food",
        available: true,
      },
    ],
    amenities: ["Sports TV", "Outdoor Seating", "WiFi", "Games"],
    averageWaitTime: "2-5 min",
    priceRange: "$$",
    type: "bar",
  },
  {
    id: "b3",
    name: "Wine & Dine",
    cuisine: "Wine Bar",
    rating: 4.6,
    city: "Kigali",
    address: "Kimisagara, KG 3 Ave, Kigali, Rwanda",
    phone: "+250 788 456 789",
    email: "info@winedine.rw",
    website: "https://winedine.rw",
    openNow: false,
    opensAt: "17:00",
    closesAt: "23:00",
    tags: ["Wine", "Fine Dining", "Romantic", "Upscale"],
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
    description:
      "Sophisticated wine bar with curated selection and gourmet bites",
    capacity: 40,
    acceptsReservations: true,
    paymentMethods: ["Cash", "Card", "Mobile Money"],
    menu: [
      {
        id: "b3_d1",
        name: "Wine Tasting Flight",
        description: "Curated selection of 5 premium wines",
        price: 35,
        category: "Wine",
        available: true,
        popular: true,
      },
      {
        id: "b3_d2",
        name: "Champagne by the Glass",
        description: "Premium champagne selection",
        price: 18,
        category: "Wine",
        available: true,
        popular: true,
      },
      {
        id: "b3_d3",
        name: "Red Wine Selection",
        description: "Cabernet, Merlot, Pinot Noir, and more",
        price: 12,
        category: "Wine",
        available: true,
      },
      {
        id: "b3_d4",
        name: "White Wine Selection",
        description: "Chardonnay, Sauvignon Blanc, Riesling",
        price: 10,
        category: "Wine",
        available: true,
      },
      {
        id: "b3_d5",
        name: "Rosé Collection",
        description: "Elegant rosé wines from around the world",
        price: 11,
        category: "Wine",
        available: true,
      },
      {
        id: "b3_d6",
        name: "Dessert Wines",
        description: "Port, Sauternes, and late harvest wines",
        price: 15,
        category: "Wine",
        available: true,
      },
      {
        id: "b3_d7",
        name: "Artisan Cheese Board",
        description: "Selection of fine cheeses with accompaniments",
        price: 24,
        category: "Food",
        available: true,
        popular: true,
      },
      {
        id: "b3_d8",
        name: "Charcuterie Platter",
        description: "Cured meats, pâtés, and artisanal selections",
        price: 22,
        category: "Food",
        available: true,
      },
      {
        id: "b3_d9",
        name: "Truffle Crostini",
        description: "Crispy bread with truffle oil and parmesan",
        price: 16,
        category: "Food",
        available: true,
      },
      {
        id: "b3_d10",
        name: "Oysters on the Half Shell",
        description: "Fresh oysters with mignonette sauce",
        price: 28,
        category: "Food",
        available: true,
      },
      {
        id: "b3_d11",
        name: "Chocolate Truffles",
        description: "Handmade dark chocolate truffles",
        price: 12,
        category: "Dessert",
        available: true,
      },
    ],
    amenities: ["Wine Cellar", "Private Dining", "Valet Parking", "WiFi"],
    averageWaitTime: "10-15 min",
    priceRange: "$$$$",
    type: "bar",
  },
];

// Function to get any business by ID (business or bar)
function getBusinessById(id: string) {
  // First try businesss
  const business = getRestaurantById(id);
  if (business) {
    return { ...business, type: "business" };
  }

  // Then try bars
  const bar = bars.find((b) => b.id === id);
  if (bar) {
    return bar;
  }

  return null;
}

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
  const business = id ? getBusinessById(id) : undefined;
  const [showExplore, setShowExplore] = useState(true);
  const { addItem } = useCart();

  // State for various modals and interactions
  const [isFavorited, setIsFavorited] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showHoursModal, setShowHoursModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  // Redirect to businesses page if business not found
  if (!business) {
    return <Navigate to="/businesses" replace />;
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

  const handleViewReviews = () => {
    setShowReviewsModal(true);
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
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent to-accent-hover px-8 py-4 text-lg font-semibold text-text-inverted hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-hover to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      {business.type === "restaurant" ? (
                        <FaUtensils className="h-5 w-5" />
                      ) : (
                        <FaWineGlassAlt className="h-5 w-5" />
                      )}
                      {business.type === "restaurant"
                        ? "Order Online"
                        : "View Menu"}
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
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border-subtle/50">
                  <img
                    src={business.image}
                    alt={business.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="eager"
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
            <button
              onClick={handleViewReviews}
              className="bg-gradient-to-r from-brand to-brand-hover text-text-inverted px-8 py-3 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <FaStar className="w-4 h-4" />
              View All Reviews
              <FaChevronDown className="w-4 h-4" />
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
            className="sticky top-16 z-40 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-8 bg-surface-primary/95 backdrop-blur-xl border-b border-border-secondary/50 mb-12 shadow-sm"
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
          </div>

          {categories.map((category: string) => (
            <motion.div
              key={category}
              className="mb-16"
              variants={itemVariants}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1 h-8 bg-brand rounded-full"></div>
                <h3 className="text-2xl font-bold text-text-primary">
                  {category}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-border-subtle to-transparent"></div>
                <div className="text-sm text-text-muted bg-surface-secondary px-3 py-1 rounded-full">
                  {
                    business.menu.filter(
                      (item: any) => item.category === category
                    ).length
                  }{" "}
                  items
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {business.menu
                  .filter((item: any) => item.category === category)
                  .map((item: any) => (
                    <motion.div
                      key={item.id}
                      className="group relative bg-surface-primary rounded-2xl border border-border-subtle overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      {/* Image Section */}
                      <div className="relative h-48 bg-border-subtle/40 overflow-hidden">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            onError={(e) => {
                              // Fallback to a placeholder if image fails to load
                              e.currentTarget.src = `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&q=80`;
                            }}
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-border-subtle/40 to-border-subtle/20 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-16 h-16 mx-auto mb-2 bg-border-subtle rounded-full flex items-center justify-center">
                                {business.type === "restaurant" ? (
                                  <FaUtensils className="w-8 h-8 text-text-muted" />
                                ) : (
                                  <FaWineGlassAlt className="w-8 h-8 text-text-muted" />
                                )}
                              </div>
                              <p className="text-sm text-text-muted">
                                No Image
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Gradient overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {item.popular && (
                            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md">
                              ⭐ Popular
                            </span>
                          )}
                          {item.spicy && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md">
                              🌶️ Spicy
                            </span>
                          )}
                          {item.vegetarian && (
                            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md">
                              🌱 Vegetarian
                            </span>
                          )}
                        </div>

                        {/* Price badge */}
                        <div className="absolute top-3 right-3 bg-surface-primary/95 backdrop-blur-sm text-text-primary px-3 py-1 rounded-full shadow-md">
                          <span className="font-bold text-sm">
                            {item.price === 0
                              ? "Ask Price"
                              : `RWF ${item.price.toLocaleString()}`}
                          </span>
                        </div>

                        {/* Availability indicator */}
                        <div className="absolute bottom-3 right-3">
                          {item.available ? (
                            <div className="w-3 h-3 bg-success rounded-full shadow-md"></div>
                          ) : (
                            <div className="w-3 h-3 bg-error rounded-full shadow-md"></div>
                          )}
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-4">
                        <div className="mb-3">
                          <h4 className="font-bold text-text-primary text-lg mb-2 group-hover:text-brand transition-colors duration-300 line-clamp-1">
                            {item.name}
                          </h4>
                          <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        {/* Category tag */}
                        <div className="mb-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-brand/10 text-brand">
                            {item.category}
                          </span>
                        </div>

                        {/* Action Button */}
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
                            className="w-full bg-brand hover:bg-brand-hover text-text-inverted py-2 px-4 rounded-lg font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2"
                          >
                            <FaUtensils className="w-4 h-4" />
                            Add to Cart
                          </button>
                        ) : (
                          <button
                            disabled
                            className="w-full bg-border-subtle text-text-muted py-2 px-4 rounded-lg font-semibold text-sm cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            <span className="w-4 h-4">❌</span>
                            Out of Stock
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
              className="bg-surface-primary rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-border-subtle/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-success/10 rounded-full">
                    <FaUsers className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary">
                      Availability
                    </h3>
                    <p className="text-text-secondary text-sm">
                      Current seating availability
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAvailabilityModal(false)}
                  className="p-3 text-text-muted hover:text-text-primary hover:bg-surface-secondary rounded-full transition-all duration-200"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="text-center p-8 bg-gradient-to-br from-success/5 to-success/10 rounded-2xl border border-success/20">
                  <div className="text-6xl font-bold text-success mb-4">
                    {business.capacity}
                  </div>
                  <div className="text-text-secondary text-lg font-medium">
                    Seats Available
                  </div>
                  <div className="text-text-muted text-sm mt-2">
                    Out of {business.capacity} total seats
                  </div>
                </div>

                <div className="p-6 bg-success/10 rounded-2xl border border-success/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-success/20 rounded-full">
                      <FaCheck className="w-5 h-5 text-success" />
                    </div>
                    <span className="font-bold text-lg text-success">
                      Excellent Availability
                    </span>
                  </div>
                  <p className="text-text-secondary">
                    We have plenty of seating available for your visit. No need
                    to worry about finding a table!
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-surface-secondary rounded-xl text-center">
                    <div className="text-2xl font-bold text-text-primary mb-1">
                      2-5 min
                    </div>
                    <div className="text-text-secondary text-sm">
                      Average Wait
                    </div>
                  </div>
                  <div className="p-4 bg-surface-secondary rounded-xl text-center">
                    <div className="text-2xl font-bold text-text-primary mb-1">
                      95%
                    </div>
                    <div className="text-text-secondary text-sm">
                      Availability
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <button
                    onClick={handleReservation}
                    className="bg-gradient-to-r from-brand to-brand-hover hover:from-brand-hover hover:to-brand text-text-inverted px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Make a Reservation
                  </button>
                </div>
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
              className="bg-surface-primary rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-border-subtle/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-info/10 rounded-full">
                    <FaCreditCard className="w-6 h-6 text-info" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary">
                      Payment Methods
                    </h3>
                    <p className="text-text-secondary text-sm">
                      Accepted payment options
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-3 text-text-muted hover:text-text-primary hover:bg-surface-secondary rounded-full transition-all duration-200"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {business.paymentMethods.map(
                  (method: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-surface-secondary rounded-xl hover:bg-surface-secondary/80 transition-all duration-200 border border-border-subtle/50"
                    >
                      <div className="p-2 bg-brand/10 rounded-lg">
                        <FaCreditCard className="w-5 h-5 text-brand" />
                      </div>
                      <span className="text-text-primary font-semibold flex-1">
                        {method}
                      </span>
                      <div className="p-1 bg-success/20 rounded-full">
                        <FaCheck className="w-4 h-4 text-success" />
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-info/5 to-info/10 rounded-2xl border border-info/20">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-info/20 rounded-full mt-1">
                    <FaCheck className="w-4 h-4 text-info" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2">
                      Payment Information
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      All major payment methods are accepted. We prefer
                      contactless payments for faster and safer transactions.
                      Split bills and group payments are also available.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-success/5 rounded-xl border border-success/20">
                <div className="flex items-center gap-2 text-success text-sm font-medium">
                  <FaCheck className="w-4 h-4" />
                  <span>Secure & Encrypted Payments</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Reviews Modal */}
        {showReviewsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowReviewsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-surface-primary rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-border-subtle/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <FaStar className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary">
                      Customer Reviews
                    </h3>
                    <p className="text-text-secondary text-sm">
                      What our customers are saying
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowReviewsModal(false)}
                  className="p-3 text-text-muted hover:text-text-primary hover:bg-surface-secondary rounded-full transition-all duration-200"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* Overall Rating Summary */}
              <div className="mb-8 p-6 bg-gradient-to-r from-accent/5 to-accent/10 rounded-2xl border border-accent/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-accent">
                      {business.rating.toFixed(1)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(business.rating)
                                ? "text-accent"
                                : "text-border-subtle"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-text-secondary text-sm">
                        Based on 127 reviews
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-text-primary">
                      {business.rating >= 4.5
                        ? "Excellent"
                        : business.rating >= 4
                        ? "Very Good"
                        : "Good"}
                    </div>
                    <p className="text-text-secondary text-sm">
                      Overall Rating
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Mock reviews */}
                {[
                  {
                    name: "Sarah M.",
                    rating: 5,
                    comment:
                      "Amazing food and great service! The staff was incredibly friendly and the atmosphere was perfect for our anniversary dinner. Highly recommend the signature cocktails!",
                    date: "2 days ago",
                    verified: true,
                  },
                  {
                    name: "John D.",
                    rating: 4,
                    comment:
                      "Good atmosphere and friendly staff. Food was delicious and came out quickly. The only minor issue was the music was a bit loud, but overall a great experience.",
                    date: "1 week ago",
                    verified: true,
                  },
                  {
                    name: "Maria L.",
                    rating: 5,
                    comment:
                      "Perfect for a romantic dinner. The wine selection was excellent and the chef's special was outstanding. Will definitely come back for special occasions!",
                    date: "2 weeks ago",
                    verified: false,
                  },
                  {
                    name: "David K.",
                    rating: 4,
                    comment:
                      "Great selection and reasonable prices. Very satisfied with the quality of food and service. The outdoor seating area is beautiful during sunset.",
                    date: "3 weeks ago",
                    verified: true,
                  },
                  {
                    name: "Emma R.",
                    rating: 5,
                    comment:
                      "Outstanding experience from start to finish! The reservation process was smooth, the food was exceptional, and the staff went above and beyond. Can't wait to return!",
                    date: "1 month ago",
                    verified: true,
                  },
                ].map((review, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-surface-secondary rounded-2xl hover:bg-surface-secondary/80 transition-all duration-200 border border-border-subtle/50"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-brand/20 to-accent/20 rounded-full flex items-center justify-center">
                          <span className="text-text-primary font-bold text-sm">
                            {review.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-text-primary">
                              {review.name}
                            </span>
                            {review.verified && (
                              <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                                Verified
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-accent"
                                    : "text-border-subtle"
                                }`}
                              />
                            ))}
                            <span className="text-text-muted text-sm ml-2">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-text-secondary leading-relaxed">
                      {review.comment}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowReviewsModal(false)}
                  className="bg-gradient-to-r from-brand to-brand-hover hover:from-brand-hover hover:to-brand text-text-inverted px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Close Reviews
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

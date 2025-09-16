import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaClock,
  FaMapMarkerAlt,
  FaStar,
  FaUtensils,
  FaWineGlassAlt,
} from "react-icons/fa";

type Business = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  city: string;
  address: string;
  openNow: boolean;
  tags: string[];
  image: string;
  type: "restaurant" | "bar";
  averageWaitTime?: string;
  priceRange?: string;
  opensAt?: string;
  closesAt?: string;
  acceptsReservations?: boolean;
};

function Rating({ value }: { value: number }) {
  const fullStars = Math.floor(value);
  const hasHalf = value - fullStars >= 0.5;
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < fullStars || (i === fullStars && hasHalf);
    return (
      <FaStar
        key={i}
        className={filled ? "text-warning" : "text-border-subtle"}
      />
    );
  });
  return <div className="flex items-center gap-1">{stars}</div>;
}

export default function RestaurantCard({ business }: { business: Business }) {
  return (
    <motion.article
      className="rounded-2xl overflow-hidden ring-1 ring-border-secondary shadow-md hover:shadow-lg transition-shadow bg-dashboard"
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <div className="aspect-[4/3] bg-border-subtle/40 relative">
        <img
          src={business.image}
          alt={business.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
        <div className="absolute top-3 left-3">
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              business.type === "restaurant"
                ? "bg-orange-100 text-orange-800"
                : "bg-purple-100 text-purple-800"
            }`}
          >
            {business.type === "restaurant" ? (
              <FaUtensils className="w-3 h-3" />
            ) : (
              <FaWineGlassAlt className="w-3 h-3" />
            )}
            <span className="capitalize">{business.type}</span>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <div className="inline-flex items-center justify-center rounded-full bg-black/70 backdrop-blur px-2 py-1 text-xs font-semibold text-text-inverted">
            <FaStar className="text-warning mr-1" />{" "}
            {business.rating.toFixed(1)}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary truncate">
              {business.name}
            </h3>
            <p className="text-sm text-text-secondary truncate">
              {business.cuisine}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Rating value={business.rating} />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-4 text-xs text-text-secondary">
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="h-3 w-3 text-brand" />
            <span className="truncate">{business.city}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaClock className="h-3 w-3 text-brand" />
            <span className={business.openNow ? "text-success" : "text-error"}>
              {business.openNow ? "Open" : "Closed"}
            </span>
            {business.opensAt && business.closesAt && (
              <span className="text-text-muted">
                · {business.opensAt}-{business.closesAt}
              </span>
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {business.priceRange && (
            <span className="inline-flex items-center rounded-full bg-border-secondary/30 px-2 py-0.5 text-xs text-text-secondary">
              {business.priceRange}
            </span>
          )}
          {business.averageWaitTime && (
            <span className="inline-flex items-center rounded-full bg-border-secondary/30 px-2 py-0.5 text-xs text-text-secondary">
              Wait: {business.averageWaitTime}
            </span>
          )}
          {business.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-brand/10 px-2 py-0.5 text-xs text-brand ring-1 ring-brand/20"
            >
              {tag}
            </span>
          ))}
          {business.tags.length > 2 && (
            <span className="inline-flex items-center rounded-full bg-border-secondary/30 px-2 py-0.5 text-xs text-text-muted">
              +{business.tags.length - 2}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Link
            to={`/businesses/${business.id}`}
            className="rounded-md px-3 py-2 text-xs font-semibold text-brand ring-1 ring-inset ring-brand/30 hover:bg-brand/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/20"
          >
            View menu
          </Link>
          {business.acceptsReservations && (
            <button className="rounded-md bg-accent px-3 py-2 text-xs font-semibold text-text-inverted hover:bg-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30">
              Reserve
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

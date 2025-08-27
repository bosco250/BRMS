import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { FaStar, FaMapMarkerAlt, FaClock, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAllRestaurants } from "../data/restaurants";

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

export default function Resto() {
  const restaurants = getAllRestaurants();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [addressFilter, setAddressFilter] = useState("");

  const uniqueCities = useMemo(() => {
    const cities = new Set(restaurants.map((r) => r.city));
    return ["", ...Array.from(cities).sort()];
  }, [restaurants]);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      const q = searchTerm.toLowerCase();
      const hay = `${r.name} ${r.cuisine} ${r.tags.join(" ")}`.toLowerCase();
      const matchesQuery = q.length === 0 ? true : hay.includes(q);
      const matchesCity = selectedCity ? r.city === selectedCity : true;
      const matchesAddress =
        addressFilter.length === 0
          ? true
          : r.address.toLowerCase().includes(addressFilter);
      return matchesCity && matchesQuery && matchesAddress;
    });
  }, [searchTerm, selectedCity, addressFilter, restaurants]);

  return (
    <section className="py-16 sm:py-20 bg-surface-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">
              Restaurants
            </h1>
            <p className="mt-2 text-text-secondary">
              Registered businesses (sample data)
            </p>
          </div>
          <div className="text-sm text-text-secondary">
            Showing {filteredRestaurants.length} of {restaurants.length}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="col-span-full sm:col-span-1 md:col-span-2 lg:col-span-2">
            <label htmlFor="search" className="sr-only">
              Search restaurants
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSearch className="h-4 w-4 text-text-muted" />
              </div>
              <input
                type="text"
                id="search"
                className="block w-full rounded-md py-2 pl-10 pr-3 text-text-primary placeholder:text-text-muted ring-1 ring-border-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 sm:text-sm bg-dashboard"
                placeholder="Search by name, cuisine, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="city-filter" className="sr-only">
              Filter by City
            </label>
            <select
              id="city-filter"
              className="block w-full rounded-md py-2 pl-3 pr-10 text-text-primary ring-1 ring-border-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 sm:text-sm bg-dashboard"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {uniqueCities.map((city) => (
                <option key={city} value={city}>
                  {city === "" ? "All Cities" : city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="address-filter" className="sr-only">
              Filter by Address
            </label>
            <input
              type="text"
              id="address-filter"
              className="block w-full rounded-md py-2 pl-3 pr-3 text-text-primary placeholder:text-text-muted ring-1 ring-border-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 sm:text-sm bg-dashboard"
              placeholder="Filter by address..."
              value={addressFilter}
              onChange={(e) => setAddressFilter(e.target.value)}
            />
          </div>

          {(searchTerm || selectedCity || addressFilter) && (
            <div className="col-span-full sm:col-span-1 md:col-span-1 lg:col-span-1 flex justify-end">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCity("");
                  setAddressFilter("");
                }}
                className="rounded-md bg-error px-4 py-2 text-sm font-semibold text-text-inverted hover:bg-error-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-error/30"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((r) => (
              <motion.article
                key={r.id}
                className="rounded-2xl overflow-hidden ring-1 ring-border-secondary shadow-md hover:shadow-lg transition-shadow bg-dashboard"
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <div className="aspect-[4/3] bg-border-subtle/40">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text-primary truncate">
                        {r.name}
                      </h3>
                      <p className="text-sm text-text-secondary truncate">
                        {r.cuisine}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Rating value={r.rating} />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-4 text-xs text-text-secondary">
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="h-3 w-3 text-brand" />
                      <span className="truncate">{r.city}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock className="h-3 w-3 text-brand" />
                      <span
                        className={r.openNow ? "text-success" : "text-error"}
                      >
                        {r.openNow ? "Open" : "Closed"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {r.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-brand/10 px-2 py-0.5 text-xs text-brand ring-1 ring-brand/20"
                      >
                        {tag}
                      </span>
                    ))}
                    {r.tags.length > 2 && (
                      <span className="inline-flex items-center rounded-full bg-border-secondary/30 px-2 py-0.5 text-xs text-text-muted">
                        +{r.tags.length - 2}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      to={`/resto/${r.id}`}
                      className="rounded-md px-3 py-2 text-xs font-semibold text-brand ring-1 ring-inset ring-brand/30 hover:bg-brand/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/20"
                    >
                      View details
                    </Link>
                    <button className="rounded-md bg-accent px-3 py-2 text-xs font-semibold text-text-inverted hover:bg-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30">
                      Reserve
                    </button>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <p className="col-span-full text-center text-text-secondary">
              No restaurants found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

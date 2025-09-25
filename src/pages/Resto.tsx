import { useEffect, useMemo, useState } from "react";
import { FaSearch, FaExclamationTriangle, FaRedo } from "react-icons/fa";
import { fetchAllBusinesses } from "./businessApiServise";
import type { ApiBusiness } from "./businessApiServise";
import RestaurantCard from "../components/RestaurantCard";
import BusinessCardSkeleton from "../components/BusinessCardSkeleton";
// Rating UI moved into RestaurantCard

export default function Resto() {
  const [apiBusinesses, setApiBusinesses] = useState<ApiBusiness[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchBusinesses = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAllBusinesses();
      setApiBusinesses(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(
        "Failed to load businesses. Please check your connection and try again."
      );
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const mappedApiBusinesses = useMemo(() => {
    return apiBusinesses.map((b) => ({
      id: b.id,
      name: b.name,
      cuisine: b.cuisine ?? "Various Cuisine",
      rating: b.rating ?? 4.0,
      city: b.city ?? "Kigali",
      address: b.address ?? "Address not available",
      phone: b.phone ?? "+250 000 000 000",
      email: b.email ?? "info@restaurant.rw",
      website: b.website,
      openNow: true,
      opensAt: "08:00",
      closesAt: "22:00",
      tags: b.tags?.length > 0 ? b.tags : ["Dine-in", "Takeaway"],
      image:
        b.image ||
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
      description:
        b.description || "A great place to enjoy delicious food and drinks.",
      capacity: b.capacity ?? 50,
      acceptsReservations: Boolean(b.acceptsReservations),
      paymentMethods:
        b.paymentMethods && b.paymentMethods.length > 0
          ? b.paymentMethods
          : ["Cash", "Card"],
      amenities:
        b.amenities && b.amenities.length > 0
          ? b.amenities
          : ["WiFi", "Parking"],
      menu: (b.menu ?? []).map((m) => ({
        id: m.id,
        name: m.name,
        description: m.description,
        price: m.price,
        category: m.category || "Main Course",
        available: m.available,
      })),
      averageWaitTime: "15-20 min",
      priceRange: "$$",
      type: "restaurant" as const,
    }));
  }, [apiBusinesses]);

  const allBusinesses = mappedApiBusinesses;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [addressFilter, setAddressFilter] = useState("");
  const [businessType, setBusinessType] = useState<
    "all" | "restaurant" | "bar"
  >("all");
  const [sortBy, setSortBy] = useState<
    "recommended" | "rating" | "wait" | "name"
  >("recommended");

  const uniqueCities = useMemo(() => {
    const cities = new Set(allBusinesses.map((b) => b.city));
    return ["", ...Array.from(cities).sort()];
  }, [allBusinesses]);

  const filteredBusinesses = useMemo(() => {
    const base = allBusinesses.filter((business) => {
      const q = searchTerm.toLowerCase();
      const hay = `${business.name} ${business.cuisine} ${business.tags.join(
        " "
      )}`.toLowerCase();
      const matchesQuery = q.length === 0 ? true : hay.includes(q);
      const matchesCity = selectedCity ? business.city === selectedCity : true;
      const matchesAddress =
        addressFilter.length === 0
          ? true
          : business.address.toLowerCase().includes(addressFilter);
      const matchesType =
        businessType === "all" ? true : business.type === businessType;
      return matchesCity && matchesQuery && matchesAddress && matchesType;
    });
    const enriched = base.map((b) => ({
      ...b,
      // Normalize wait time for sorting (extract first number)
      _waitSort:
        typeof (b as any).averageWaitTime === "string"
          ? parseInt((b as any).averageWaitTime)
          : 999,
    }));
    switch (sortBy) {
      case "rating":
        return enriched.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "wait":
        return enriched.sort(
          (a, b) => (a._waitSort || 999) - (b._waitSort || 999)
        );
      case "name":
        return enriched.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return enriched;
    }
  }, [searchTerm, selectedCity, addressFilter, businessType, allBusinesses]);

  return (
    <section className="py-16 sm:py-20 bg-surface-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">
              Restaurants & Bars
            </h1>
            <p className="mt-2 text-text-secondary">
              Discover great places to eat and drink
            </p>
          </div>
          <div className="text-sm text-text-secondary">
            Showing {filteredBusinesses.length} of {allBusinesses.length}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="col-span-full sm:col-span-1 md:col-span-2 lg:col-span-2">
            <label htmlFor="search" className="sr-only">
              Search businesses
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSearch className="h-4 w-4 text-text-muted" />
              </div>
              <input
                type="text"
                id="search"
                className="block w-full rounded-md py-2 pl-10 pr-3 text-text-primary placeholder:text-text-muted ring-1 ring-border-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 sm:text-sm bg-dashboard"
                placeholder="Search restaurants and bars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="sort-by" className="sr-only">
              Sort by
            </label>
            <select
              id="sort-by"
              className="block w-full rounded-md py-2 pl-3 pr-10 text-text-primary ring-1 ring-border-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 sm:text-sm bg-dashboard"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Top rated</option>
              <option value="wait">Shortest wait</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>

          <div>
            <label htmlFor="business-type-filter" className="sr-only">
              Filter by Type
            </label>
            <select
              id="business-type-filter"
              className="block w-full rounded-md py-2 pl-3 pr-10 text-text-primary ring-1 ring-border-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 sm:text-sm bg-dashboard"
              value={businessType}
              onChange={(e) =>
                setBusinessType(e.target.value as "all" | "restaurant" | "bar")
              }
            >
              <option value="all">All Types</option>
              <option value="restaurant">Restaurants</option>
              <option value="bar">Bars</option>
            </select>
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

          {(searchTerm ||
            selectedCity ||
            addressFilter ||
            businessType !== "all") && (
            <div className="col-span-full sm:col-span-1 md:col-span-1 lg:col-span-1 flex justify-end">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCity("");
                  setAddressFilter("");
                  setBusinessType("all");
                  setSortBy("recommended");
                }}
                className="rounded-md bg-error px-4 py-2 text-sm font-semibold text-text-inverted hover:bg-error-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-error/30"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading && (
            <>
              {Array.from({ length: 8 }).map((_, i) => (
                <BusinessCardSkeleton key={i} />
              ))}
            </>
          )}

          {!loading && error && (
            <div className="col-span-full text-center py-12">
              <div className="mx-auto w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mb-4">
                <FaExclamationTriangle className="w-8 h-8 text-error" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Unable to load businesses
              </h3>
              <p className="text-text-secondary mb-4">{error}</p>
              <button
                onClick={fetchBusinesses}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-text-inverted rounded-md hover:bg-brand-dark transition-colors"
              >
                <FaRedo className="w-4 h-4" />
                Try Again
              </button>
            </div>
          )}

          {!loading &&
            !error &&
            filteredBusinesses.length > 0 &&
            filteredBusinesses.map((business) => (
              <RestaurantCard
                key={business.id}
                business={{
                  id: business.id,
                  name: business.name,
                  cuisine: business.cuisine,
                  rating: business.rating,
                  city: business.city,
                  address: business.address,
                  openNow: business.openNow,
                  tags: business.tags,
                  image: business.image,
                  type: business.type as "restaurant" | "bar",
                }}
              />
            ))}

          {!loading && !error && filteredBusinesses.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="mx-auto w-16 h-16 bg-border-subtle/20 rounded-full flex items-center justify-center mb-4">
                <FaSearch className="w-8 h-8 text-text-muted" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                No businesses found
              </h3>
              <p className="text-text-secondary mb-4">
                Try adjusting your search criteria or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCity("");
                  setAddressFilter("");
                  setBusinessType("all");
                  setSortBy("recommended");
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-text-inverted rounded-md hover:bg-brand-dark transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

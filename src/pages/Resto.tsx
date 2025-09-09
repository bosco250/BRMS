import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaSearch,
  FaUtensils,
  FaWineGlassAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAllRestaurants } from "../data/restaurants";

// Mock bar data
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
  const allBusinesses = [
    ...restaurants.map((r) => ({ ...r, type: "restaurant" })),
    ...bars,
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [addressFilter, setAddressFilter] = useState("");
  const [businessType, setBusinessType] = useState<
    "all" | "restaurant" | "bar"
  >("all");

  const uniqueCities = useMemo(() => {
    const cities = new Set(allBusinesses.map((b) => b.city));
    return ["", ...Array.from(cities).sort()];
  }, [allBusinesses]);

  const filteredBusinesses = useMemo(() => {
    return allBusinesses.filter((business) => {
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
                }}
                className="rounded-md bg-error px-4 py-2 text-sm font-semibold text-text-inverted hover:bg-error-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-error/30"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBusinesses.length > 0 ? (
            filteredBusinesses.map((business) => (
              <motion.article
                key={business.id}
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
                      <span
                        className={
                          business.openNow ? "text-success" : "text-error"
                        }
                      >
                        {business.openNow ? "Open" : "Closed"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
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
              No businesses found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

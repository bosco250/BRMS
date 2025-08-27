import {
  Search,
  Heart,
  Star,
  Utensils,
  Coffee,
  Wine,
  Cake,
} from "lucide-react";
import { useCustomerDashboard } from "./context";

export default function BrowseMenu() {
  const {
    products,
    addToCart,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useCustomerDashboard();

  const categories = [
    { id: "all", label: "All Items", icon: Utensils },
    { id: "food", label: "Food", icon: Utensils },
    { id: "beverages", label: "Beverages", icon: Coffee },
    { id: "alcohol", label: "Alcohol", icon: Wine },
    { id: "desserts", label: "Desserts", icon: Cake },
  ];

  const filtered = products.filter((p) => {
    const matchCat =
      selectedCategory === "all" || p.category === (selectedCategory as any);
    const matchSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-lg border border-border-primary bg-dashboard">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-3 text-text-secondary" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary"
            />
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? "bg-brand text-white"
                    : "bg-surface-secondary text-text-primary hover:bg-surface-card"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-surface-secondary rounded-lg border border-border-secondary p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-text-primary">
                  {product.name}
                </h4>
                <button
                  className={`p-1 rounded ${
                    product.favorite
                      ? "text-error"
                      : "text-text-muted hover:text-error"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      product.favorite ? "fill-current" : ""
                    }`}
                  />
                </button>
              </div>
              <p className="text-sm text-text-secondary mb-2">
                {product.description}
              </p>
              <div className="flex items-center gap-1 mb-3">
                <Star className="w-4 h-4 text-warning fill-current" />
                <span className="text-sm text-text-secondary">
                  {product.rating}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-text-primary text-lg">
                  ${product.price}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand/90 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

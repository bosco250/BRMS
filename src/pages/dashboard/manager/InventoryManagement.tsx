import { useState } from "react";
import { useManagerDashboard } from "./context";
import {
  Search,
  Filter,
  Database,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Edit,
  Eye,
  Plus,
  Package,
  Clock,
  DollarSign,
} from "lucide-react";

export default function InventoryManagement() {
  const { inventory } = useManagerDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  // Filter inventory
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    
    let matchesStock = true;
    if (stockFilter === "low") {
      matchesStock = item.currentStock <= item.minStock;
    } else if (stockFilter === "out") {
      matchesStock = item.currentStock === 0;
    } else if (stockFilter === "normal") {
      matchesStock = item.currentStock > item.minStock;
    }
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ingredients": return "bg-blue-100 text-blue-800";
      case "supplies": return "bg-green-100 text-green-800";
      case "equipment": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStockStatus = (current: number, min: number) => {
    if (current === 0) return { status: "Out of Stock", color: "bg-red-100 text-red-800" };
    if (current <= min) return { status: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    return { status: "In Stock", color: "bg-green-100 text-green-800" };
  };

  const getDaysUntilExpiry = (expiryDate?: string) => {
    if (!expiryDate) return null;
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryColor = (days: number) => {
    if (days <= 0) return "text-red-600";
    if (days <= 3) return "text-orange-600";
    if (days <= 7) return "text-yellow-600";
    return "text-green-600";
  };

  // Calculate totals
  const totalItems = inventory.length;
  const lowStockItems = inventory.filter(item => item.currentStock <= item.minStock).length;
  const outOfStockItems = inventory.filter(item => item.currentStock === 0).length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.cost), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Inventory Management</h1>
          <p className="text-text-secondary">Monitor stock levels and manage inventory</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors">
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Items</p>
              <p className="text-2xl font-bold text-text-primary">{totalItems}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Low Stock</p>
              <p className="text-2xl font-bold text-text-primary">{lowStockItems}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Out of Stock</p>
              <p className="text-2xl font-bold text-text-primary">{outOfStockItems}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Value</p>
              <p className="text-2xl font-bold text-text-primary">${totalValue.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search inventory by name or supplier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border-secondary rounded-lg focus:border-brand focus:outline-none"
              />
            </div>
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-border-secondary rounded-lg focus:border-brand focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="ingredients">Ingredients</option>
            <option value="supplies">Supplies</option>
            <option value="equipment">Equipment</option>
          </select>

          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="px-3 py-2 border border-border-secondary rounded-lg focus:border-brand focus:outline-none"
          >
            <option value="all">All Stock Levels</option>
            <option value="normal">Normal Stock</option>
            <option value="low">Low Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-dashboard rounded-lg border border-border-primary overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-secondary border-b border-border-secondary">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Item
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Last Restocked
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-secondary">
              {filteredInventory.map((item) => {
                const stockStatus = getStockStatus(item.currentStock, item.minStock);
                const expiryDays = getDaysUntilExpiry(item.expiryDate);
                
                return (
                  <tr key={item.id} className="hover:bg-surface-secondary transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-text-primary">{item.name}</p>
                        <p className="text-sm text-text-secondary">
                          {item.currentStock} {item.unit} available
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                          {stockStatus.status}
                        </span>
                        <div className="text-xs text-text-secondary">
                          Min: {item.minStock} {item.unit}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-text-primary">${item.cost.toFixed(2)}</p>
                        <p className="text-xs text-text-secondary">
                          Total: ${(item.currentStock * item.cost).toFixed(2)}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-text-primary">{item.supplier}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <p className="text-sm text-text-primary">
                          {new Date(item.lastRestocked).toLocaleDateString()}
                        </p>
                        {item.expiryDate && (
                          <p className={`text-xs ${getExpiryColor(expiryDays!)}`}>
                            {expiryDays! <= 0 
                              ? "Expired" 
                              : expiryDays! <= 3 
                                ? `${expiryDays} days left` 
                                : `Expires: ${new Date(item.expiryDate).toLocaleDateString()}`
                            }
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-text-muted hover:text-text-primary hover:bg-surface-secondary rounded transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-text-muted hover:text-text-primary hover:bg-surface-secondary rounded transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-text-muted hover:text-text-primary hover:bg-surface-secondary rounded transition-colors">
                          <Package className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredInventory.length === 0 && (
          <div className="text-center py-12">
            <Database className="w-16 h-16 mx-auto mb-4 text-text-muted opacity-50" />
            <p className="text-lg font-medium text-text-primary">No inventory items found</p>
            <p className="text-text-secondary">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

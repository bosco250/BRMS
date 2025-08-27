export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  image?: string;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
};

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  city: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  openNow: boolean;
  opensAt: string;
  closesAt: string;
  tags: string[];
  image: string;
  description: string;
  capacity: number;
  acceptsReservations: boolean;
  paymentMethods: string[];
  menu: MenuItem[];
  amenities: string[];
  averageWaitTime: string;
  priceRange: string;
};

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Urban Kitchen",
    cuisine: "Modern Grill",
    rating: 4.7,
    city: "Kigali",
    address: "Kimihurura, KG 7 Ave, Kigali, Rwanda",
    phone: "+250 788 123 456",
    email: "info@urbankitchen.rw",
    website: "https://urbankitchen.rw",
    openNow: true,
    opensAt: "07:00",
    closesAt: "22:00",
    tags: ["Dine-in", "Delivery", "Reservations", "Wine", "Cocktails"],
    image: "https://picsum.photos/seed/resto1/1200/600",
    description:
      "Urban Kitchen offers a modern take on traditional grilling with locally sourced ingredients. Our open kitchen concept allows guests to watch our chefs at work while enjoying craft cocktails and an extensive wine list.",
    capacity: 120,
    acceptsReservations: true,
    paymentMethods: ["Cash", "Mobile Money", "Credit Card", "Bank Transfer"],
    amenities: [
      "Free WiFi",
      "Parking",
      "Wheelchair Accessible",
      "Outdoor Seating",
    ],
    averageWaitTime: "15-20 minutes",
    priceRange: "RWF 5,000 - 15,000",
    menu: [
      {
        id: "m1",
        name: "Grilled Beef Tenderloin",
        description:
          "Premium cut served with roasted vegetables and red wine reduction",
        price: 8500,
        category: "Main Course",
        available: true,
        image: "https://picsum.photos/seed/dish1/400/300",
        popular: true,
      },
      {
        id: "m2",
        name: "Seafood Paella",
        description: "Fresh seafood with saffron rice and seasonal vegetables",
        price: 12000,
        category: "Main Course",
        available: true,
        image: "https://picsum.photos/seed/dish2/400/300",
        popular: true,
      },
      {
        id: "m3",
        name: "Truffle Pasta",
        description: "Homemade pasta with truffle cream sauce and parmesan",
        price: 6500,
        category: "Main Course",
        available: false,
        image: "https://picsum.photos/seed/dish3/400/300",
        vegetarian: true,
      },
      {
        id: "m4",
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with vanilla ice cream",
        price: 2500,
        category: "Dessert",
        available: true,
        image: "https://picsum.photos/seed/dish4/400/300",
      },
      {
        id: "m5",
        name: "Craft Beer Selection",
        description: "Local and imported craft beers",
        price: 1500,
        category: "Beverages",
        available: true,
      },
      {
        id: "m6",
        name: "House Wine",
        description: "Red and white wine by the glass",
        price: 3000,
        category: "Beverages",
        available: true,
      },
      {
        id: "m7",
        name: "Spicy Chicken Wings",
        description: "Crispy wings with signature hot sauce",
        price: 3500,
        category: "Appetizers",
        available: true,
        image: "https://picsum.photos/seed/dish5/400/300",
        spicy: true,
        popular: true,
      },
      {
        id: "m8",
        name: "Garden Salad",
        description: "Fresh mixed greens with house dressing",
        price: 2000,
        category: "Appetizers",
        available: true,
        image: "https://picsum.photos/seed/dish6/400/300",
        vegetarian: true,
      },
    ],
  },
  {
    id: "r2",
    name: "Spice Garden",
    cuisine: "Indian & Asian Fusion",
    rating: 4.5,
    city: "Kigali",
    address: "Nyarutarama, KG 9 St, Kigali, Rwanda",
    phone: "+250 788 234 567",
    email: "hello@spicegarden.rw",
    website: "https://spicegarden.rw",
    openNow: true,
    opensAt: "11:00",
    closesAt: "23:00",
    tags: ["Dine-in", "Takeaway", "Spicy", "Vegetarian", "Halal"],
    image: "https://picsum.photos/seed/resto2/1200/600",
    description:
      "Spice Garden brings the authentic flavors of India and Asia to Kigali. Our chefs use traditional spices and cooking techniques to create unforgettable dishes in a warm, welcoming atmosphere.",
    capacity: 80,
    acceptsReservations: true,
    paymentMethods: ["Cash", "Mobile Money", "Credit Card"],
    amenities: ["Free WiFi", "Parking", "Air Conditioning", "Private Dining"],
    averageWaitTime: "20-25 minutes",
    priceRange: "RWF 3,000 - 12,000",
    menu: [
      {
        id: "m9",
        name: "Butter Chicken",
        description: "Tender chicken in rich tomato and cream sauce",
        price: 7500,
        category: "Main Course",
        available: true,
        image: "https://picsum.photos/seed/dish7/400/300",
        popular: true,
      },
      {
        id: "m10",
        name: "Biryani Rice",
        description: "Fragrant basmati rice with aromatic spices",
        price: 4500,
        category: "Main Course",
        available: true,
        image: "https://picsum.photos/seed/dish8/400/300",
      },
      {
        id: "m11",
        name: "Paneer Tikka",
        description: "Grilled cottage cheese with Indian spices",
        price: 5500,
        category: "Main Course",
        available: true,
        image: "https://picsum.photos/seed/dish9/400/300",
        vegetarian: true,
        popular: true,
      },
      {
        id: "m12",
        name: "Mango Lassi",
        description: "Sweet yogurt drink with fresh mango",
        price: 1500,
        category: "Beverages",
        available: true,
      },
      {
        id: "m13",
        name: "Gulab Jamun",
        description: "Sweet milk dumplings in rose syrup",
        price: 1800,
        category: "Dessert",
        available: true,
        image: "https://picsum.photos/seed/dish10/400/300",
      },
    ],
  },
  {
    id: "r3",
    name: "Le Petit Bistro",
    cuisine: "French & European",
    rating: 4.8,
    city: "Kigali",
    address: "Kacyiru, KG 6 Ave, Kigali, Rwanda",
    phone: "+250 788 345 678",
    email: "contact@lepetitbistro.rw",
    website: "https://lepetitbistro.rw",
    openNow: false,
    opensAt: "12:00",
    closesAt: "21:00",
    tags: ["Fine Dining", "Wine", "Reservations", "Romantic", "Business"],
    image: "https://picsum.photos/seed/resto3/1200/600",
    description:
      "Le Petit Bistro offers an elegant French dining experience with classic European dishes and an extensive wine collection. Perfect for romantic dinners and business meetings.",
    capacity: 60,
    acceptsReservations: true,
    paymentMethods: ["Cash", "Credit Card", "Bank Transfer"],
    amenities: ["Free WiFi", "Valet Parking", "Wine Cellar", "Private Rooms"],
    averageWaitTime: "10-15 minutes",
    priceRange: "RWF 8,000 - 25,000",
    menu: [
      {
        id: "m14",
        name: "Coq au Vin",
        description: "Classic French braised chicken in red wine",
        price: 18000,
        category: "Main Course",
        available: true,
        image: "https://picsum.photos/seed/dish11/400/300",
        popular: true,
      },
      {
        id: "m15",
        name: "Beef Bourguignon",
        description: "Slow-cooked beef with red wine and vegetables",
        price: 22000,
        category: "Main Course",
        available: true,
        image: "https://picsum.photos/seed/dish12/400/300",
        popular: true,
      },
      {
        id: "m16",
        name: "French Onion Soup",
        description: "Traditional soup with melted cheese",
        price: 4500,
        category: "Appetizers",
        available: true,
        image: "https://picsum.photos/seed/dish13/400/300",
      },
      {
        id: "m17",
        name: "Crème Brûlée",
        description: "Classic French vanilla custard with caramelized sugar",
        price: 3500,
        category: "Dessert",
        available: true,
        image: "https://picsum.photos/seed/dish14/400/300",
      },
      {
        id: "m18",
        name: "French Wine Selection",
        description: "Premium French wines by the glass or bottle",
        price: 5000,
        category: "Beverages",
        available: true,
      },
    ],
  },
  {
    id: "r4",
    name: "Rwanda Coffee House",
    cuisine: "Coffee & Light Meals",
    rating: 4.3,
    city: "Kigali",
    address: "Remera, KG 11 St, Kigali, Rwanda",
    phone: "+250 788 456 789",
    email: "info@rwandacoffee.rw",
    website: "https://rwandacoffee.rw",
    openNow: true,
    opensAt: "06:00",
    closesAt: "20:00",
    tags: ["Coffee", "Breakfast", "WiFi", "Casual", "Local"],
    image: "https://picsum.photos/seed/resto4/1200/600",
    description:
      "Rwanda Coffee House serves the finest locally roasted coffee alongside fresh pastries and light meals. A perfect spot for coffee lovers and digital nomads.",
    capacity: 40,
    acceptsReservations: false,
    paymentMethods: ["Cash", "Mobile Money"],
    amenities: ["Free WiFi", "Power Outlets", "Quiet Space", "Outdoor Seating"],
    averageWaitTime: "5-10 minutes",
    priceRange: "RWF 1,000 - 5,000",
    menu: [
      {
        id: "m19",
        name: "Rwandan Coffee",
        description: "Freshly brewed local coffee",
        price: 800,
        category: "Beverages",
        available: true,
        popular: true,
      },
      {
        id: "m20",
        name: "Cappuccino",
        description: "Espresso with steamed milk and foam",
        price: 1200,
        category: "Beverages",
        available: true,
        popular: true,
      },
      {
        id: "m21",
        name: "Croissant",
        description: "Buttery French pastry",
        price: 1500,
        category: "Breakfast",
        available: true,
        image: "https://picsum.photos/seed/dish15/400/300",
      },
      {
        id: "m22",
        name: "Avocado Toast",
        description: "Sourdough bread with fresh avocado and herbs",
        price: 2500,
        category: "Breakfast",
        available: true,
        image: "https://picsum.photos/seed/dish16/400/300",
        vegetarian: true,
      },
      {
        id: "m23",
        name: "Chocolate Cake",
        description: "Rich chocolate cake with coffee",
        price: 1800,
        category: "Dessert",
        available: true,
        image: "https://picsum.photos/seed/dish17/400/300",
      },
    ],
  },
  {
    id: "r5",
    name: "Pizza Palace",
    cuisine: "Italian & Pizza",
    rating: 4.2,
    city: "Kigali",
    address: "Gisozi, KG 13 Ave, Kigali, Rwanda",
    phone: "+250 788 567 890",
    email: "orders@pizzapalace.rw",
    website: "https://pizzapalace.rw",
    openNow: true,
    opensAt: "10:00",
    closesAt: "23:00",
    tags: ["Pizza", "Delivery", "Family", "Casual", "Takeaway"],
    image: "https://picsum.photos/seed/resto5/1200/600",
    description:
      "Pizza Palace serves authentic Italian pizzas with fresh ingredients and traditional recipes. Perfect for family dinners and casual dining.",
    capacity: 100,
    acceptsReservations: true,
    paymentMethods: ["Cash", "Mobile Money", "Credit Card"],
    amenities: ["Free WiFi", "Parking", "Play Area", "Delivery"],
    averageWaitTime: "25-30 minutes",
    priceRange: "RWF 4,000 - 15,000",
    menu: [
      {
        id: "m24",
        name: "Margherita Pizza",
        description: "Classic tomato sauce with mozzarella and basil",
        price: 8000,
        category: "Pizza",
        available: true,
        image: "https://picsum.photos/seed/dish18/400/300",
        popular: true,
      },
      {
        id: "m25",
        name: "Pepperoni Pizza",
        description: "Spicy pepperoni with melted cheese",
        price: 12000,
        category: "Pizza",
        available: true,
        image: "https://picsum.photos/seed/dish19/400/300",
        popular: true,
        spicy: true,
      },
      {
        id: "m26",
        name: "Vegetarian Pizza",
        description: "Fresh vegetables with mozzarella",
        price: 10000,
        category: "Pizza",
        available: true,
        image: "https://picsum.photos/seed/dish20/400/300",
        vegetarian: true,
      },
      {
        id: "m27",
        name: "Garlic Bread",
        description: "Toasted bread with garlic butter",
        price: 2000,
        category: "Appetizers",
        available: true,
        image: "https://picsum.photos/seed/dish21/400/300",
      },
      {
        id: "m28",
        name: "Tiramisu",
        description: "Classic Italian coffee-flavored dessert",
        price: 3000,
        category: "Dessert",
        available: true,
        image: "https://picsum.photos/seed/dish22/400/300",
      },
    ],
  },
];

// Helper function to get restaurant by ID
export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find((restaurant) => restaurant.id === id);
};

// Helper function to get all restaurants
export const getAllRestaurants = (): Restaurant[] => {
  return restaurants;
};

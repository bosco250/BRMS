# Order and Checkout Management System

## Overview

This document describes the complete Order and Checkout Management feature implemented for the BRMS (Business Restaurant Management System). The system provides a comprehensive solution for customers to order food, manage their cart, and complete checkout, while giving admins and managers tools to manage and track all orders.

## Features

### 🛒 Cart Management

- **Add Items**: Customers can add menu items to their cart from restaurant profiles
- **Quantity Control**: Adjust quantities or remove items from cart
- **Real-time Updates**: Cart updates immediately when items are added/removed
- **Persistent State**: Cart state is maintained across page navigation

### 🚀 Checkout Process

The checkout process consists of 5 steps:

1. **Cart Review** - Review selected items and totals
2. **Delivery Details** - Enter shipping information and choose order type (delivery/takeaway)
3. **Billing Details** - Enter billing information with option to use shipping address
4. **Payment Method** - Choose from multiple payment options
5. **Order Review** - Final review before placing order

### 💳 Payment Methods

- Credit/Debit Card
- Mobile Money (MTN, Airtel)
- Cash on Delivery
- Bank Transfer

### 📱 Order Management

- **Admin Dashboard**: Full order management with status updates
- **Manager Dashboard**: Restaurant-specific order management
- **Customer Dashboard**: Order history and tracking
- **Real-time Status**: Track order progress from pending to delivered

## Technical Implementation

### Data Structures

#### CartItem

```typescript
interface CartItem {
  id: string;
  productId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  totalPrice: number;
  image?: string;
  category: string;
  modifiers: CartItemModifier[];
  specialInstructions?: string;
}
```

#### CheckoutOrder

```typescript
interface CheckoutOrder {
  id: string;
  customerId: string;
  restaurantId: string;
  orderNumber: string;
  items: CartItem[];
  shippingDetails: ShippingDetails;
  billingDetails: BillingDetails;
  paymentMethod: PaymentMethod;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  orderType: "delivery" | "takeaway";
  // ... additional fields
}
```

### Components

#### Core Components

- **CartContext**: Manages cart state across the application
- **CartIcon**: Displays cart item count in navbar
- **CartSidebar**: Sliding cart panel with item management
- **Checkout**: Multi-step checkout process
- **OrderSuccess**: Order confirmation page

#### Management Components

- **OrderManagement**: Admin/Manager order management interface
- **CustomerOrderHistory**: Customer order tracking interface

### State Management

The system uses React Context with useReducer for cart state management:

```typescript
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": // Add or update item quantity
    case "REMOVE_ITEM": // Remove item from cart
    case "UPDATE_QUANTITY": // Update item quantity
    case "CLEAR_CART": // Clear all items
    // ... other actions
  }
};
```

## User Flows

### Customer Order Flow

1. **Browse Menu**: Visit restaurant profile and view menu
2. **Add to Cart**: Click "Add to Cart" on desired items
3. **View Cart**: Click cart icon to see cart contents
4. **Checkout**: Click "Proceed to Checkout" to start checkout process
5. **Complete Order**: Fill in details and confirm order
6. **Track Order**: Monitor order status in customer dashboard

### Admin/Manager Order Flow

1. **View Orders**: Access order management from dashboard
2. **Filter & Search**: Use filters to find specific orders
3. **Update Status**: Change order status as it progresses
4. **View Details**: Click on orders to see full details
5. **Manage Operations**: Handle customer inquiries and order issues

## File Structure

```
src/
├── contexts/
│   └── CartContext.tsx          # Cart state management
├── components/
│   ├── CartIcon.tsx             # Cart icon with item count
│   ├── CartSidebar.tsx          # Cart sidebar panel
│   ├── OrderManagement.tsx      # Admin/Manager order interface
│   └── CustomerOrderHistory.tsx # Customer order tracking
├── data/
│   └── checkoutData.ts          # Data structures and sample data
├── pages/
│   ├── Checkout.tsx             # Checkout process
│   ├── OrderSuccess.tsx         # Order confirmation
│   └── dashboard/
│       ├── admin/Orders.tsx     # Admin orders page
│       ├── manager/Orders.tsx   # Manager orders page
│       └── customer/Orders.tsx  # Customer orders page
```

## Integration Points

### Restaurant Profile

- Menu items now have "Add to Cart" buttons
- Cart context integration for state management

### Dashboard Integration

- **Admin Dashboard**: New "Order Management" section
- **Manager Dashboard**: New "Order Management" section
- **Customer Dashboard**: New "Order History" section

### Navigation

- Cart icon added to main navbar
- Cart sidebar accessible from any page
- New routes for checkout and order management

## Configuration

### Cart Settings

- Tax rate: 5%
- Service charge: 5%
- Delivery fee: RWF 1,000 (for delivery orders)

### Order Statuses

- `pending` - Order received, under review
- `confirmed` - Order confirmed, will be prepared
- `preparing` - Order being prepared in kitchen
- `ready` - Order ready for pickup/delivery
- `out_for_delivery` - Order en route to customer
- `delivered` - Order successfully delivered
- `cancelled` - Order cancelled

### Payment Statuses

- `pending` - Payment not yet processed
- `paid` - Payment completed successfully
- `failed` - Payment processing failed
- `refunded` - Payment refunded to customer

## Usage Examples

### Adding Items to Cart

```typescript
const { addItem } = useCart();

const handleAddToCart = (menuItem) => {
  const cartItem: CartItem = {
    id: `item_${Date.now()}`,
    productId: menuItem.id,
    name: menuItem.name,
    description: menuItem.description,
    price: menuItem.price,
    quantity: 1,
    totalPrice: menuItem.price,
    image: menuItem.image,
    category: menuItem.category,
    modifiers: [],
  };
  addItem(cartItem);
};
```

### Managing Cart State

```typescript
const { state, removeItem, updateQuantity, clearCart } = useCart();
const { items, isOpen } = state;

// Remove item
removeItem(itemId);

// Update quantity
updateQuantity(itemId, newQuantity);

// Clear entire cart
clearCart();
```

## Future Enhancements

### Planned Features

- **Real-time Updates**: WebSocket integration for live order status
- **Payment Gateway**: Integration with actual payment providers
- **Inventory Sync**: Real-time inventory management
- **Delivery Tracking**: GPS tracking for delivery orders
- **Push Notifications**: Order status notifications
- **Analytics**: Order analytics and reporting

### Technical Improvements

- **Database Integration**: Replace static data with real database
- **Authentication**: User authentication and order history
- **API Endpoints**: RESTful API for order operations
- **Caching**: Redis caching for better performance
- **Testing**: Comprehensive test coverage

## Troubleshooting

### Common Issues

#### Cart Not Updating

- Ensure CartProvider wraps the application
- Check that useCart hook is used within CartProvider
- Verify cart context is properly imported

#### Checkout Process Issues

- Validate all required fields are filled
- Check payment method selection
- Ensure cart has items before proceeding

#### Order Management Access

- Verify user role permissions
- Check dashboard route configuration
- Ensure OrderManagement component is properly imported

### Debug Tips

- Use browser dev tools to inspect cart state
- Check console for any error messages
- Verify component props and state updates
- Test with different user roles and permissions

## Support

For technical support or questions about the Order and Checkout Management system:

1. Check the component documentation
2. Review the data structures in `checkoutData.ts`
3. Examine the cart context implementation
4. Test the user flows step by step

The system is designed to be modular and extensible, making it easy to add new features or modify existing functionality as needed.

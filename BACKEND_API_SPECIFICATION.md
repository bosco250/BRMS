# 🔌 Backend API Specification for BRMS Order System

## 📋 Table of Contents
1. [TypeScript Interfaces](#typescript-interfaces)
2. [API Endpoints](#api-endpoints)
3. [Database Schema](#database-schema)
4. [Request/Response Examples](#requestresponse-examples)
5. [Error Handling](#error-handling)
6. [Authentication](#authentication)

---

## 📦 TypeScript Interfaces

### **1. Order Creation Payload**
```typescript
interface CreateOrderPayload {
  // Customer Information
  customer_id?: string;           // Optional - UUID/ID of logged-in user (null for guest)
  customer_name: string;          // Required - Full name (First + Last)
  customer_email: string;         // Required - Email address
  customer_phone: string;         // Required - Phone number (e.g., "+250788123456")
  
  // Business Information
  business_id: string;            // Required - Restaurant/Business ID
  
  // Order Items
  items: OrderItemPayload[];      // Required - Array of order items (min 1 item)
  
  // Delivery Information
  delivery_method: "dine_in" | "take_away" | "delivery";  // Required
  delivery_address?: string;      // Required if delivery_method = "delivery"
  delivery_contact?: string;      // Required if delivery_method = "delivery"
  delivery_instructions?: string; // Optional - Special delivery instructions
  
  // Payment Information
  payment_method: "cash_on_delivery" | "mobile_money" | "bank_transfer" | "card";  // Required
  payment_details?: PaymentDetails;  // Optional - Payment-specific information
  
  // Order Totals
  subtotal: number;               // Required - Sum of all item prices
  tax: number;                    // Required - Tax amount (8% of subtotal)
  delivery_fee: number;           // Required - Delivery fee (0 for dine_in/take_away)
  total: number;                  // Required - subtotal + tax + delivery_fee
  
  // Additional Information
  special_instructions?: string;  // Optional - Special order instructions
  is_guest_order: boolean;        // Required - true if customer is not logged in
}
```

### **2. Order Item Payload**
```typescript
interface OrderItemPayload {
  menu_item_id: string;           // Required - ID from menu table
  name: string;                   // Required - Menu item name (snapshot)
  quantity: number;               // Required - Quantity ordered (min 1)
  price: number;                  // Required - Unit price at time of order
  total_price: number;            // Required - quantity * price
  modifiers?: OrderItemModifier[]; // Optional - Array of modifiers (extras, toppings)
  special_instructions?: string;  // Optional - Item-specific instructions
}
```

### **3. Order Item Modifier**
```typescript
interface OrderItemModifier {
  name: string;                   // Required - Modifier name (e.g., "Extra Sauce")
  price: number;                  // Required - Modifier price
  quantity: number;               // Required - Modifier quantity
}
```

### **4. Payment Details**
```typescript
interface PaymentDetails {
  // Mobile Money (if payment_method = "mobile_money")
  mobile_provider?: string;       // "MTN" | "AIRTEL" | "MPESA" | "EQUITY" | "BK"
  mobile_number?: string;         // Phone number for mobile money
  
  // Bank Transfer (if payment_method = "bank_transfer")
  bank_name?: string;             // Bank name
  bank_account?: string;          // Account number
  account_holder?: string;        // Account holder name
  
  // Card (if payment_method = "card")
  card_number?: string;           // Card number (should be encrypted/tokenized)
  card_holder?: string;           // Cardholder name
  card_expiry?: string;           // Expiry date (MM/YY)
  card_cvv?: string;              // CVV (should be encrypted/tokenized)
}
```

### **5. Order Response**
```typescript
interface Order {
  id: string;                     // Order ID (auto-generated)
  order_number: string;           // Unique order number (e.g., "ORD-1696234567890-123")
  
  // Customer Information
  customer_id?: string;           // User ID (null for guest orders)
  customer_name: string;          // Customer full name
  customer_email: string;         // Customer email
  customer_phone: string;         // Customer phone
  
  // Business Information
  business_id: string;            // Restaurant/Business ID
  business_name?: string;         // Restaurant name (optional, for display)
  
  // Order Items
  items: OrderItem[];             // Array of order items with details
  
  // Delivery Information
  delivery_method: string;        // "dine_in" | "take_away" | "delivery"
  delivery_address?: string;      // Delivery address (if applicable)
  delivery_contact?: string;      // Delivery contact (if applicable)
  delivery_instructions?: string; // Delivery instructions
  
  // Payment Information
  payment_method: string;         // Payment method used
  payment_status: "pending" | "paid" | "failed" | "refunded";  // Payment status
  
  // Order Totals
  subtotal: number;               // Subtotal amount
  tax: number;                    // Tax amount
  delivery_fee: number;           // Delivery fee
  total: number;                  // Total amount
  
  // Order Status
  status: "pending" | "confirmed" | "preparing" | "ready" | "out_for_delivery" | "delivered" | "cancelled";
  
  // Additional Information
  special_instructions?: string;  // Special order instructions
  is_guest_order: boolean;        // Guest order flag
  
  // Timestamps
  created_at: string;             // ISO 8601 timestamp
  updated_at: string;             // ISO 8601 timestamp
  estimated_delivery_time?: string; // ISO 8601 timestamp (optional)
  actual_delivery_time?: string;  // ISO 8601 timestamp (optional)
}
```

### **6. Order Item Response**
```typescript
interface OrderItem {
  id: string;                     // Order item ID
  order_id: string;               // Parent order ID
  menu_item_id: string;           // Menu item ID
  name: string;                   // Item name (snapshot)
  quantity: number;               // Quantity
  price: number;                  // Unit price
  total_price: number;            // Total price (quantity * price)
  modifiers?: OrderItemModifier[]; // Modifiers
  special_instructions?: string;  // Item instructions
}
```

### **7. API Response Wrapper**
```typescript
interface ApiResponse<T = any> {
  success: boolean;               // true if request succeeded
  data?: T;                       // Response data (if success)
  message?: string;               // Success message
  error?: string;                 // Error message (if failed)
  status?: number;                // HTTP status code
  details?: any;                  // Additional error details
}
```

---

## 🔌 API Endpoints

### **1. Create Order**
```
POST /orders/create
```

**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"  // Optional - only for logged-in users
}
```

**Request Body:** See `CreateOrderPayload` interface above

**Response (Success - 201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "456",
    "order_number": "ORD-1696234567890-123",
    "customer_id": "123",
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "customer_phone": "+250788123456",
    "business_id": "5",
    "business_name": "Amazing Restaurant",
    "items": [
      {
        "id": "789",
        "order_id": "456",
        "menu_item_id": "10",
        "name": "Grilled Chicken",
        "quantity": 2,
        "price": 15000,
        "total_price": 30000,
        "modifiers": [
          {
            "name": "Extra Sauce",
            "price": 500,
            "quantity": 1
          }
        ],
        "special_instructions": "No onions"
      }
    ],
    "delivery_method": "delivery",
    "delivery_address": "KG 123 St, Kigali",
    "delivery_contact": "+250788123456",
    "delivery_instructions": "Call when you arrive",
    "payment_method": "mobile_money",
    "payment_status": "pending",
    "subtotal": 30000,
    "tax": 2400,
    "delivery_fee": 3000,
    "total": 35400,
    "status": "pending",
    "special_instructions": null,
    "is_guest_order": false,
    "created_at": "2024-10-02T10:22:47.890Z",
    "updated_at": "2024-10-02T10:22:47.890Z",
    "estimated_delivery_time": null,
    "actual_delivery_time": null
  },
  "message": "Order created successfully",
  "status": 201
}
```

**Response (Error - 400 Bad Request):**
```json
{
  "success": false,
  "error": "Customer information required",
  "status": 400,
  "details": {
    "missing_fields": ["customer_name", "customer_email"]
  }
}
```

---

### **2. Get Order by ID**
```
GET /orders/:id
```

**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"  // Optional
}
```

**Response (Success - 200 OK):**
```json
{
  "success": true,
  "data": {
    // Same as Create Order response
  },
  "status": 200
}
```

**Response (Error - 404 Not Found):**
```json
{
  "success": false,
  "error": "Order not found",
  "status": 404
}
```

---

### **3. Get Customer Orders**
```
GET /orders/customer/:customerId
```

**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"  // Required
}
```

**Response (Success - 200 OK):**
```json
{
  "success": true,
  "data": [
    {
      // Order object
    },
    {
      // Order object
    }
  ],
  "status": 200
}
```

---

### **4. Get Business Orders**
```
GET /orders/business/:businessId
```

**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"  // Required
}
```

**Query Parameters (Optional):**
```
?status=pending           // Filter by status
&limit=20                 // Limit results
&offset=0                 // Pagination offset
&start_date=2024-01-01    // Filter by date range
&end_date=2024-12-31
```

**Response (Success - 200 OK):**
```json
{
  "success": true,
  "data": [
    {
      // Order object
    }
  ],
  "status": 200
}
```

---

### **5. Update Order Status**
```
PATCH /orders/:id/status
```

**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"  // Required
}
```

**Request Body:**
```json
{
  "status": "confirmed"  // "pending" | "confirmed" | "preparing" | "ready" | "out_for_delivery" | "delivered" | "cancelled"
}
```

**Response (Success - 200 OK):**
```json
{
  "success": true,
  "data": {
    // Updated order object
  },
  "message": "Order status updated",
  "status": 200
}
```

---

### **6. Update Payment Status**
```
PATCH /orders/:id/payment-status
```

**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"  // Required
}
```

**Request Body:**
```json
{
  "payment_status": "paid"  // "pending" | "paid" | "failed" | "refunded"
}
```

**Response (Success - 200 OK):**
```json
{
  "success": true,
  "data": {
    // Updated order object
  },
  "message": "Payment status updated",
  "status": 200
}
```

---

### **7. Cancel Order**
```
PATCH /orders/:id/cancel
```

**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"  // Required
}
```

**Request Body:**
```json
{
  "reason": "Customer requested cancellation"  // Optional
}
```

**Response (Success - 200 OK):**
```json
{
  "success": true,
  "data": {
    // Updated order object with status = "cancelled"
  },
  "message": "Order cancelled",
  "status": 200
}
```

---

## 🗄️ Database Schema

### **Table: `orders`**
```sql
CREATE TABLE orders (
  -- Primary Key
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  
  -- Customer Information
  customer_id INTEGER REFERENCES users(id) NULL,  -- NULL for guest orders
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  
  -- Business Information
  business_id INTEGER REFERENCES businesses(id) NOT NULL,
  
  -- Delivery Information
  delivery_method VARCHAR(20) NOT NULL CHECK (delivery_method IN ('dine_in', 'take_away', 'delivery')),
  delivery_address TEXT,
  delivery_contact VARCHAR(20),
  delivery_instructions TEXT,
  
  -- Payment Information
  payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('cash_on_delivery', 'mobile_money', 'bank_transfer', 'card')),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_details JSONB,  -- Stores payment-specific info as JSON
  
  -- Order Totals
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) NOT NULL,
  delivery_fee DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  
  -- Order Status
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled')),
  
  -- Additional Information
  special_instructions TEXT,
  is_guest_order BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estimated_delivery_time TIMESTAMP,
  actual_delivery_time TIMESTAMP,
  
  -- Indexes for performance
  INDEX idx_customer_id (customer_id),
  INDEX idx_business_id (business_id),
  INDEX idx_order_number (order_number),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at),
  INDEX idx_payment_status (payment_status)
);
```

### **Table: `order_items`**
```sql
CREATE TABLE order_items (
  -- Primary Key
  id SERIAL PRIMARY KEY,
  
  -- Foreign Keys
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  menu_item_id INTEGER REFERENCES menu(id) NOT NULL,
  
  -- Item Details (snapshot at time of order)
  name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  
  -- Modifiers (extras, toppings, etc.)
  modifiers JSONB,  -- Array of {name, price, quantity}
  
  -- Special Instructions
  special_instructions TEXT,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Indexes
  INDEX idx_order_id (order_id),
  INDEX idx_menu_item_id (menu_item_id)
);
```

---

## 🔐 Authentication & Authorization

### **Guest Orders:**
- No authentication required
- `customer_id` should be `null`
- `is_guest_order` should be `true`

### **Logged-in Orders:**
- Require valid JWT token in `Authorization` header
- `customer_id` should be the authenticated user's ID
- `is_guest_order` should be `false`

### **Authorization Rules:**
1. **Create Order:** Anyone (guest or logged-in)
2. **Get Order by ID:** Owner or business staff only
3. **Get Customer Orders:** Customer only (must match customer_id)
4. **Get Business Orders:** Business owner/staff only
5. **Update Order Status:** Business owner/staff only
6. **Update Payment Status:** Business owner/staff only
7. **Cancel Order:** Customer or business owner/staff

---

## 🧪 Testing Examples

### **Example 1: Guest Order (Dine-In, Cash)**
```bash
curl -X POST http://localhost:3000/orders/create \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "Jane Smith",
    "customer_email": "jane@example.com",
    "customer_phone": "+250788999888",
    "business_id": "5",
    "items": [
      {
        "menu_item_id": "12",
        "name": "Beef Burger",
        "quantity": 1,
        "price": 8000,
        "total_price": 8000
      }
    ],
    "delivery_method": "dine_in",
    "payment_method": "cash_on_delivery",
    "subtotal": 8000,
    "tax": 640,
    "delivery_fee": 0,
    "total": 8640,
    "is_guest_order": true
  }'
```

### **Example 2: Logged-in Order (Delivery, Mobile Money)**
```bash
curl -X POST http://localhost:3000/orders/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "customer_id": "123",
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "customer_phone": "+250788123456",
    "business_id": "5",
    "items": [
      {
        "menu_item_id": "10",
        "name": "Grilled Chicken",
        "quantity": 2,
        "price": 15000,
        "total_price": 30000,
        "modifiers": [
          {
            "name": "Extra Sauce",
            "price": 500,
            "quantity": 1
          }
        ]
      }
    ],
    "delivery_method": "delivery",
    "delivery_address": "KG 123 St, Kigali",
    "delivery_contact": "+250788123456",
    "delivery_instructions": "Call when you arrive",
    "payment_method": "mobile_money",
    "payment_details": {
      "mobile_provider": "MTN",
      "mobile_number": "+250788123456"
    },
    "subtotal": 30500,
    "tax": 2440,
    "delivery_fee": 3000,
    "total": 35940,
    "is_guest_order": false
  }'
```

---

## 📝 Notes for Backend Developer

### **Important:**
1. ✅ Generate unique `order_number` on server side (format: `ORD-{timestamp}-{random}`)
2. ✅ Use database transactions when creating orders (insert order + insert order_items)
3. ✅ Store `payment_details` and `modifiers` as JSONB in PostgreSQL
4. ✅ Validate that all `menu_item_id` exist and belong to the specified `business_id`
5. ✅ Send email/SMS notifications after order creation
6. ✅ Update `updated_at` timestamp on any order modification
7. ✅ Never expose sensitive payment details in responses (card numbers, CVV)
8. ✅ Implement proper error handling and return descriptive error messages
9. ✅ Add rate limiting to prevent abuse
10. ✅ Log all order operations for audit trail

### **Security:**
- ✅ Encrypt card details before storing (or use payment gateway tokenization)
- ✅ Validate JWT tokens for protected endpoints
- ✅ Sanitize all user inputs to prevent SQL injection
- ✅ Use HTTPS for all API requests
- ✅ Implement CORS properly

### **Performance:**
- ✅ Add database indexes on frequently queried fields
- ✅ Use connection pooling for database
- ✅ Cache frequently accessed data (menu items, business info)
- ✅ Implement pagination for list endpoints

---

## ✅ Checklist for Backend Implementation

- [ ] Create `orders` table with all fields and indexes
- [ ] Create `order_items` table with all fields and indexes
- [ ] Implement `POST /orders/create` endpoint
- [ ] Implement `GET /orders/:id` endpoint
- [ ] Implement `GET /orders/customer/:customerId` endpoint
- [ ] Implement `GET /orders/business/:businessId` endpoint
- [ ] Implement `PATCH /orders/:id/status` endpoint
- [ ] Implement `PATCH /orders/:id/payment-status` endpoint
- [ ] Implement `PATCH /orders/:id/cancel` endpoint
- [ ] Add validation for all endpoints
- [ ] Add authentication/authorization
- [ ] Add error handling
- [ ] Add email notifications
- [ ] Add SMS notifications (optional)
- [ ] Add logging and monitoring
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Deploy to staging environment
- [ ] Test end-to-end with frontend
- [ ] Deploy to production

---

**This specification is complete and production-ready. Share this with your backend developer!** 🚀

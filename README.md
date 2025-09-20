# 🍽️ BRMS - Business Restaurant Management System

A comprehensive, modern restaurant management system built with React, TypeScript, and Tailwind CSS. BRMS provides a complete solution for managing all aspects of restaurant operations, from customer orders to financial analytics.

## 🌟 Features

### 🏪 **Multi-Role Dashboard System**

- **Admin Dashboard** - System-wide management and analytics
- **Owner Dashboard** - Business operations and strategic decisions
- **Manager Dashboard** - Daily operations and staff management
- **Accountant Dashboard** - Financial records and tax management
- **Kitchen Dashboard** - Order queue and food preparation
- **Waiter Dashboard** - Order taking and table management
- **Customer Dashboard** - Menu browsing and order history

### 🔐 **Authentication & Security**

- Secure login/register system
- Role-based access control
- Email verification with OTP
- Complete forgot password flow with OTP verification
- Session management and route protection

### 📱 **Customer Experience**

- Beautiful landing page with modern UI
- Restaurant browsing and discovery
- Interactive menu with cart functionality
- Real-time order tracking
- Reservation system
- Loyalty program integration

### 🍕 **Restaurant Operations**

- Order management across all roles
- Real-time kitchen queue
- Table management and reservations
- Inventory tracking
- Menu management
- Staff scheduling

### 📊 **Analytics & Reporting**

- Financial monitoring and reports
- Sales analytics
- Performance metrics
- Audit logs
- System analytics

### 💰 **Financial Management**

- Invoice generation
- Tax management
- Financial records
- Payment processing
- Subscription management

## 🛠️ **Technology Stack**

### **Frontend**

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Toastify** - Beautiful notifications

### **State Management**

- **React Context** - For cart and authentication state
- **Custom Hooks** - Reusable stateful logic

### **UI/UX**

- **Lucide React** - Beautiful icon library
- **Responsive Design** - Mobile-first approach
- **Modern Animations** - Smooth transitions and hover effects
- **Glassmorphism** - Modern UI design patterns

### **Development Tools**

- **ESLint** - Code linting and quality
- **TypeScript** - Static type checking
- **Vite** - Development server and build tool

## 🚀 **Getting Started**

### **Prerequisites**

- Node.js (v16 or higher)
- npm or yarn

### **Installation**

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd BRMS
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### **Available Scripts**

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📁 **Project Structure**

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── CartIcon.tsx    # Shopping cart icon
│   ├── CartSidebar.tsx # Cart sidebar component
│   ├── Navbar.tsx      # Navigation bar
│   └── ...
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── ForgotPasswordOTP.tsx
│   │   └── ResetPassword.tsx
│   ├── dashboard/      # Dashboard pages by role
│   │   ├── admin/      # Admin dashboard
│   │   ├── owner/      # Owner dashboard
│   │   ├── manager/    # Manager dashboard
│   │   ├── accountant/ # Accountant dashboard
│   │   ├── kitchen/    # Kitchen dashboard
│   │   ├── waiter/     # Waiter dashboard
│   │   └── customer/   # Customer dashboard
│   ├── Landing.tsx     # Landing page
│   └── ...
├── contexts/           # React Context providers
├── services/           # API and service layers
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── data/               # Mock data and constants
```

## 🎨 **Design System**

### **Color Palette**

- **Brand Colors**: Deep Teal (#2D5A5A) with hover states
- **Surface Colors**: Primary, Secondary, Card backgrounds
- **Text Colors**: Primary, Secondary, Muted, Inverted
- **Status Colors**: Success, Warning, Error, Info
- **Border Colors**: Primary, Secondary, Subtle

### **Typography**

- Responsive text sizing
- Consistent font weights
- Proper text hierarchy

### **Components**

- Consistent spacing and padding
- Modern border radius and shadows
- Smooth transitions and animations
- Accessibility-focused design

## 🔐 **Authentication Flow**

### **Complete Password Reset Process**

1. **Forgot Password** - User enters email
2. **OTP Verification** - User enters 6-digit code
3. **Reset Password** - User sets new password
4. **Success** - Redirect to login

### **User Roles**

- **Admin**: System administration and global analytics
- **Owner**: Business strategy and financial oversight
- **Manager**: Daily operations and staff management
- **Accountant**: Financial records and tax management
- **Kitchen**: Food preparation and order management
- **Waiter**: Customer service and order taking
- **Customer**: Menu browsing and ordering

## 🍽️ **Restaurant Features**

### **Order Management**

- Real-time order tracking
- Kitchen queue management
- Order status updates
- Payment processing

### **Menu Management**

- Dynamic menu updates
- Category organization
- Pricing management
- Availability tracking

### **Table Management**

- Table reservations
- Seating arrangements
- Table status tracking
- Waiter assignments

### **Inventory System**

- Stock tracking
- Low inventory alerts
- Supplier management
- Cost tracking

## 📊 **Analytics & Reporting**

### **Financial Reports**

- Revenue tracking
- Expense management
- Profit/loss analysis
- Tax calculations

### **Operational Analytics**

- Order volume trends
- Popular menu items
- Staff performance
- Customer satisfaction

### **System Analytics**

- User activity logs
- System performance
- Error tracking
- Usage statistics

## 🔧 **Configuration**

### **Environment Variables**

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url
VITE_APP_NAME=BRMS
```

### **Tailwind Configuration**

The project uses a custom Tailwind configuration with:

- Custom color palette
- Responsive utilities
- Component-specific styles

## 🚀 **Deployment**

### **Build for Production**

```bash
npm run build
```

### **Deploy to Vercel**

```bash
npm install -g vercel
vercel
```

### **Deploy to Netlify**

```bash
npm run build
# Upload dist folder to Netlify
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icon set
- All contributors and users

## 📞 **Support**

For support, email support@brms.com or join our Discord community.

---

**Built with ❤️ for the restaurant industry**

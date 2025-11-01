# Sweet Shop Frontend Components

## 🎨 UI Components

### Button
Reusable button component with multiple variants and sizes.
- **Variants**: primary, secondary, danger, success, ghost
- **Sizes**: sm, md, lg
- **Features**: Loading states, disabled states, custom styling

### Input
Enhanced input component with labels, icons, and error states.
- **Features**: Icon support, error handling, custom styling
- **Types**: All standard HTML input types supported

### Card
Flexible card component with header, content, and footer sections.
- **Features**: Hover effects, custom styling, modular structure

### Badge
Small status indicators with different variants.
- **Variants**: default, primary, success, warning, danger
- **Sizes**: sm, md, lg

### SearchBar
Real-time search component with clear functionality.
- **Features**: Real-time search, clear button, custom placeholder

### EmptyState
Reusable empty state component for when no data is available.
- **Features**: Custom icon, title, description, and action button

### Toggle
Modern toggle switch component for boolean inputs.
- **Features**: Smooth animations, disabled states, custom labels and descriptions
- **Use Cases**: Settings, preferences, role selection

## 🏗️ Layout Components

### Layout
Main layout wrapper with header and footer.
- **Features**: Responsive design, gradient background, flexible header/footer control

### Header
Navigation header with user info and actions.
- **Features**: Logo, user avatar, admin access, logout functionality

### Footer
Site footer with links and contact information.
- **Features**: Responsive grid, social links, company info

## 🍬 Sweet Components

### SweetCard
Individual sweet item display card.
- **Features**: Hover animations, stock status, purchase button, category icons

### SweetGrid
Grid layout for displaying multiple sweets.
- **Features**: Loading states, empty states, responsive grid

## 👑 Admin Components

### AdminSweetCard
Admin-specific sweet card with management actions.
- **Features**: Stock status indicators, restock/delete actions

### AddSweetForm
Form for adding new sweets to inventory.
- **Features**: Validation, loading states, form reset

## 🛒 Cart Components

### CartContext
React context for managing cart state across the application.
- **Features**: Add/remove items, quantity management, localStorage persistence
- **Functions**: addToCart, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice

### CartIcon
Header cart icon with item count badge.
- **Features**: Real-time item count, click to open cart sidebar

### CartItem
Individual cart item component with quantity controls.
- **Features**: Quantity increment/decrement, remove item, price calculation

### CartSidebar
Slide-out cart panel for quick cart management.
- **Features**: Item list, total calculation, place order, clear cart

### Cart Page
Full-page cart view with detailed order summary.
- **Features**: Comprehensive cart management, order placement, responsive design

## 🎯 Features Implemented

1. **Modern UI Design**: Clean, modern interface with gradient backgrounds and smooth animations
2. **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
3. **Component Architecture**: Modular, reusable components following React best practices
4. **Enhanced UX**: Loading states, error handling, toast notifications, and smooth transitions
5. **Accessibility**: Proper ARIA labels, keyboard navigation, and semantic HTML
6. **Performance**: Optimized components with proper state management and minimal re-renders
7. **Shopping Cart**: Full cart functionality with add/remove items, quantity management, and order placement
8. **Role-based Registration**: Users can choose between regular user and admin accounts during signup
9. **Order Management**: Complete order system with backend API and database storage

## 🚀 Technologies Used

- **React 19**: Latest React with modern hooks and features
- **Tailwind CSS 3**: Utility-first CSS framework for rapid styling
- **React Router**: Client-side routing for SPA navigation
- **React Hot Toast**: Beautiful toast notifications
- **Axios**: HTTP client for API communication

## 🎨 Design System

### Colors
- **Primary**: Pink/Rose gradient (#ec4899 to #f43f5e)
- **Background**: Soft gradient from pink to purple
- **Text**: Gray scale for optimal readability
- **Status Colors**: Green (success), Yellow (warning), Red (danger)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300-800 range for various text elements
- **Sizes**: Responsive typography with proper hierarchy

### Animations
- **Hover Effects**: Smooth transitions on interactive elements
- **Loading States**: Shimmer effects and skeleton screens
- **Micro-interactions**: Bounce animations and scale effects
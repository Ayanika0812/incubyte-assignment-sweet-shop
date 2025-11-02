# Sweet Shop Management System

A modern, full-stack sweet shop application built with the MERN stack. This project implements a complete e-commerce solution for a sweet shop with user authentication, shopping cart functionality, and admin management features.

## 🚀 Features

### 🔐 Authentication & Authorization
- **User Registration**: Choose between regular user or admin account during signup
- **JWT Authentication**: Secure login/logout with token-based auth
- **Role-based Access**: Different features for users and admins

### 🛒 Shopping Experience
- **Browse Sweets**: Beautiful grid layout with sweet categories and pricing
- **Real-time Search**: Instant search functionality with live results
- **Shopping Cart**: Add items, manage quantities, persistent cart storage
- **Order Management**: Place orders, view order history with detailed breakdowns
- **Stock Validation**: Prevents ordering more than available stock

### 👑 Admin Features
- **Inventory Management**: Add, edit, delete sweets from inventory
- **Stock Control**: Restock items and monitor inventory levels
- **Order Oversight**: View and manage all customer orders
- **Dashboard Analytics**: Track inventory stats and low stock alerts

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Beautiful Components**: Custom-built UI components with Tailwind CSS
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Toast Notifications**: Real-time feedback for user actions

## 🛠️ Tech Stack

**Frontend:**
- React 19 with modern hooks
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- React Hot Toast for notifications

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- CORS for cross-origin requests

**Development:**
- Vite for fast development
- Nodemon for auto-restart
- ESLint for code quality

## 📁 Project Structure

```
sweet-shop/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── context/       # React context providers
│   │   ├── utils/         # Utility functions
│   │   └── api/           # API configuration
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   └── tests/         # Test files
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone (https://github.com/Ayanika0812/incubyte-assignment-sweet-shop/tree/main)
cd sweet-shop
```

2. **Backend Setup**
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb://localhost:27017/sweetshop
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🧪 Testing

Run the test suite:
```bash
cd backend
npm test
```

Tests cover:
- Authentication endpoints
- Sweet CRUD operations
- Order management
- Middleware functionality

## 📱 Usage

### For Users:
1. Register for an account (choose user or admin role)
2. Browse the sweet collection
3. Add items to your cart
4. Place orders and track order history

### For Admins:
1. Access the admin panel from the header
2. Add new sweets to inventory
3. Manage stock levels and restock items
4. View and manage customer orders

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Sweets
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets
- `POST /api/sweets` - Add sweet (Admin)
- `PUT /api/sweets/:id` - Update sweet (Admin)
- `DELETE /api/sweets/:id` - Delete sweet (Admin)
- `POST /api/sweets/:id/purchase` - Purchase sweet
- `POST /api/sweets/:id/restock` - Restock sweet (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/admin/all` - Get all orders (Admin)

## 🎨 Component Architecture

The frontend uses a modular component architecture:

- **UI Components**: Reusable components (Button, Input, Card, etc.)
- **Layout Components**: Header, Footer, Layout wrapper
- **Feature Components**: Sweet cards, cart items, admin forms
- **Pages**: Complete page components with business logic

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization
- CORS configuration
- Protected API routes

## 🚀 Deployment

The application is ready for deployment on platforms like:
- **Frontend**: Vercel, Netlify
- **Backend**: Heroku, Railway, DigitalOcean
- **Database**: MongoDB Atlas

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/Ayanika0812)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/ayanika-paul)

---

Built with ❤️ using the MERN stack

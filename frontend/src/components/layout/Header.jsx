import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Button from '../ui/Button';
import CartIcon from '../cart/CartIcon';
import CartSidebar from '../cart/CartSidebar';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md border-b border-pink-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">🍭</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Sweet Shop
                </h1>
                <p className="text-xs text-gray-500">Delicious Treats</p>
              </div>
            </div>

            {/* User Info & Actions */}
            <div className="flex items-center space-x-4">
              {user && (
                <div className="hidden sm:flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      Welcome, {user.email?.split('@')[0]} 👋
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user.role} Account
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                {/* Cart Icon */}
                <CartIcon onClick={() => setIsCartOpen(true)} />
                
                {/* Cart Page Link */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/cart')}
                  className="hidden sm:inline-flex"
                >
                  🛒 Cart
                </Button>
                
                {/* Orders Link */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/orders')}
                  className="hidden md:inline-flex"
                >
                  📦 Orders
                </Button>
                
                {user?.role === 'admin' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate('/admin')}
                    className="hidden sm:inline-flex"
                  >
                    👑 Admin
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
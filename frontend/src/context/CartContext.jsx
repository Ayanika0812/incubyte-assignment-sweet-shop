import { createContext, useContext, useReducer, useEffect } from 'react';
import { showToast } from '../utils/toast';

const CartContext = createContext();

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item._id === action.payload._id
              ? { ...item, cartQuantity: item.cartQuantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, cartQuantity: 1 }]
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload.id
            ? { ...item, cartQuantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.cartQuantity > 0)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload || []
      };

    default:
      return state;
  }
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('sweetShopCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sweetShopCart', JSON.stringify(cart.items));
  }, [cart.items]);

  const addToCart = (sweet) => {
    if (sweet.quantity <= 0) {
      showToast.error('Sorry, this item is out of stock!');
      return;
    }
    
    const existingItem = cart.items.find(item => item._id === sweet._id);
    const currentCartQuantity = existingItem ? existingItem.cartQuantity : 0;
    
    if (currentCartQuantity >= sweet.quantity) {
      showToast.error('Cannot add more items than available in stock!');
      return;
    }

    dispatch({ type: 'ADD_TO_CART', payload: sweet });
    showToast.sweet(`${sweet.name} added to cart! 🛒`);
  };

  const removeFromCart = (sweetId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: sweetId });
    showToast.success('Item removed from cart');
  };

  const updateQuantity = (sweetId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(sweetId);
      return;
    }
    
    const item = cart.items.find(item => item._id === sweetId);
    if (item && quantity > item.quantity) {
      showToast.error('Cannot add more items than available in stock!');
      return;
    }

    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: sweetId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    showToast.success('Cart cleared');
  };

  const getTotalItems = () => {
    return cart.items.reduce((total, item) => total + item.cartQuantity, 0);
  };

  const getTotalPrice = () => {
    return cart.items.reduce((total, item) => total + (item.price * item.cartQuantity), 0);
  };

  const getItemQuantity = (sweetId) => {
    const item = cart.items.find(item => item._id === sweetId);
    return item ? item.cartQuantity : 0;
  };

  const value = {
    cart: cart.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
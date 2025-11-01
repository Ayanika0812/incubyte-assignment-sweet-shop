import toast from 'react-hot-toast';

// Custom toast configurations
const toastConfig = {
  duration: 4000,
  position: 'top-right',
  style: {
    borderRadius: '12px',
    background: '#fff',
    color: '#333',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    border: '1px solid #f1f5f9',
  },
};

export const showToast = {
  success: (message) => toast.success(message, {
    ...toastConfig,
    icon: '🎉',
    style: {
      ...toastConfig.style,
      border: '1px solid #10b981',
    },
  }),
  
  error: (message) => toast.error(message, {
    ...toastConfig,
    icon: '😞',
    style: {
      ...toastConfig.style,
      border: '1px solid #ef4444',
    },
  }),
  
  loading: (message) => toast.loading(message, {
    ...toastConfig,
    icon: '⏳',
  }),
  
  sweet: (message) => toast.success(message, {
    ...toastConfig,
    icon: '🍬',
    style: {
      ...toastConfig.style,
      border: '1px solid #ec4899',
      background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
    },
  }),
  
  purchase: (message) => toast.success(message, {
    ...toastConfig,
    icon: '🛒',
    duration: 3000,
    style: {
      ...toastConfig.style,
      border: '1px solid #10b981',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    },
  }),
};

export default showToast;
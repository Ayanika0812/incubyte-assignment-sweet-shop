const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-pink-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🍭</span>
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Sweet Shop
              </h3>
            </div>
            <p className="text-gray-600 text-sm">
              Your one-stop destination for the finest sweets and treats. 
              Made with love, served with joy.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div>🏠 Home</div>
              <div>🍬 All Sweets</div>
              <div>📞 Contact Us</div>
              <div>ℹ️ About Us</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold text-gray-900 mb-4">Get in Touch</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div>📧 contactayanika@gmail.com</div>
              <div>📱 +91 8700235893</div>
              <div>📍 123 Sweet Street, Candy City</div>
              <div className="flex justify-center md:justify-end space-x-3 mt-4">
                <span className="text-lg">🐦</span>
                <span className="text-lg">📘</span>
                <span className="text-lg">📷</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-pink-200 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Sweet Shop. Made with ❤️ and lots of sugar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
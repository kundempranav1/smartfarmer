import { useState } from 'react';
import { X, ShoppingCart, IndianRupee, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MarketplaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MarketplaceModal({ isOpen, onClose }: MarketplaceModalProps) {
  const [crop, setCrop] = useState('Tomatoes');
  const [quantity, setQuantity] = useState('');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!crop || !quantity || !expectedPrice) return;
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setSubmitted(false), 300); // reset state after close
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        />
      )}
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20"
        >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Listing Created!</h3>
                <p className="text-gray-500 mb-6">
                  Your {quantity}kg of {crop} has been listed on the marketplace. Buyers will contact you shortly.
                </p>
                <button
                  onClick={handleClose}
                  className="w-full rounded-lg bg-gray-100 py-3 text-gray-800 font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <ShoppingCart className="text-green-600 w-6 h-6" />
                  Sell Crops Online
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  List your harvested crops directly to buyers and secure fair market pricing.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Crop</label>
                    <select
                      value={crop}
                      onChange={(e) => setCrop(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 py-2.5 px-3 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-white"
                    >
                      <option value="Tomatoes">Tomatoes</option>
                      <option value="Potatoes">Potatoes</option>
                      <option value="Onions">Onions</option>
                      <option value="Wheat">Wheat</option>
                      <option value="Rice">Rice</option>
                      <option value="Corn">Corn</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Available Quantity (in kg)</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g., 500"
                      className="w-full rounded-lg border border-gray-300 py-2.5 px-3 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Price (₹ per kg)</label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        value={expectedPrice}
                        onChange={(e) => setExpectedPrice(e.target.value)}
                        placeholder="e.g., 25"
                        className="w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-3 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 rounded-lg bg-green-600 py-3 text-white font-medium hover:bg-green-700 transition-colors shadow-md hover:shadow-lg active:scale-[0.98]"
                  >
                    Post Marketplace Listing
                  </button>
                </form>
              </>
            )}
          </motion.div>
      )}
    </AnimatePresence>
  );
}

import React from 'react';
import { LineChart, Search, TrendingUp, Store, Tractor, ShieldCheck } from 'lucide-react';
import { useToast } from '../ToastContext';

export function MarketplaceView() {
  const { showToast } = useToast();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-display text-gray-900">Agri Marketplace & Market Intelligence</h2>
        <p className="text-gray-500 mt-2">Buy supplies, sell produce, rent equipment, and track real-time mandi prices.</p>
      </div>

      {/* Market Intelligence */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2"><TrendingUp className="text-blue-600" /> Market Price Forecast</h3>
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search crops..." className="bg-transparent border-none focus:outline-none text-sm w-32" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
           <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50 flex flex-col items-center text-center">
             <div className="text-lg font-medium text-gray-900">Wheat (Local Mandi)</div>
             <div className="text-3xl font-bold text-gray-900 mt-2">₹2,250<span className="text-sm font-normal text-gray-500"> / quintal</span></div>
             <div className="text-green-600 text-sm font-medium mt-1 flex items-center justify-center gap-1"><TrendingUp className="w-4 h-4" /> Predicted to rise 5% next week</div>
             <button onClick={() => showToast('Opening sell listing dialog...')} className="mt-4 w-full bg-blue-600 text-white rounded-xl py-2 font-medium hover:bg-blue-700 transition">Sell Now</button>
           </div>
           
           <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50 flex flex-col items-center text-center">
             <div className="text-lg font-medium text-gray-900">Rice (Basmati)</div>
             <div className="text-3xl font-bold text-gray-900 mt-2">₹3,800<span className="text-sm font-normal text-gray-500"> / quintal</span></div>
             <div className="text-red-500 text-sm font-medium mt-1 flex items-center justify-center gap-1"><LineChart className="w-4 h-4" /> Stable demand</div>
             <button onClick={() => showToast('Added to watchlist.', 'info')} className="mt-4 w-full border border-blue-600 text-blue-600 rounded-xl py-2 font-medium hover:bg-blue-50 transition">Hold</button>
           </div>

           <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50 flex flex-col items-center text-center">
             <div className="text-lg font-medium text-gray-900">Tomatoes</div>
             <div className="text-3xl font-bold text-gray-900 mt-2">₹1,200<span className="text-sm font-normal text-gray-500"> / quintal</span></div>
             <div className="text-red-600 text-sm font-medium mt-1 flex items-center justify-center gap-1"><TrendingUp className="w-4 h-4 rotate-180" /> Prices crashing, sell immediately</div>
             <button onClick={() => showToast('Opening emergency sell order dialog...')} className="mt-4 w-full bg-blue-600 text-white rounded-xl py-2 font-medium hover:bg-blue-700 transition">Sell Now</button>
           </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Buy & Sell */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-6"><Store className="text-green-600" /> Peer-to-Peer Agri Market</h3>
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">SM</div>
                <div>
                  <div className="font-semibold text-gray-900">High-Yield Wheat Seeds</div>
                  <div className="text-sm text-gray-500">Sold by verified supplier</div>
                </div>
              </div>
              <div className="font-bold text-gray-900">₹800/bag</div>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold">NK</div>
                <div>
                  <div className="font-semibold text-gray-900">Organic Compost</div>
                  <div className="text-sm text-gray-500">Local farmer producing excess</div>
                </div>
              </div>
              <div className="font-bold text-gray-900">₹400/ton</div>
            </div>
          </div>
          <button onClick={() => showToast('Loading trade listings...')} className="w-full mt-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition">Browse Trade Listings</button>
        </div>

        {/* Equipment Rental */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-6"><Tractor className="text-orange-600" /> Equipment Rental Hub</h3>
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center text-gray-600"><Tractor className="w-6 h-6" /></div>
                <div>
                  <div className="font-semibold text-gray-900">Mahindra 575 DI Tractor</div>
                  <div className="text-sm text-gray-500 flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-green-600" /> Verified Owner • 5km away</div>
                </div>
              </div>
              <div className="font-bold text-gray-900">₹600/hr</div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center text-gray-600"><Tractor className="w-6 h-6" /></div>
                <div>
                  <div className="font-semibold text-gray-900">Rotavator Attachment</div>
                  <div className="text-sm text-gray-500 flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-green-600" /> Verified Owner • 12km away</div>
                </div>
              </div>
              <div className="font-bold text-gray-900">₹200/hr</div>
            </div>
          </div>
          <button className="w-full mt-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition">View All Equipment</button>
        </div>
      </div>
    </div>
  );
}

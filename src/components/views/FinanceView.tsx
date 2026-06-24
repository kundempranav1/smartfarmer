import React from 'react';
import { Landmark, ShieldCheck, IndianRupee, TrendingUp, Calculator } from 'lucide-react';
import { useToast } from '../ToastContext';

export function FinanceView() {
  const { showToast } = useToast();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold font-display text-gray-900">Financial Services & Subsidies</h2>
        <p className="text-gray-500 mt-2">Check eligibility for loans, manage crop insurance, and discover government schemes.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-green-600 to-emerald-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-semibold opacity-90 mb-1">AI Credit Score</h3>
            <div className="text-5xl font-bold font-display mb-4">742</div>
            <p className="opacity-80 mb-6 text-sm max-w-sm">Calculated using your yield history, repayment records, and satellite-verified land health.</p>
            <div className="flex gap-4">
              <button onClick={() => showToast('Opening ways to improve score...', 'info')} className="bg-white text-green-800 px-5 py-2.5 rounded-full font-medium hover:bg-green-50 transition shadow-sm">Improve Score</button>
              <button onClick={() => showToast('Downloading credit report...')} className="bg-green-700/50 backdrop-blur-sm border border-green-400/30 text-white px-5 py-2.5 rounded-full font-medium hover:bg-green-700 transition">View Report</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex items-center justify-between flex-col md:flex-row gap-6">
           <div>
             <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2"><Calculator className="text-blue-600" /> EMI Calculator</h3>
             <p className="text-gray-500 text-sm mb-4">Plan your tractor or equipment loan repayments.</p>
             <div className="space-y-3">
               <div>
                 <label className="text-xs font-semibold text-gray-500 uppercase">Loan Amount (₹)</label>
                 <input type="range" className="w-full accent-blue-600" />
               </div>
               <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Tenure (Years)</label>
                 <input type="range" className="w-full accent-blue-600" />
               </div>
             </div>
           </div>
           <div className="bg-blue-50 p-6 rounded-2xl min-w-[150px] text-center border border-blue-100">
              <div className="text-sm font-semibold text-blue-800 mb-1">Est. EMI</div>
              <div className="text-3xl font-bold text-blue-900">₹8,450</div>
              <div className="text-xs text-blue-600 mt-1">/ month</div>
           </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:-translate-y-1 transition-all duration-300">
           <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
             <Landmark className="w-6 h-6" />
           </div>
           <h4 className="text-lg font-semibold text-gray-900 mb-2">Pre-Approved Loans</h4>
           <p className="text-gray-500 text-sm mb-4">You are eligible for a KCC loan up to ₹3,00,000 at 4% interest.</p>
           <button onClick={() => showToast('Connecting to banking portal...')} className="text-blue-600 font-medium text-sm hover:underline">Apply Now →</button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:-translate-y-1 transition-all duration-300">
           <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
             <ShieldCheck className="w-6 h-6" />
           </div>
           <h4 className="text-lg font-semibold text-gray-900 mb-2">Crop Insurance (PMFBY)</h4>
           <p className="text-gray-500 text-sm mb-4">Active policy for Kharif 2024. Next premium due in 45 days.</p>
           <button onClick={() => showToast('Opening policy management dashboard...')} className="text-purple-600 font-medium text-sm hover:underline">Manage Policy →</button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:-translate-y-1 transition-all duration-300">
           <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
             <IndianRupee className="w-6 h-6" />
           </div>
           <h4 className="text-lg font-semibold text-gray-900 mb-2">Govt. Subsidies</h4>
           <p className="text-gray-500 text-sm mb-4">2 new equipment subsidies matching your profile are available.</p>
           <button onClick={() => showToast('Loading eligible schemes...')} className="text-emerald-600 font-medium text-sm hover:underline">View Schemes →</button>
        </div>
      </div>
    </div>
  );
}

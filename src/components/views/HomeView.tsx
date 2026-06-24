import React from 'react';
import { Sparkles, Leaf, Cloud, ChartLine, ArrowUp, ArrowDown, TestTubeDiagonal, Droplets, FlaskConical, Upload, ShoppingCart, Landmark, IndianRupee, ShieldCheck, MessageSquare } from 'lucide-react';
import { useToast } from '../ToastContext';
import { useLanguage } from '../LanguageContext';

interface HomeViewProps {
  openAuth: (mode: 'signin' | 'signup') => void;
  setIsMarketOpen: (isOpen: boolean) => void;
  setIsSoilOpen: (isOpen: boolean) => void;
}

export function HomeView({ openAuth, setIsMarketOpen, setIsSoilOpen }: HomeViewProps) {
  const { showToast } = useToast();
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <div className="grid gap-12 md:gap-16 lg:gap-24">
        
        {/* Hero Section */}
        <section className="w-full pt-8 pb-12 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <div className="inline-flex items-center justify-center bg-white/60 backdrop-blur-md border border-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 mr-2" /> {t.futureFarming}
            </div>
            <h2 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-gray-900 mb-6 font-display leading-[1.1]">
              {t.farmSmarter} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                {t.precisionAI}
              </span>
            </h2>
            <p className="text-gray-500 text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
              {t.heroDesc}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => openAuth('signup')} className="w-full sm:w-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold text-lg transition-all shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_30px_rgba(22,163,74,0.5)] hover:-translate-y-1">
                {t.getStartedFree}
              </button>
              <button onClick={() => showToast('Opening guided interactive tour...', 'info')} className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-800 rounded-full font-semibold text-lg border border-gray-200 transition-all hover:border-gray-300 shadow-sm flex items-center justify-center gap-2">
                <Leaf className="w-5 h-5 text-green-600" /> {t.viewDemo}
              </button>
            </div>
          </div>
        </section>

        {/* Highlight Section */}
        <section className="w-full">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-3xl font-bold font-display text-gray-900">{t.realTimeAnalytics}</h3>
            <p className="text-gray-500 mt-4 text-lg">{t.monitorEverything}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Weather Card */}
            <div className="rounded-2xl border border-white/20 bg-white/70 backdrop-blur-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col p-6 hover:shadow-[0_8px_30px_rgb(22,163,74,0.1)] transition-all duration-300 hover:-translate-y-1">
              <div className="text-xl font-display font-semibold flex items-center gap-2 mb-2 text-gray-900">
                <Cloud className="text-green-600 w-6 h-6" />
                Hyper-Local Weather
              </div>
              <div className="text-sm text-gray-500 mb-6">Current location weather advisory.</div>
              <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-blue-50/80 to-blue-100/50 rounded-xl border border-blue-100/50 p-6 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-5xl font-display font-bold text-blue-900">28°C</div>
                  <div className="text-blue-700 font-medium mt-2">Partly Cloudy</div>
                  <div className="text-sm text-blue-600 mt-2 bg-blue-100/50 px-3 py-1 rounded-full">Good day for spraying pesticides</div>
                </div>
              </div>
            </div>

            {/* Market Pricing Card */}
            <div className="rounded-2xl border border-white/20 bg-white/70 backdrop-blur-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col p-0 overflow-hidden hover:shadow-[0_8px_30px_rgb(22,163,74,0.1)] transition-all duration-300 hover:-translate-y-1">
              <div className="p-6 pb-4">
                <div className="text-xl font-display font-semibold flex items-center gap-2 text-gray-900">
                  <ChartLine className="text-green-600 w-6 h-6" />
                  Market Access
                </div>
              </div>
              <div className="flex-grow">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 border-y text-gray-500 font-medium">
                    <tr>
                      <th className="px-6 py-3">Crop</th>
                      <th className="px-6 py-3 text-right">Price</th>
                      <th className="px-6 py-3 text-right">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Tomatoes</td>
                      <td className="px-6 py-4 text-right">₹25/kg</td>
                      <td className="px-6 py-4 text-right"><ArrowUp className="w-4 h-4 inline text-green-500" /></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Wheat</td>
                      <td className="px-6 py-4 text-right">₹20/kg</td>
                      <td className="px-6 py-4 text-right"><ArrowDown className="w-4 h-4 inline text-red-500" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-gray-50 border-t">
                <button 
                  onClick={() => setIsMarketOpen(true)}
                  className="w-full flex items-center justify-center bg-green-600 text-white hover:bg-green-700 py-2 rounded-lg font-medium transition shadow-sm hover:shadow-md active:scale-[0.98]"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Sell Crops Online
                </button>
              </div>
            </div>

            {/* Soil Health Card */}
            <div className="rounded-2xl border border-white/20 bg-white/70 backdrop-blur-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col p-6 hover:shadow-[0_8px_30px_rgb(22,163,74,0.1)] transition-all duration-300 hover:-translate-y-1">
              <div className="text-xl font-display font-semibold flex items-center gap-2 mb-2 text-gray-900">
                <TestTubeDiagonal className="text-green-600 w-6 h-6" />
                Soil Health
              </div>
              <div className="text-sm text-gray-500 mb-6">AI-powered analysis of your soil based on region.</div>
              
              <div className="space-y-5 flex-grow">
                <div>
                  <div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
                    <span className="flex items-center gap-1.5"><Droplets className="w-4 h-4 text-green-600" /> Moisture</span>
                    <span>65.0%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
                    <span className="flex items-center gap-1.5"><TestTubeDiagonal className="w-4 h-4 text-green-600" /> pH Level</span>
                    <span>6.8</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '48%' }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button 
                  onClick={() => setIsSoilOpen(true)}
                  className="w-full flex items-center justify-center bg-green-50 text-green-700 hover:bg-green-100 py-2 border border-green-200 rounded-lg font-medium transition active:scale-[0.98]"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Analyze Soil Report
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

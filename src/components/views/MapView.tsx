import React from 'react';
import { Map as MapIcon, Navigation, Crosshair, Radar, Layers } from 'lucide-react';
import { useToast } from '../ToastContext';

export function MapView() {
  const { showToast } = useToast();

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-bold font-display text-gray-900">Interactive Farm Map & Satellite</h2>
        <p className="text-gray-500 mt-2">Monitor farm boundaries, NDVI indices, and field stresses.</p>
      </div>

      <div className="flex-1 bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden relative shadow-inner flex">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto z-10 flex flex-col gap-4">
          <button onClick={() => showToast('NDVI layer activated.', 'info')} className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-green-50 rounded-xl border border-gray-100 transition-colors text-left">
            <Layers className="w-5 h-5 text-green-600" />
            <div>
              <div className="font-medium text-gray-900">NDVI Vegetation Index</div>
              <div className="text-xs text-gray-500">Updated 2 days ago</div>
            </div>
          </button>
          
          <button onClick={() => showToast('Crop Stress Detection running...', 'info')} className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-orange-50 rounded-xl border border-gray-100 transition-colors text-left">
            <Radar className="w-5 h-5 text-orange-600" />
            <div>
              <div className="font-medium text-gray-900">Crop Stress Detection</div>
              <div className="text-xs text-gray-500">View problem hotspots</div>
            </div>
          </button>

          <button onClick={() => showToast('Irrigation zones displayed.', 'info')} className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-blue-50 rounded-xl border border-gray-100 transition-colors text-left">
            <Navigation className="w-5 h-5 text-blue-600" />
            <div>
              <div className="font-medium text-gray-900">Irrigation Zones</div>
              <div className="text-xs text-gray-500">Soil moisture mapping</div>
            </div>
          </button>

          <button onClick={() => showToast('GPS drawing tool enabled.', 'info')} className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-purple-50 rounded-xl border border-gray-100 transition-colors text-left mt-auto">
            <Crosshair className="w-5 h-5 text-purple-600" />
            <div>
              <div className="font-medium text-gray-900">Plot Farm Location</div>
              <div className="text-xs text-gray-500">GPS boundary drawing</div>
            </div>
          </button>
        </div>

        {/* Map Area Mockup */}
        <div className="flex-1 right-0 top-0 bottom-0 bg-[url('https://images.unsplash.com/photo-1586771107445-d3afeb0dece5?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center relative group">
          <div className="absolute inset-0 bg-green-500/10 mix-blend-multiply transition-all duration-700 group-hover:bg-transparent"></div>
          
          {/* Mock Overlays */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/40 rounded-full blur-xl animate-pulse flex items-center justify-center">
             <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap hidden group-hover:block transition-all">Pest Hotspot</span>
          </div>
          
          <div className="absolute bottom-1/4 right-1/3 w-64 h-48 border-2 border-white/50 bg-green-400/20 rounded shadow-[0_0_15px_rgba(7ade80,0.5)] flex items-center justify-center backdrop-blur-sm">
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap shadow-sm">Field A (Healthy)</span>
          </div>

          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-200">
             <div className="font-semibold text-gray-900 mb-2">Weekly Satellite Report</div>
             <p className="text-sm text-gray-600">No major anomalies detected. Overall health is good.</p>
             <button className="mt-2 text-sm text-green-600 font-medium hover:underline">Download PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
}

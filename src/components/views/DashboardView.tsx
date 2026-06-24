import React from 'react';
import { Activity, Droplets, Leaf, Sprout, Wind, Calendar, Award } from 'lucide-react';
import { useToast } from '../ToastContext';

export function DashboardView() {
  const { showToast } = useToast();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-display text-gray-900">Smart Farm Dashboard</h2>
        <p className="text-gray-500 mt-2">Monitor your farm health, water usage, and crop lifecycle.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-xl">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900">Farm Health Score</h3>
          </div>
          <div className="text-4xl font-bold text-gray-900 mb-2">92<span className="text-lg text-gray-500 font-normal">/100</span></div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
          </div>
          <p className="text-sm text-green-600 mt-2">↑ 4% from last week</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900">Water Usage Analytics</h3>
          </div>
          <div className="text-4xl font-bold text-gray-900 mb-2">1,240<span className="text-lg text-gray-500 font-normal"> L</span></div>
          <p className="text-sm text-gray-500 mb-2">Saved 15% via smart irrigation</p>
          <button onClick={() => showToast('Opening full irrigation schedule...', 'info')} className="text-sm text-blue-600 font-medium hover:underline">View Schedule →</button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900">Yield Prediction</h3>
          </div>
          <div className="text-4xl font-bold text-gray-900 mb-2">4.2<span className="text-lg text-gray-500 font-normal"> Tons</span></div>
          <p className="text-sm text-gray-500">Estimated for upcoming harvest</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-gray-500" /> Crop Lifecycle Management</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
              <div>
                <div className="font-medium text-gray-900">Fertilizer Schedule</div>
                <div className="text-sm text-gray-500">Apply NPK to Field B tomorrow morning.</div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
              <div>
                <div className="font-medium text-gray-900">Irrigation Alert</div>
                <div className="text-sm text-gray-500">Rain expected today. Irrigation paused.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Wind className="w-5 h-5 text-gray-500" /> Carbon Footprint Monitoring</h3>
           <div className="flex items-center justify-center p-6 bg-green-50 rounded-xl border border-green-100">
             <div className="text-center">
                <Leaf className="w-10 h-10 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-700">-120 kg CO2</div>
                <p className="text-sm text-green-600 mt-1">Carbon offset this month</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

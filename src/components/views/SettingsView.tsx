import React, { useState } from 'react';
import { Bell, Shield, User, Globe, Moon, Smartphone, CheckSquare, Square } from 'lucide-react';
import { useToast } from '../ToastContext';

const Toggle = ({ label, description, defaultChecked }: { label: string, description: string, defaultChecked?: boolean }) => {
  const [checked, setChecked] = useState(defaultChecked || false);
  return (
    <div className="flex items-start justify-between py-4 border-b border-gray-100 last:border-0 cursor-pointer" onClick={() => setChecked(!checked)}>
      <div>
        <div className="font-medium text-gray-900">{label}</div>
        <div className="text-sm text-gray-500 mt-1">{description}</div>
      </div>
      <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${checked ? 'bg-green-500' : 'bg-gray-200'}`}>
        <div className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
      </div>
    </div>
  );
};

export function SettingsView() {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications'>('profile');
  const { showToast } = useToast();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-3xl font-bold font-display text-gray-900">Settings</h2>
        <p className="text-gray-500 mt-2">Manage your preferences, smart notifications, and account details.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 font-medium rounded-xl transition-colors text-left ${activeTab === 'profile' ? 'bg-white text-green-700 shadow-sm border border-gray-100' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
          >
            <User className="w-5 h-5" /> Profile Settings
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 font-medium rounded-xl transition-colors text-left ${activeTab === 'notifications' ? 'bg-white text-green-700 shadow-sm border border-gray-100' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
          >
            <Bell className="w-5 h-5" /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium rounded-xl transition-colors text-left">
            <Globe className="w-5 h-5" /> Language & Region
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8">
           {activeTab === 'profile' && (
             <>
               <h3 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-4">Profile Information</h3>
               <div className="space-y-6">
                 <div className="flex items-center gap-6">
                   <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-2xl border-4 border-white shadow-sm">
                     PV
                   </div>
                   <button onClick={() => showToast('Opening file picker...')} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition">Change Avatar</button>
                 </div>

                 <div className="grid md:grid-cols-2 gap-4">
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input type="text" defaultValue="Pranav Venkat" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all" />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
                      <input type="text" defaultValue="Green Valley Farms" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all" />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input type="email" defaultValue="pranavvenkat2005@gmail.com" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none cursor-not-allowed opacity-70" disabled />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input type="tel" defaultValue="+91 98765 43210" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all" />
                   </div>
                 </div>

                 <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                   <button onClick={() => showToast('Profile settings saved successfully!')} className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition shadow-sm">Save Changes</button>
                 </div>
               </div>
             </>
           )}

           {activeTab === 'notifications' && (
             <>
               <h3 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-4">Smart Notifications</h3>
               <div className="space-y-2">
                 <Toggle label="Weather Alerts" description="Get notified about rain, storms, or extreme temperatures." defaultChecked={true} />
                 <Toggle label="Disease Alerts" description="Receive warnings about regional crop disease outbreaks." defaultChecked={true} />
                 <Toggle label="Market Price Alerts" description="Alerts when crop prices reach your target in local mandis." defaultChecked={true} />
                 <Toggle label="Government Scheme Updates" description="Notifications when new subsidies or schemes match your profile." defaultChecked={false} />
                 <Toggle label="Irrigation Reminders" description="AI-driven reminders to water crops based on soil moisture levels." defaultChecked={true} />
                 <Toggle label="Task & Sowing Reminders" description="Calendar reminders for sowing, fertilizing, and harvesting." defaultChecked={false} />
               </div>
             </>
           )}
        </div>
      </div>
    </div>
  );
}

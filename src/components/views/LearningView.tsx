import React from 'react';
import { BookOpen, Video, Award, Medal, CheckCircle2, PlayCircle } from 'lucide-react';
import { useToast } from '../ToastContext';

export function LearningView() {
  const { showToast } = useToast();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-display text-gray-900">Learning Center & Rewards</h2>
        <p className="text-gray-500 mt-2">Master modern farming techniques and earn rewards for sustainable practices.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Learning Center */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><BookOpen className="text-blue-500" /> Featured Courses</h3>
            <button onClick={() => showToast('Loading all courses...')} className="text-sm font-medium text-blue-600 hover:underline">View All</button>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div onClick={() => showToast('Opening video player...')} className="bg-white rounded-2xl border border-gray-200 overflow-hidden group hover:shadow-lg transition-all cursor-pointer">
              <div className="h-40 bg-gray-200 relative">
                 <img src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=800" alt="Irrigation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-12 h-12 text-white" />
                 </div>
              </div>
              <div className="p-5">
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Water Management</div>
                <h4 className="font-bold text-gray-900 mb-2 leading-tight">Mastering Drip Irrigation Systems</h4>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">Learn how to install, maintain, and optimize drip systems to save water and boost yields.</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>6 Video Lessons</span>
                  <span>1.5 Hours</span>
                </div>
              </div>
            </div>

            <div onClick={() => showToast('Opening video player...')} className="bg-white rounded-2xl border border-gray-200 overflow-hidden group hover:shadow-lg transition-all cursor-pointer">
              <div className="h-40 bg-gray-200 relative">
                 <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800" alt="Organic Farming" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-12 h-12 text-white" />
                 </div>
              </div>
              <div className="p-5">
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Sustainable Practices</div>
                <h4 className="font-bold text-gray-900 mb-2 leading-tight">Transitioning to Organic Farming</h4>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">A complete guide to certification, soil restoration, and natural pest control.</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>10 Video Lessons</span>
                  <span>3 Hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Farmer Rewards Program */}
        <div>
           <div className="bg-gradient-to-b from-amber-50 to-white rounded-3xl p-6 border border-amber-100 shadow-sm h-full">
             <div className="flex items-center gap-3 mb-6">
                <div className="bg-amber-100 p-2 rounded-xl text-amber-600">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Farmer Rewards</h3>
             </div>

             <div className="text-center mb-8">
               <div className="text-5xl font-display font-bold text-amber-500 drop-shadow-sm mb-2">2,450</div>
               <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">Available Points</div>
               <p className="text-xs text-gray-400 mt-2">Rank: <b>Master Grower</b> (Top 5% in your state)</p>
             </div>

             <div className="space-y-4 mb-6">
               <h4 className="text-sm font-bold text-gray-900">Recent Achievements</h4>
               <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm transition-transform hover:-translate-y-1">
                 <Award className="w-8 h-8 text-blue-500" />
                 <div>
                   <div className="font-semibold text-sm text-gray-900">Water Saver Level 2</div>
                   <div className="text-xs text-gray-500">Saved 10,000L of water. (+500 pts)</div>
                 </div>
               </div>
               <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm transition-transform hover:-translate-y-1">
                 <Medal className="w-8 h-8 text-green-500" />
                 <div>
                   <div className="font-semibold text-sm text-gray-900">Organic Adopter</div>
                   <div className="text-xs text-gray-500">Purchased 100% organic fertilizer. (+200 pts)</div>
                 </div>
               </div>
             </div>

             <button onClick={() => showToast('Opening rewards catalog...')} className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold shadow-sm transition-colors">
               Redeem Points
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from './components/AuthModal';
import SoilAnalyzerModal from './components/SoilAnalyzerModal';
import MarketplaceModal from './components/MarketplaceModal';
import { useToast } from './components/ToastContext';
import { useLanguage } from './components/LanguageContext';

// Views
import { HomeView } from './components/views/HomeView';
import { DashboardView } from './components/views/DashboardView';
import { MapView } from './components/views/MapView';
import { AssistantView } from './components/views/AssistantView';
import { MarketplaceView } from './components/views/MarketplaceView';
import { FinanceView } from './components/views/FinanceView';
import { LearningView } from './components/views/LearningView';
import { SettingsView } from './components/views/SettingsView';

import { 
  Leaf, Globe, ChevronDown, PanelLeft, Bot, Activity, Map, Store, Settings,
  MessageSquare, Mail, User, BookOpen, Landmark
} from 'lucide-react';

const NavButton = ({ view, currentView, setCurrentView, icon: Icon, label }: { view: any, currentView: any, setCurrentView: any, icon: any, label: string }) => (
  <button 
    onClick={() => setCurrentView(view)} 
    className={`flex items-center gap-2 px-3 py-2 rounded-full font-medium transition-colors ${currentView === view ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'}`}
  >
    <Icon className="w-4 h-4" />
    <span className="hidden xl:block">{label}</span>
    <span className="xl:hidden">{label?.split(' ')[0]}</span>
  </button>
);

export default function App() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isSoilOpen, setIsSoilOpen] = useState(false);
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'map' | 'assistant' | 'market' | 'finance' | 'learning' | 'settings'>('home');
  const { language, setLanguage, t } = useLanguage();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 scroll-smooth flex flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <button className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 text-gray-700 lg:hidden transition-colors">
              <PanelLeft className="w-5 h-5" />
            </button>
            <button onClick={() => setCurrentView('home')} className="flex items-center gap-2 group cursor-pointer focus:outline-none">
              <div className="bg-green-100 p-1.5 rounded-xl group-hover:bg-green-200 transition-colors">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900 hidden sm:block">FarmFriend</h1>
            </button>
          </div>
          
          <nav className="hidden lg:flex items-center gap-2 text-sm font-medium">
            <NavButton view="dashboard" currentView={currentView} setCurrentView={setCurrentView} icon={Activity} label={t.dashboard} />
            <NavButton view="assistant" currentView={currentView} setCurrentView={setCurrentView} icon={Bot} label={t.assistant} />
            <NavButton view="map" currentView={currentView} setCurrentView={setCurrentView} icon={Map} label={t.farmMap} />
            <NavButton view="market" currentView={currentView} setCurrentView={setCurrentView} icon={Store} label={t.marketplace} />
            <NavButton view="finance" currentView={currentView} setCurrentView={setCurrentView} icon={Landmark} label={t.financials} />
            <NavButton view="learning" currentView={currentView} setCurrentView={setCurrentView} icon={BookOpen} label={t.learningHub} />
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block" ref={langMenuRef}>
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex h-9 items-center justify-between rounded-full border border-gray-200 bg-white px-3 py-1 text-sm gap-2 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
              >
                <Globe className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700 font-medium">{language}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  {[
                    { code: 'EN', label: 'English' },
                    { code: 'HI', label: 'हिंदी' },
                    { code: 'TA', label: 'தமிழ்' },
                    { code: 'TE', label: 'తెలుగు' }
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setIsLangMenuOpen(false);
                        showToast(`Language changed to ${lang.label}`);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${language === lang.code ? 'text-green-600 font-medium bg-green-50' : 'text-gray-700'}`}
                    >
                      {lang.label} ({lang.code})
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-2 relative group">
                  <button onClick={() => setCurrentView('settings')} className="text-sm font-medium text-gray-700 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-1.5 rounded-full cursor-pointer focus:outline-none">
                    <User className="h-4 w-4 text-green-600" />
                    {user.name}
                  </button>
                  <button 
                    onClick={() => {
                      setUser(null);
                      showToast('Logged out successfully');
                      setCurrentView('home');
                    }}
                    className="inline-flex items-center justify-center text-sm font-medium text-gray-500 hover:text-red-600 transition-colors px-2"
                  >
                    {t.logout}
                  </button>
                </div>
              ) : (
                <>
                  <button onClick={() => openAuth('signin')} className="inline-flex items-center justify-center rounded-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-9 px-4 transition-colors">
                    {t.signIn}
                  </button>
                  <button onClick={() => openAuth('signup')} className="inline-flex items-center justify-center rounded-full text-sm font-medium bg-green-600 text-white hover:bg-green-700 h-9 px-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-95">
                    {t.signUp}
                  </button>
                </>
              )}
            </div>
            {/* Mobile Settings Icon */}
            {user && (
              <button onClick={() => setCurrentView('settings')} className="lg:hidden p-2 text-gray-600 hover:text-green-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 relative flex flex-col overflow-x-hidden">
        {/* Cinematic Background Elements - Only fully show on Home */}
        {currentView === 'home' && (
          <div className="absolute inset-0 z-[-1] pointer-events-none fade-in">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-400/20 rounded-full blur-[100px]" />
            <div className="absolute top-40 -left-40 w-96 h-96 bg-emerald-400/20 rounded-full blur-[100px]" />
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            {currentView === 'home' && <HomeView openAuth={openAuth} setIsMarketOpen={setIsMarketOpen} setIsSoilOpen={setIsSoilOpen} />}
            {currentView === 'dashboard' && <DashboardView />}
            {currentView === 'map' && <MapView />}
            {currentView === 'assistant' && <AssistantView />}
            {currentView === 'market' && <MarketplaceView />}
            {currentView === 'finance' && <FinanceView />}
            {currentView === 'learning' && <LearningView />}
            {currentView === 'settings' && <SettingsView />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-gray-900 text-white pt-16 pb-8 mt-12 border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <button onClick={() => setCurrentView('home')} className="flex items-center gap-2 mb-4 focus:outline-none">
                <div className="bg-green-500/20 p-2 rounded-xl">
                  <Leaf className="h-6 w-6 text-green-400" />
                </div>
                <span className="font-bold font-display text-2xl tracking-tight text-white">FarmFriend</span>
              </button>
              <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
                {t.footerDesc}
              </p>
              <div className="flex items-center gap-4">
                <button onClick={() => showToast('Connecting to global server...')} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500/20 hover:text-green-400 transition-colors">
                  <Globe className="w-5 h-5" />
                </button>
                <button onClick={() => showToast('Opening feedback form...')} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500/20 hover:text-green-400 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </button>
                <button onClick={() => showToast('Opening support email...', 'info')} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500/20 hover:text-green-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-100 mb-4">{t.platform}</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><button onClick={() => setCurrentView('assistant')} className="hover:text-white transition-colors">AI Crop Doctor</button></li>
                <li><button onClick={() => setCurrentView('assistant')} className="hover:text-white transition-colors">Season Predictor</button></li>
                <li><button onClick={() => setCurrentView('dashboard')} className="hover:text-white transition-colors">Soil Analytics</button></li>
                <li><button onClick={() => setCurrentView('market')} className="hover:text-white transition-colors">Farm Marketplace</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-100 mb-4">{t.resources}</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><button onClick={() => setCurrentView('learning')} className="hover:text-white transition-colors">{t.communityHub}</button></li>
                <li><button onClick={() => setCurrentView('learning')} className="hover:text-white transition-colors">{t.farmingBestPractices}</button></li>
                <li><button onClick={() => setCurrentView('finance')} className="hover:text-white transition-colors">{t.governmentSchemes}</button></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.apiDocumentation}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-100 mb-4">{t.company}</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t.aboutUs}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.careers}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.privacyPolicy}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.termsOfService}</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} FarmFriend Inc. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> English (US)</span>
            </div>
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode={authMode} 
        onLogin={(userData) => {
          setUser(userData);
          setCurrentView('dashboard');
          showToast('Authentication successful!');
        }} 
      />
      <SoilAnalyzerModal 
        isOpen={isSoilOpen} 
        onClose={() => setIsSoilOpen(false)} 
      />
      <MarketplaceModal 
        isOpen={isMarketOpen} 
        onClose={() => setIsMarketOpen(false)} 
      />
    </div>
  );
}

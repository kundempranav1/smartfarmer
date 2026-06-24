import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'EN' | 'HI' | 'TA' | 'TE';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

export const translations = {
  EN: {
    dashboard: "Dashboard",
    assistant: "AI Assistant",
    farmMap: "Farm Map",
    marketplace: "Marketplace",
    financials: "Financials",
    learningHub: "Learning Hub",
    signIn: "Sign In",
    signUp: "Sign Up",
    logout: "Logout",
    footerDesc: "The world's most advanced AI-powered agricultural platform designed specifically for modern farmers to maximize yield and optimize resources.",
    platform: "Platform",
    resources: "Resources",
    communityHub: "Community Hub",
    farmingBestPractices: "Farming Best Practices",
    governmentSchemes: "Government Schemes",
    apiDocumentation: "API Documentation",
    company: "Company",
    aboutUs: "About Us",
    careers: "Careers",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    futureFarming: "The Future of Farming is Here",
    farmSmarter: "Farm Smarter With",
    precisionAI: "Precision AI Intelligence",
    heroDesc: "Maximize yields, predict seasons, and connect with global markets. Your world-class agricultural operating system.",
    getStartedFree: "Get Started Free",
    viewDemo: "View Demo",
    realTimeAnalytics: "Real-Time Farm Analytics",
    monitorEverything: "Monitor everything from hyper-local weather to real-time market pricing."
  },
  HI: {
    dashboard: "डैशबोर्ड",
    assistant: "AI सहायक",
    farmMap: "खेत का नक्शा",
    marketplace: "बाज़ार",
    financials: "वित्तीय",
    learningHub: "लर्निंग हब",
    signIn: "साइन इन",
    signUp: "साइन अप",
    logout: "लॉग आउट",
    footerDesc: "आधुनिक किसानों के लिए विशेष रूप से डिज़ाइन किया गया दुनिया का सबसे उन्नत AI-संचालित कृषि मंच।",
    platform: "मंच",
    resources: "संसाधन",
    communityHub: "सामुदायिक हब",
    farmingBestPractices: "खेती के सर्वोत्तम तरीके",
    governmentSchemes: "सरकारी योजनाएं",
    apiDocumentation: "API दस्तावेज़ीकरण",
    company: "कंपनी",
    aboutUs: "हमारे बारे में",
    careers: "करियर",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें",
    futureFarming: "खेती का भविष्य यहाँ है",
    farmSmarter: "के साथ स्मार्ट खेती करें",
    precisionAI: "सटीक AI इंटेलिजेंस",
    heroDesc: "पैदावार अधिकतम करें, मौसम की भविष्यवाणी करें और वैश्विक बाजारों से जुड़ें। आपका विश्व स्तरीय कृषि ऑपरेटिंग सिस्टम।",
    getStartedFree: "मुफ्त में शुरू करें",
    viewDemo: "डेमो देखें",
    realTimeAnalytics: "रियल-टाइम कृषि एनालिटिक्स",
    monitorEverything: "हाइपर-लोकल मौसम से लेकर रियल-टाइम बाजार मूल्य निर्धारण तक हर चीज की निगरानी करें।"
  },
  TA: {
    dashboard: "கட்டுப்பாட்டு அறை",
    assistant: "AI உதவியாளர்",
    farmMap: "பண்ணை வரைபடம்",
    marketplace: "சந்தை",
    financials: "நிதியியல்",
    learningHub: "கற்றல் மையம்",
    signIn: "உள்நுழைக",
    signUp: "பதிவு செய்க",
    logout: "வெளியேறு",
    footerDesc: "நவீன விவசாயிகளுக்காக பிரத்யேகமாக வடிவமைக்கப்பட்ட உலகின் மிக மேம்பட்ட AI-இயக்கப்படும் விவசாய தளம்.",
    platform: "தளம்",
    resources: "வளங்கள்",
    communityHub: "சமூக மையம்",
    farmingBestPractices: "விவசாய நடைமுறைகள்",
    governmentSchemes: "அரசு திட்டங்கள்",
    apiDocumentation: "API ஆவணம்",
    company: "நிறுவனம்",
    aboutUs: "எங்களை பற்றி",
    careers: "வேலைவாய்ப்புகள்",
    privacyPolicy: "தனியுரிமை கொள்கை",
    termsOfService: "சேவை விதிமுறைகள்",
    futureFarming: "விவசாயத்தின் எதிர்காலம் இங்கே",
    farmSmarter: "இதன் மூலம் சிறப்பாக விவசாயம் செய்யுங்கள்",
    precisionAI: "துல்லியமான AI நுண்ணறிவு",
    heroDesc: "விளைச்சலை அதிகரிக்கவும், பருவங்களை கணிக்கவும், உலகளாவிய சந்தைகளுடன் இணைக்கவும். உங்கள் உலகத்தரம் வாய்ந்த விவசாய இயங்குதளம்.",
    getStartedFree: "இலவசமாக தொடங்கவும்",
    viewDemo: "செயல்விளக்கத்தைப் பார்க்கவும்",
    realTimeAnalytics: "நிகழ்நேர பண்ணை பகுப்பாய்வு",
    monitorEverything: "உள்ளூர் வானிலை முதல் நிகழ்நேர சந்தை விலை நிர்ணயம் வரை அனைத்தையும் கண்காணிக்கவும்."
  },
  TE: {
    dashboard: "డాష్‌బోర్డ్",
    assistant: "AI సహాయకుడు",
    farmMap: "పొలం మ్యాప్",
    marketplace: "మార్కెట్ ప్లేస్",
    financials: "ఆర్థిక విషయాలు",
    learningHub: "అభ్యాస కేంద్రం",
    signIn: "సైన్ ఇన్",
    signUp: "సైన్ అప్",
    logout: "లాగ్ అవుట్",
    footerDesc: "ఆధునిక రైతుల కోసం ప్రత్యేకంగా రూపొందించబడిన ప్రపంచంలోనే అత్యంత అధునాతన AI-ఆధారిత వ్యవసాయ వేదిక.",
    platform: "వేదిక",
    resources: "వనరులు",
    communityHub: "కమ్యూనిటీ హబ్",
    farmingBestPractices: "ఉత్తమ వ్యవసాయ పద్ధతులు",
    governmentSchemes: "ప్రభుత్వ పథకాలు",
    apiDocumentation: "API డాక్యుమెంటేషన్",
    company: "కంపెనీ",
    aboutUs: "మా గురించి",
    careers: "కెరీర్‌లు",
    privacyPolicy: "గోప్యతా విధానం",
    termsOfService: "సేవా నిబంధనలు",
    futureFarming: "వ్యవసాయం యొక్క భవిష్యత్తు ఇక్కడే ఉంది",
    farmSmarter: "దీనితో మరింత తెలివిగా వ్యవసాయం చేయండి",
    precisionAI: "ఖచ్చితమైన AI తెలివితేటలు",
    heroDesc: "దిగుబడిని పెంచండి, సీజన్లను అంచనా వేయండి మరియు ప్రపంచ మార్కెట్లతో కనెక్ట్ అవ్వండి. మీ ప్రపంచ స్థాయి వ్యవసాయ ఆపరేటింగ్ సిస్టమ్.",
    getStartedFree: "ఉచితంగా ప్రారంభించండి",
    viewDemo: "డెమో చూడండి",
    realTimeAnalytics: "రియల్ టైమ్ ఫామ్ అనలిటిక్స్",
    monitorEverything: "హైపర్-లోకల్ వాతావరణం నుండి రియల్ టైమ్ మార్కెట్ ధరల వరకు ప్రతిదీ పర్యవేక్షించండి."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('EN');
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

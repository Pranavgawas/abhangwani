// src/utils/translations.js

export const getText = (key, language = 'english') => {
  const translations = {
    // Navigation
    home: { english: "Home", marathi: "होम", hindi: "होम" },
    search: { english: "Search", marathi: "शोध", hindi: "खोज" },
    favorites: { english: "Favorites", marathi: "आवडते", hindi: "पसंदीदा" },
    profile: { english: "Profile", marathi: "प्रोफाइल", hindi: "प्रोफाइल" },
    
    // Common Actions
    play: { english: "Play", marathi: "ऐका", hindi: "सुनें" },
    read: { english: "Read", marathi: "वाचा", hindi: "पढ़ें" },
    share: { english: "Share", marathi: "शेअर", hindi: "शेयर" },
    download: { english: "Download", marathi: "डाउनलोड", hindi: "डाउनलोड" },
    like: { english: "Like", marathi: "आवडले", hindi: "पसंद" },
    
    // Home Tab
    streak: { english: "Day Streak", marathi: "दिवसांची सारळी", hindi: "दिन की स्ट्रीक" },
    todayContent: { english: "content today", marathi: "सामग्री", hindi: "सामग्री" },
    todaySpecial: { english: "Today's Special", marathi: "आजचे विशेष", hindi: "आज का विशेष" },
    categories: { english: "Categories", marathi: "श्रेणी", hindi: "श्रेणी" },
    viewAll: { english: "View All", marathi: "सर्व पहा", hindi: "सभी देखें" },
    popularDeities: { english: "Popular Deities", marathi: "लोकप्रिय देव", hindi: "लोकप्रिय देव" },
    trending: { english: "Trending", marathi: "ट्रेंडिंग", hindi: "ट्रेंडिंग" },
    more: { english: "More", marathi: "अधिक", hindi: "और" },
    
    // Content Types
    abhang: { english: "Abhang", marathi: "अभंग", hindi: "अभंग" },
    aarti: { english: "Aarti", marathi: "आरती", hindi: "आरती" },
    bhajan: { english: "Bhajan", marathi: "भजन", hindi: "भजन" },
    stotra: { english: "Stotra", marathi: "स्तोत्र", hindi: "स्तोत्र" },
    
    // Search Tab
    searchPlaceholder: { english: "Search saints, abhangs, aartis...", marathi: "संत, अभंग, आरती शोधा...", hindi: "संत, अभंग, आरती खोजें..." },
    all: { english: "All", marathi: "सर्व", hindi: "सभी" },
    audio: { english: "Audio", marathi: "ऑडिओ", hindi: "ऑडियो" },
    new: { english: "New", marathi: "नवीन", hindi: "नया" },
    popular: { english: "Popular", marathi: "लोकप्रिय", hindi: "लोकप्रिय" },
    filter: { english: "Filter", marathi: "फिल्टर", hindi: "फिल्टर" },
    voiceSearch: { english: "Voice Search", marathi: "आवाज शोध", hindi: "आवाज़ खोज" },
    speakToSearch: { english: "Speak to search", marathi: "बोलून शोधा", hindi: "बोलकर खोजें" },
    start: { english: "Start", marathi: "शुरू करा", hindi: "शुरू करें" },
    searchResults: { english: "Search Results", marathi: "सर्च रिझल्ट", hindi: "खोज परिणाम" },
    noResults: { english: "No results found", marathi: "कोणतेही परिणाम सापडले नाहीत", hindi: "कोई परिणाम नहीं मिले" },
    tryOtherWords: { english: "Try searching with other words", marathi: "दुसरे शब्द वापरून पहा", hindi: "अन्य शब्दों से खोजें" },
    
    // Favorites Tab
    yourFavorites: { english: "Your Favorites", marathi: "तुमचे आवडते", hindi: "आपके पसंदीदा" },
    recentlyAdded: { english: "Recently Added", marathi: "अलीकडे जोडलेले", hindi: "हाल ही में जोड़े गए" },
    yourCollections: { english: "Your Collections", marathi: "तुमचे कलेक्शन", hindi: "आपके कलेक्शन" },
    newCollection: { english: "New", marathi: "नवीन", hindi: "नया" },
    listened: { english: "listened", marathi: "ऐकले", hindi: "सुना" },
    items: { english: "items", marathi: "आयटम", hindi: "आइटम" },
    
    // Playlist Management
    addToPlaylist: { english: "Add to Playlist", marathi: "प्लेलिस्टमध्ये जोडा", hindi: "प्लेलिस्ट में जोड़ें" },
    playlistManagement: { english: "Playlist Management", marathi: "प्लेलिस्ट व्यवस्थापन", hindi: "प्लेलिस्ट प्रबंधन" },
    createNewPlaylist: { english: "Create New Playlist", marathi: "नवीन प्लेलिस्ट बनवा", hindi: "नई प्लेलिस्ट बनाएं" },
    playlistName: { english: "Playlist name", marathi: "प्लेलिस्ट नाव", hindi: "प्लेलिस्ट का नाम" },
    create: { english: "Create", marathi: "बनवा", hindi: "बनाएं" },
    cancel: { english: "Cancel", marathi: "रद्द करा", hindi: "रद्द करें" },
    noPlaylists: { english: "No playlists", marathi: "कोणतीही प्लेलिस्ट नाही", hindi: "कोई प्लेलिस्ट नहीं" },
    
    // Profile Tab
    dayStreak: { english: "Day Streak", marathi: "दिवसांची सारळी", hindi: "दिन की स्ट्रीक" },
    daysLeft: { english: "days left", marathi: "दिवस बाकी", hindi: "दिन बाकी" },
    renewal: { english: "Renewal", marathi: "नूतनीकरण", hindi: "नवीनीकरण" },
    languagePreferences: { english: "Language Preferences", marathi: "भाषा प्राधान्ये", hindi: "भाषा प्राथमिकताएं" },
    primaryLanguage: { english: "Primary Language", marathi: "प्राथमिक भाषा", hindi: "मुख्य भाषा" },
    secondaryLanguage: { english: "Secondary Language", marathi: "द्वितीयक भाषा", hindi: "द्वितीय भाषा" },
    settings: { english: "Settings", marathi: "सेटिंग्स", hindi: "सेटिंग्स" },
    fontSize: { english: "Font Size", marathi: "फॉन्ट आकार", hindi: "फॉन्ट साइज़" },
    notifications: { english: "Notifications", marathi: "सूचना", hindi: "नोटिफिकेशन" },
    darkMode: { english: "Dark Mode", marathi: "डार्क मोड", hindi: "डार्क मोड" },
    autoPlay: { english: "Auto-play", marathi: "ऑटो-प्ले", hindi: "ऑटो-प्ले" },
    downloadQuality: { english: "Download Quality", marathi: "डाउनलोड गुणवत्ता", hindi: "डाउनलोड गुणवत्ता" },
    helpAndSupport: { english: "Help and Support", marathi: "मदत आणि सहाय्य", hindi: "मदद और सहायता" },
    aboutUs: { english: "About Us", marathi: "आमच्याबद्दल", hindi: "हमारे बारे में" },
    medium: { english: "Medium", marathi: "मध्यम", hindi: "मध्यम" },
    on: { english: "On", marathi: "चालू", hindi: "चालू" },
    off: { english: "Off", marathi: "बंद", hindi: "बंद" },
    high: { english: "High", marathi: "उच्च", hindi: "उच्च" },
    signOut: { english: "Sign Out", marathi: "साइन आउट", hindi: "साइन आउट" },
    joinCommunity: { english: "Join Community", marathi: "समुदायामध्ये सहभागी व्हा", hindi: "समुदाय में शामिल हों" },
    connectWithDevotees: { english: "Connect with other devotees", marathi: "इतर भक्तांशी जुडा", hindi: "अन्य भक्तों से जुड़ें" },
    dailySatsang: { english: "Daily Satsang", marathi: "दैनिक सत्संग", hindi: "दैनिक सत्संग" },
    discussionGroup: { english: "Discussion Group", marathi: "चर्चा गट", hindi: "चर्चा समूह" },
    
    // Premium
    premium: { english: "Premium", marathi: "प्रीमियम", hindi: "प्रीमियम" },
    premiumDesc: { english: "Get premium membership and enjoy more content", marathi: "प्रीमियम सदस्यता घ्या आणि अधिक सामग्रीचा आनंद घ्या", hindi: "प्रीमियम सदस्यता लें और अधिक सामग्री का आनंद लें" },
    adFreeExperience: { english: "Ad-free experience", marathi: "जाहिरातीरहित अनुभव", hindi: "विज्ञापन मुक्त अनुभव" },
    allPremiumContent: { english: "All premium content", marathi: "सर्व प्रीमियम सामग्री", hindi: "सभी प्रीमियम सामग्री" },
    offlineDownload: { english: "Offline download", marathi: "ऑफलाइन डाउनलोड", hindi: "ऑफलाइन डाउनलोड" },
    buyPremium: { english: "Buy Premium", marathi: "प्रीमियम खरेदी करा", hindi: "प्रीमियम खरीदें" },
    
    // Audio Controls
    listening: { english: "Listening...", marathi: "ऐकत आहे...", hindi: "सुन रहे हैं..." },
    keepSpeaking: { english: "Keep speaking...", marathi: "बोलत रहा...", hindi: "बोलते रहें..." },
    listening2: { english: "Listening", marathi: "ऐकत आहे", hindi: "सुन रहे" },
    textOnly: { english: "Text only", marathi: "फक्त मजकूर", hindi: "केवल टेक्स्ट" }
  };

  return translations[key]?.[language] || translations[key]?.english || key;
};

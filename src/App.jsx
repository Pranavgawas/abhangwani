import { useState } from "react";
import Home from "./components/Home";
import Search from "./components/Search";
import Favorites from "./components/Favorites";
import Profile from "./components/Profile";
import LanguageToggle from "./components/LanguageToggle";
import PremiumModal from "./components/PremiumModal";
import "./App.css";

export default function BhaktiSagarApp() {
  const [currentTab, setCurrentTab] = useState("home");
  const [language, setLanguage] = useState("marathi");
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedContent, setLikedContent] = useState(new Set([1, 4]));
  const [currentAudio, setCurrentAudio] = useState(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [userStreak] = useState(12);
  const [dailyProgress] = useState(4);

  const content = {
    marathi: {
      abhangs: [
        {
          id: 1,
          saint: "संत तुकाराम",
          firstLine: "अवघा रंग एकचि झाला",
          meaning: "जेव्हा भक्ती पूर्ण होते तेव्हा सर्व काही एकाच सत्यात विलीन होते.",
          category: "अभंग",
          subcategory: "भक्ति",
          duration: "3:42",
          plays: "25K",
          hasAudio: true,
          isPremium: false,
          type: "abhang",
        },
        {
          id: 2,
          saint: "संत ज्ञानेश्वर",
          firstLine: "पांडुरंग पांडुरंग",
          meaning: "पांडुरंगाच्या नावाचा जप करून शुद्ध प्रेम व्यक्त करणे.",
          category: "अभंग",
          subcategory: "प्रेम",
          duration: "2:58",
          plays: "18K",
          hasAudio: true,
          isPremium: true,
          type: "abhang",
        },
      ],
      aartis: [
        {
          id: 3,
          deity: "श्री गणेश",
          title: "सुखकर्ता दुःखहर्ता",
          meaning: "गणपती बाप्पाची आरती, सुख देणारे आणि दुःख हरणारे.",
          category: "आरती",
          duration: "4:25",
          plays: "45K",
          hasAudio: true,
          isPremium: false,
          type: "aarti",
          occasion: "दैनिक",
        },
        {
          id: 4,
          deity: "श्री कृष्ण",
          title: "ओवाळू आरती",
          meaning: "श्री कृष्णाची पारंपरिक आरती.",
          category: "आरती",
          duration: "3:15",
          plays: "32K",
          hasAudio: true,
          isPremium: false,
          type: "aarti",
          occasion: "संध्याकाळ",
        },
      ],
    },
    hindi: {
      abhangs: [
        {
          id: 5,
          saint: "संत कबीर",
          firstLine: "कबीरा तेरा झोपड़ा गलकटियन के पास",
          meaning: "कबीर कहते हैं कि सच्चा ज्ञान साधारण लोगों में मिलता है.",
          category: "अभंग",
          subcategory: "ज्ञान",
          duration: "4:12",
          plays: "38K",
          hasAudio: true,
          isPremium: false,
          type: "abhang",
        },
        {
          id: 6,
          saint: "मीराबाई",
          firstLine: "पायो जी मैंने राम रतन धन पायो",
          meaning: "मीरा कहती हैं कि उन्हें राम नाम रूपी रत्न मिला है.",
          category: "अभंग",
          subcategory: "प्रेम",
          duration: "3:28",
          plays: "52K",
          hasAudio: true,
          isPremium: true,
          type: "abhang",
        },
      ],
      aartis: [
        {
          id: 7,
          deity: "श्री गणेश",
          title: "जय गणेश जय गणेश देवा",
          meaning: "गणपति जी की हिंदी आरती, सभी विघ्नों के हर्ता.",
          category: "आरती",
          duration: "3:45",
          plays: "67K",
          hasAudio: true,
          isPremium: false,
          type: "aarti",
          occasion: "दैनिक",
        },
        {
          id: 8,
          deity: "श्री हनुमान",
          title: "आरती कीजै हनुमान लला की",
          meaning: "हनुमान जी की पारंपरिक आरती.",
          category: "आरती",
          duration: "4:08",
          plays: "89K",
          hasAudio: true,
          isPremium: false,
          type: "aarti",
          occasion: "मंगलवार",
        },
      ],
    },
  };

  const categories = [
    { name: "अभंग", nameHindi: "अभंग", icon: "📿", count: 2547 },
    { name: "आरती", nameHindi: "आरती", icon: "🪔", count: 856 },
    { name: "भजन", nameHindi: "भजन", icon: "🎵", count: 1234 },
    { name: "स्तोत्र", nameHindi: "स्तोत्र", icon: "📜", count: 445 },
  ];

  const deities = [
    { name: "गणेश", nameHindi: "गणेश", icon: "🐘", aartis: 45 },
    { name: "कृष्ण", nameHindi: "कृष्ण", icon: "🦚", aartis: 78 },
    { name: "शिव", nameHindi: "शिव", icon: "🔱", aartis: 62 },
    { name: "राम", nameHindi: "राम", icon: "🏹", aartis: 54 },
    { name: "हनुमान", nameHindi: "हनुमान", icon: "💪", aartis: 38 },
    { name: "दुर्गा", nameHindi: "दुर्गा", icon: "⚔️", aartis: 29 },
  ];

  const getCurrentContent = () => {
    const lang = content[language];
    return [...lang.abhangs, ...lang.aartis];
  };

  const playAudio = (item) => {
    if (item.isPremium && !showPremiumModal) {
      setShowPremiumModal(true);
      return;
    }
    setCurrentAudio(item.id);
    setIsPlaying(true);
  };

  const toggleLike = (id) => {
    const newLiked = new Set(likedContent);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedContent(newLiked);
  };

  return (
    <div className="app-container">
      <div className="status-bar">
        <span>9:41</span>
        <div>
          <span>5G</span>
          <span>●●●●</span>
          <span>100%</span>
        </div>
      </div>
      <div className="header">
        <div>
          <h1>BhaktiSagar</h1>
          <p>{language === "marathi" ? "सभी भक्ति एक स्थान पर" : "सभी भक्ति एक स्थान पर"}</p>
        </div>
        <div>
          <button onClick={() => setCurrentTab("search")}>🔍</button>
          <button>🔔</button>
        </div>
      </div>
      {isPlaying && currentAudio && (
        <div className="audio-player">
          <button onClick={() => setIsPlaying(false)}>⏸</button>
          <div>
            <div>
              {getCurrentContent().find((a) => a.id === currentAudio)?.saint ||
                getCurrentContent().find((a) => a.id === currentAudio)?.deity}
            </div>
            <div>
              {(getCurrentContent().find((a) => a.id === currentAudio)?.firstLine?.substring(0, 20) ||
                getCurrentContent().find((a) => a.id === currentAudio)?.title?.substring(0, 20)) + "..."}
            </div>
          </div>
          <button>🔊</button>
        </div>
      )}
      <div className="content">
        {currentTab === "home" && (
          <Home
            language={language}
            userStreak={userStreak}
            dailyProgress={dailyProgress}
            getCurrentContent={getCurrentContent}
            playAudio={playAudio}
            toggleLike={toggleLike}
            isPlaying={isPlaying}
            currentAudio={currentAudio}
            likedContent={likedContent}
            categories={categories}
            deities={deities}
          />
        )}
        {currentTab === "search" && (
          <Search
            language={language}
            getCurrentContent={getCurrentContent}
            playAudio={playAudio}
            toggleLike={toggleLike}
            likedContent={likedContent}
          />
        )}
        {currentTab === "favorites" && (
          <Favorites
            language={language}
            likedContent={likedContent}
            getCurrentContent={getCurrentContent}
            playAudio={playAudio}
          />
        )}
        {currentTab === "profile" && (
          <Profile
            language={language}
            userStreak={userStreak}
            likedContent={likedContent}
          />
        )}
      </div>
      <div className="nav-bar">
        {[
          { id: "home", icon: "🏠", label: language === "marathi" ? "मुख्य" : "मुख्य" },
          { id: "search", icon: "🔍", label: language === "marathi" ? "शोध" : "खोज" },
          { id: "favorites", icon: "❤️", label: language === "marathi" ? "आवडते" : "पसंदीदा" },
          { id: "profile", icon: "👤", label: language === "marathi" ? "प्रोफाइल" : "प्रोफाइल" },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`nav-button ${currentTab === tab.id ? "active" : ""}`}
            onClick={() => setCurrentTab(tab.id)}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.id === "favorites" && likedContent.size > 0 && (
              <span className="badge">{likedContent.size}</span>
            )}
          </button>
        ))}
      </div>
      <PremiumModal
        showPremiumModal={showPremiumModal}
        setShowPremiumModal={setShowPremiumModal}
        language={language}
      />
    </div>
  );
}
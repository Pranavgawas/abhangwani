import LanguageToggle from "./LanguageToggle";

export default function Profile({ language, userStreak, likedContent }) {
  return (
    <div className="profile">
      <div className="section">
        <LanguageToggle language={language} />
      </div>
      <div className="profile-header">
        <div className="avatar">👤</div>
        <h2>{language === "marathi" ? "राम पाटील" : "राम पटेल"}</h2>
        <p>{language === "marathi" ? "पुणे, महाराष्ट्र" : "पुणे, महाराष्ट्र"}</p>
        <div className="stats">
          <div>
            <div>{userStreak}</div>
            <div>{language === "marathi" ? "दिवसांची सारळी" : "दिन की स्ट्रीक"}</div>
          </div>
          <div>
            <div>234</div>
            <div>{language === "marathi" ? "सुनलेले" : "सुने गए"}</div>
          </div>
          <div>
            <div>{likedContent.size}</div>
            <div>{language === "marathi" ? "आवडते" : "पसंदीदा"}</div>
          </div>
        </div>
      </div>
      <div className="card">
        <div>
          <span role="img" aria-label="crown">👑</span>
          <div>
            <div>BhaktiSagar Premium</div>
            <div>{language === "marathi" ? "15 दिवस बाकी" : "15 दिन बाकी"}</div>
          </div>
          <button>{language === "marathi" ? "नूतनीकरण" : "नवीनीकरण"}</button>
        </div>
      </div>
      <div className="card">
        <h3>🌐 {language === "marathi" ? "भाषा प्राधान्ये" : "भाषा प्राथमिकताएं"}</h3>
        <div>
          <div>
            <span>{language === "marathi" ? "प्राथमिक भाषा" : "मुख्य भाषा"}</span>
            <span>{language === "marathi" ? "मराठी" : "हिंदी"}</span>
          </div>
          <div>
            <span>{language === "marathi" ? "द्वितीयक भाषा" : "द्वितीय भाषा"}</span>
            <span>{language === "marathi" ? "हिंदी" : "मराठी"}</span>
          </div>
        </div>
      </div>
      <div className="section">
        <h3>{language === "marathi" ? "सेटिंग्स" : "सेटिंग्स"}</h3>
        {[
          { name: language === "marathi" ? "फॉन्ट आकार" : "फॉन्ट साइज़", icon: "📝", badge: language === "marathi" ? "मध्यम" : "मध्यम" },
          { name: language === "marathi" ? "सूचना" : "नोटिफिकेशन", icon: "🔔", badge: language === "marathi" ? "चालू" : "चालू" },
          { name: language === "marathi" ? "डार्क मोड" : "डार्क मोड", icon: "🌙", badge: language === "marathi" ? "बंद" : "बंद" },
          { name: language === "marathi" ? "ऑटो-प्ले" : "ऑटो-प्ले", icon: "▶️", badge: language === "marathi" ? "बंद" : "बंद" },
          { name: language === "marathi" ? "डाउनलोड गुणवत्ता" : "डाउनलोड गुणवत्ता", icon: "⬇️", badge: language === "marathi" ? "उच्च" : "उच्च" },
          { name: language === "marathi" ? "मदत आणि सहाय्य" : "मदद और सहायता", icon: "❓", badge: null },
          { name: language === "marathi" ? "आमच्याबद्दल" : "हमारे बारे में", icon: "ℹ️", badge: "v2.1.0" },
        ].map((option) => (
          <div key={option.name} className="card">
            <div>
              <span>{option.icon}</span>
              <span>{option.name}</span>
              {option.badge && <span>{option.badge}</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="card">
        <div>
          <span role="img" aria-label="users">👥</span>
          <div>
            <div>{language === "marathi" ? "समुदायामध्ये सहभागी व्हा" : "समुदाय में शामिल हों"}</div>
            <div>{language === "marathi" ? "इतर भक्तांशी जुडा" : "अन्य भक्तों से जुड़ें"}</div>
          </div>
        </div>
        <div className="action-buttons">
          <button>📅 {language === "marathi" ? "दैनिक सत्संग" : "दैनिक सत्संग"}</button>
          <button>👥 {language === "marathi" ? "चर्चा गट" : "चर्चा समूह"}</button>
        </div>
      </div>
      <button className="sign-out">{language === "marathi" ? "साइन आउट" : "साइन आउट"}</button>
    </div>
  );
}
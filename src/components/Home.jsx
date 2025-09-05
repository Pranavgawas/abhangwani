import LanguageToggle from "./LanguageToggle";

export default function Home({
  language,
  userStreak,
  dailyProgress,
  getCurrentContent,
  playAudio,
  toggleLike,
  isPlaying,
  currentAudio,
  likedContent,
  categories,
  deities,
}) {
  const todayContent = getCurrentContent()[0];

  return (
    <div className="home">
      <div className="section">
        <LanguageToggle language={language} />
      </div>
      <div className="card streak">
        <div className="streak-content">
          <div>
            <span role="img" aria-label="award">🏆</span>
            <span>{userStreak} {language === "marathi" ? "दिवसांची सारळी" : "दिन की स्ट्रीक"}</span>
          </div>
          <div>{language === "marathi" ? `आज ${dailyProgress}/5 सामग्री` : `आज ${dailyProgress}/5 सामग्री`}</div>
          <div className="progress-bar">
            <div style={{ width: `${(dailyProgress / 5) * 100}%` }}></div>
          </div>
          <span role="img" aria-label="bell">🔔</span>
        </div>
      </div>
      <div className="card featured">
        <div>
          <span role="img" aria-label="star">⭐</span>
          <span>{language === "marathi" ? "आजचे विशेष" : "आज का विशेष"}</span>
          <span>{todayContent.type === "aarti" ? (language === "marathi" ? "आरती" : "आरती") : (language === "marathi" ? "अभंग" : "अभंग")}</span>
        </div>
        <div>
          <h3>{todayContent.saint || todayContent.deity}</h3>
          <p>{todayContent.firstLine || todayContent.title}</p>
          <p>{todayContent.meaning}</p>
        </div>
        <div className="action-buttons">
          <button onClick={() => playAudio(todayContent)}>
            {isPlaying && currentAudio === todayContent.id ? "⏸" : "▶"} {todayContent.duration}
          </button>
          <button>🎧 {todayContent.plays}</button>
          <button>↗</button>
          <button>⬇</button>
          <button onClick={() => toggleLike(todayContent.id)}>
            {likedContent.has(todayContent.id) ? "❤️" : "♡"}
          </button>
        </div>
      </div>
      <div className="section">
        <h3>{language === "marathi" ? "श्रेणी" : "श्रेणी"}</h3>
        <button>{language === "marathi" ? "सर्व पहा" : "सभी देखें"}</button>
        <div className="grid">
          {categories.map((category) => (
            <div key={category.name} className="card">
              <div>{category.icon}</div>
              <div>{language === "marathi" ? category.name : category.nameHindi}</div>
              <div>{category.count}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <h3>{language === "marathi" ? "लोकप्रिय देव" : "लोकप्रिय देव"}</h3>
        <button>{language === "marathi" ? "सर्व पहा" : "सभी देखें"}</button>
        <div className="scroll-grid">
          {deities.map((deity) => (
            <div key={deity.name} className="card">
              <div>{deity.icon}</div>
              <div>{language === "marathi" ? deity.name : deity.nameHindi}</div>
              <div>{deity.aartis} आरती</div>
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <h3>{language === "marathi" ? "ट्रेंडिंग" : "ट्रेंडिंग"}</h3>
        <button>{language === "marathi" ? "अधिक" : "और"}</button>
        <div>
          {getCurrentContent().slice(0, 3).map((item) => (
            <div key={item.id} className="card">
              <div>
                <div>
                  <h4>{item.saint || item.deity}</h4>
                  {item.isPremium && <span role="img" aria-label="crown">👑</span>}
                  <span>{item.type === "aarti" ? (language === "marathi" ? "आरती" : "आरती") : (language === "marathi" ? "अभंग" : "अभंग")}</span>
                </div>
                <p>{item.firstLine || item.title}</p>
                <div>
                  <span>▶ {item.plays}</span>
                  <span>⏱ {item.duration}</span>
                </div>
                <button onClick={() => playAudio(item)}>▶</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
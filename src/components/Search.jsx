import LanguageToggle from "./LanguageToggle";

export default function Search({ language, getCurrentContent, playAudio, toggleLike, likedContent }) {
  return (
    <div className="search">
      <div className="section">
        <LanguageToggle language={language} />
      </div>
      <div className="search-header">
        <input
          placeholder={language === "marathi" ? "संत, अभंग, आरती शोधा..." : "संत, अभंग, आरती खोजें..."}
        />
        <button>🔍</button>
        <div className="filter-chips">
          {[
            language === "marathi" ? "सर्व" : "सभी",
            language === "marathi" ? "अभंग" : "अभंग",
            language === "marathi" ? "आरती" : "आरती",
            language === "marathi" ? "ऑडिओ" : "ऑडियो",
            language === "marathi" ? "नवीन" : "नया",
            language === "marathi" ? "लोकप्रिय" : "लोकप्रिय",
          ].map((filter) => (
            <button key={filter}>{filter}</button>
          ))}
          <button>🔧</button>
        </div>
      </div>
      <div className="card">
        <div>
          <span role="img" aria-label="mic">🎤</span>
          <div>
            <div>Voice Search</div>
            <div>{language === "marathi" ? "बोलून शोधा" : "बोलकर खोजें"}</div>
          </div>
          <button>{language === "marathi" ? "शुरू करा" : "शुरू करें"}</button>
        </div>
      </div>
      <div className="section">
        <div>
          <span>{language === "marathi" ? `सर्च रिझल्ट (${getCurrentContent().length})` : `खोज परिणाम (${getCurrentContent().length})`}</span>
          <button>🔧 {language === "marathi" ? "फिल्टर" : "फिल्टर"}</button>
        </div>
        <div>
          {getCurrentContent().map((item) => (
            <div key={item.id} className="card">
              <div>
                <div>
                  <h4>{item.saint || item.deity}</h4>
                  {item.isPremium && <span role="img" aria-label="crown">👑</span>}
                  <span>{item.type === "aarti" ? (language === "marathi" ? "आरती" : "आरती") : (language === "marathi" ? "अभंग" : "अभंग")}</span>
                </div>
                <p>{item.firstLine || item.title}</p>
                <p>{item.meaning}</p>
                <div>
                  <span>▶ {item.plays}</span>
                  <span>⏱ {item.duration}</span>
                  <span>🎵 {item.hasAudio ? "ऑडिओ" : "फक्त मजकूर"}</span>
                </div>
                <button onClick={() => toggleLike(item.id)}>
                  {likedContent.has(item.id) ? "❤️" : "♡"}
                </button>
              </div>
              <div className="action-buttons">
                <button onClick={() => playAudio(item)}>▶ {language === "marathi" ? "ऐका" : "सुनें"}</button>
                <button>📖 {language === "marathi" ? "वाचा" : "पढ़ें"}</button>
                <button>↗</button>
                <button>⬇</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
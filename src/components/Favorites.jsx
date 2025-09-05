import LanguageToggle from "./LanguageToggle";

export default function Favorites({ language, likedContent, getCurrentContent, playAudio }) {
  return (
    <div className="favorites">
      <div className="section">
        <LanguageToggle language={language} />
      </div>
      <div>
        <h2>{language === "marathi" ? `तुमचे आवडते (${likedContent.size})` : `आपके पसंदीदा (${likedContent.size})`}</h2>
        <button>🔧 {language === "marathi" ? "फिल्टर" : "फिल्टर"}</button>
      </div>
      <div className="grid">
        <div className="card">
          <div>{likedContent.size}</div>
          <div>{language === "marathi" ? "आवडते" : "पसंदीदा"}</div>
        </div>
        <div className="card">
          <div>15</div>
          <div>{language === "marathi" ? "डाउनलोड" : "डाउनलोड"}</div>
        </div>
        <div className="card">
          <div>8h</div>
          <div>{language === "marathi" ? "ऐकले" : "सुना"}</div>
        </div>
        <div className="card">
          <div>3</div>
          <div>{language === "marathi" ? "प्लेलिस्ट" : "प्लेलिस्ट"}</div>
        </div>
      </div>
      <div className="section">
        <h3>{language === "marathi" ? "अलीकडे जोडलेले" : "हाल ही में जोड़े गए"}</h3>
        <div>
          {getCurrentContent()
            .filter((a) => likedContent.has(a.id))
            .map((item) => (
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
      <div className="section">
        <h3>{language === "marathi" ? "तुमचे कलेक्शन" : "आपके कलेक्शन"}</h3>
        <button>+ {language === "marathi" ? "नवीन" : "नया"}</button>
        <div className="grid">
          {[
            { name: language === "marathi" ? "सकाळची प्रार्थना" : "सुबह की प्रार्थना", count: 12, icon: "🌅" },
            { name: language === "marathi" ? "संध्याकालीन आरती" : "शाम की आरती", count: 18, icon: "🪔" },
            { name: language === "marathi" ? "ध्यान अभंग" : "ध्यान अभंग", count: 8, icon: "🧘‍♂️" },
            { name: language === "marathi" ? "त्योहारी गीते" : "त्योहारी गीत", count: 25, icon: "🎉" },
          ].map((collection) => (
            <div key={collection.name} className="card">
              <div>{collection.icon}</div>
              <div>{collection.name}</div>
              <div>{collection.count} आइटम</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
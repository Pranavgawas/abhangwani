import "./PremiumModal.css";

export default function PremiumModal({ showPremiumModal, setShowPremiumModal, language }) {
  return (
    showPremiumModal && (
      <div className="modal">
        <div className="modal-content">
          <span role="img" aria-label="crown">👑</span>
          <h3>BhaktiSagar Premium</h3>
          <p>{language === "marathi" ? "हे सुनण्यासाठी प्रीमियम सदस्यता घ्या" : "प्रीमियम सदस्यता के साथ सुनें"}</p>
          <div className="premium-features">
            <div>Premium Features</div>
            <div>₹99/month</div>
            <div>• असीमित अभंग व आरती • ऑफलाइन डाउनलोड • AI अर्थ</div>
          </div>
          <div className="modal-buttons">
            <button className="modal-button primary" onClick={() => setShowPremiumModal(false)}>
              {language === "marathi" ? "सुरू करा" : "शुरू करें"}
            </button>
            <button className="modal-button" onClick={() => setShowPremiumModal(false)}>
              {language === "marathi" ? "बंद करा" : "बंद करें"}
            </button>
          </div>
        </div>
      </div>
    )
  );
}
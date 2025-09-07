// src/components/LanguageToggle.jsx
import { Button } from "./ui/button";

export default function LanguageToggle({ language, setLanguage }) {
  return (
    <div className="flex bg-white rounded-full p-1 shadow-sm">
      <Button
        size="sm"
        variant={language === "marathi" ? "default" : "ghost"}
        className={`rounded-full text-xs px-3 ${language === "marathi" ? "bg-orange-600 text-white" : ""}`}
        onClick={() => setLanguage("marathi")}
      >
        मराठी
      </Button>
      <Button
        size="sm"
        variant={language === "hindi" ? "default" : "ghost"}
        className={`rounded-full text-xs px-3 ${language === "hindi" ? "bg-orange-600 text-white" : ""}`}
        onClick={() => setLanguage("hindi")}
      >
        हिंदी
      </Button>
    </div>
  );
}
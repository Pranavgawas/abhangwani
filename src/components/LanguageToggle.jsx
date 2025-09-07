// src/components/LanguageToggle.jsx
import { Button } from "./ui/button";

export default function LanguageToggle({ language, setLanguage }) {
  const languages = [
    { key: "english", label: "English" },
    { key: "marathi", label: "मराठी" },
    { key: "hindi", label: "हिंदी" }
  ];

  return (
    <div className="flex bg-white rounded-full p-1 shadow-sm">
      {languages.map((lang) => (
        <Button
          key={lang.key}
          size="sm"
          variant={language === lang.key ? "default" : "ghost"}
          className={`rounded-full text-xs px-3 ${language === lang.key ? "bg-orange-600 text-white" : ""}`}
          onClick={() => setLanguage(lang.key)}
        >
          {lang.label}
        </Button>
      ))}
    </div>
  );
}
// src/components/ProfileTab.jsx
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { User, Crown, Globe, Users, Calendar } from "lucide-react";
import LanguageToggle from "./LanguageToggle";

export default function ProfileTab({ language, userStreak, likedContent, setLanguage }) {
  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-center">
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </div>

      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3">
          <User className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-lg font-semibold">{language === "marathi" ? "राम पाटील" : "राम पटेल"}</h2>
        <p className="text-gray-500 text-sm">{language === "marathi" ? "पुणे, महाराष्ट्र" : "पुणे, महाराष्ट्र"}</p>
        <div className="flex justify-center items-center gap-4 mt-3">
          <div className="text-center">
            <div className="text-lg font-bold text-orange-600">{userStreak}</div>
            <div className="text-xs text-gray-500">{language === "marathi" ? "दिवसांची सारळी" : "दिन की स्ट्रीक"}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">234</div>
            <div className="text-xs text-gray-500">{language === "marathi" ? "सुनलेले" : "सुने गए"}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{likedContent.size}</div>
            <div className="text-xs text-gray-500">{language === "marathi" ? "आवडते" : "पसंदीदा"}</div>
          </div>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-600" />
              <div>
                <div className="font-medium text-yellow-800">BhaktiSagar Premium</div>
                <div className="text-xs text-yellow-600">{language === "marathi" ? "15 दिवस बाकी" : "15 दिन बाकी"}</div>
              </div>
            </div>
            <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
              {language === "marathi" ? "नूतनीकरण" : "नवीनीकरण"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600" />
            {language === "marathi" ? "भाषा प्राधान्ये" : "भाषा प्राथमिकताएं"}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">{language === "marathi" ? "प्राथमिक भाषा" : "मुख्य भाषा"}</span>
              <span className="text-sm text-gray-600">{language === "marathi" ? "मराठी" : "हिंदी"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">{language === "marathi" ? "द्वितीयक भाषा" : "द्वितीय भाषा"}</span>
              <span className="text-sm text-gray-600">{language === "marathi" ? "हिंदी" : "मराठी"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h3 className="font-medium mb-3">{language === "marathi" ? "सेटिंग्स" : "सेटिंग्स"}</h3>
        {[
          { name: language === "marathi" ? "फॉन्ट आकार" : "फॉन्ट साइज़", icon: "📝", badge: language === "marathi" ? "मध्यम" : "मध्यम" },
          { name: language === "marathi" ? "सूचना" : "नोटिफिकेशन", icon: "🔔", badge: language === "marathi" ? "चालू" : "चालू" },
          { name: language === "marathi" ? "डार्क मोड" : "डार्क मोड", icon: "🌙", badge: language === "marathi" ? "बंद" : "बंद" },
          { name: language === "marathi" ? "ऑटो-प्ले" : "ऑटो-प्ले", icon: "▶️", badge: language === "marathi" ? "बंद" : "बंद" },
          { name: language === "marathi" ? "डाउनलोड गुणवत्ता" : "डाउनलोड गुणवत्ता", icon: "⬇️", badge: language === "marathi" ? "उच्च" : "उच्च" },
          { name: language === "marathi" ? "मदत आणि सहाय्य" : "मदद और सहायता", icon: "❓", badge: null },
          { name: language === "marathi" ? "आमच्याबद्दल" : "हमारे बारे में", icon: "ℹ️", badge: "v2.1.0" },
        ].map((option) => (
          <Card key={option.name} className="hover:shadow-sm transition-shadow cursor-pointer">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{option.icon}</span>
                  <span className="text-sm font-medium">{option.name}</span>
                </div>
                {option.badge && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{option.badge}</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-5 h-5 text-blue-600" />
            <div>
              <div className="font-medium text-blue-800">{language === "marathi" ? "समुदायामध्ये सहभागी व्हा" : "समुदाय में शामिल हों"}</div>
              <div className="text-xs text-blue-600">{language === "marathi" ? "इतर भक्तांशी जुडा" : "अन्य भक्तों से जुड़ें"}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" className="text-xs">
              <Calendar className="w-3 h-3 mr-1" />
              {language === "marathi" ? "दैनिक सत्संग" : "दैनिक सत्संग"}
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              <Users className="w-3 h-3 mr-1" />
              {language === "marathi" ? "चर्चा गट" : "चर्चा समूह"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full text-red-600 border-red-200">
        {language === "marathi" ? "साइन आउट" : "साइन आउट"}
      </Button>
    </div>
  );
}
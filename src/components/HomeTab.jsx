// src/components/HomeTab.jsx
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Star, Award, Bell, Play, Pause, Headphones, Share2, Download, Heart, Crown } from "lucide-react";
import LanguageToggle from "./LanguageToggle";

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

export default function HomeTab({
  language,
  getCurrentContent,
  userStreak,
  dailyProgress,
  playAudio,
  toggleLike,
  likedContent,
  isPlaying,
  currentAudio,
  setLanguage,
}) {
  const todayContent = getCurrentContent()[0];

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-center">
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </div>

      <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-green-200">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  {userStreak} {language === "marathi" ? "दिवसांची सारळी" : "दिन की स्ट्रीक"}
                </span>
              </div>
              <div className="text-xs text-gray-600">
                {language === "marathi" ? `आज ${dailyProgress}/5 सामग्री` : `आज ${dailyProgress}/5 सामग्री`}
              </div>
              <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(dailyProgress / 5) * 100}%` }}></div>
              </div>
            </div>
            <Bell className="w-5 h-5 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-700">
              {language === "marathi" ? "आजचे विशेष" : "आज का विशेष"}
            </span>
            <span className="text-xs bg-orange-200 text-orange-700 px-2 py-1 rounded-full ml-auto">
              {todayContent.type === "aarti" ? (language === "marathi" ? "आरती" : "आरती") : (language === "marathi" ? "अभंग" : "अभंग")}
            </span>
          </div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-orange-800 mb-1">{todayContent.saint || todayContent.deity}</h3>
              <p className="text-gray-800 italic text-sm mb-1">{todayContent.firstLine || todayContent.title}</p>
              <p className="text-xs text-gray-600 mb-2">{todayContent.meaning}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="rounded-full"
                onClick={() => playAudio(todayContent)}
              >
                {isPlaying && currentAudio === todayContent.id ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span className="ml-1 text-xs">{todayContent.duration}</span>
              </Button>
              <Button size="sm" variant="ghost" className="rounded-full">
                <Headphones className="w-3 h-3" />
                <span className="ml-1 text-xs">{todayContent.plays}</span>
              </Button>
            </div>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" className="rounded-full">
                <Share2 className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="ghost" className="rounded-full">
                <Download className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="rounded-full"
                onClick={() => toggleLike(todayContent.id)}
              >
                <Heart className={`w-3 h-3 ${likedContent.has(todayContent.id) ? "text-red-500 fill-current" : ""}`} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800">{language === "marathi" ? "श्रेणी" : "श्रेणी"}</h3>
          <Button variant="ghost" size="sm">{language === "marathi" ? "सर्व पहा" : "सभी देखें"}</Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <Card key={category.name} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-3 text-center">
                <div className="text-2xl mb-1">{category.icon}</div>
                <div className="font-medium text-sm">{language === "marathi" ? category.name : category.nameHindi}</div>
                <div className="text-xs text-gray-500">{category.count}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800">{language === "marathi" ? "लोकप्रिय देव" : "लोकप्रिय देव"}</h3>
          <Button variant="ghost" size="sm">{language === "marathi" ? "सर्व पहा" : "सभी देखें"}</Button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {deities.map((deity) => (
            <Card key={deity.name} className="min-w-[100px] hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-3 text-center">
                <div className="text-2xl mb-1">{deity.icon}</div>
                <div className="font-medium text-xs">{language === "marathi" ? deity.name : deity.nameHindi}</div>
                <div className="text-xs text-gray-500">{deity.aartis} आरती</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800">{language === "marathi" ? "ट्रेंडिंग" : "ट्रेंडिंग"}</h3>
          <Button variant="ghost" size="sm">{language === "marathi" ? "अधिक" : "और"}</Button>
        </div>
        <div className="space-y-2">
          {getCurrentContent().slice(0, 3).map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-orange-700 text-sm">{item.saint || item.deity}</h4>
                      {item.isPremium && <Crown className="w-3 h-3 text-yellow-500" />}
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {item.type === "aarti" ? (language === "marathi" ? "आरती" : "आरती") : (language === "marathi" ? "अभंग" : "अभंग")}
                      </span>
                    </div>
                    <p className="text-gray-800 text-sm italic mb-1">{item.firstLine || item.title}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>▶ {item.plays}</span>
                      <span>⏱ {item.duration}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => playAudio(item)}>
                    <Play className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
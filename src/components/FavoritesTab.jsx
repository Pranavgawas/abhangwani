// src/components/FavoritesTab.jsx
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Heart, Filter, Play, Crown } from "lucide-react";
import LanguageToggle from "./LanguageToggle";

export default function FavoritesTab({ language, getCurrentContent, likedContent, playAudio, setLanguage }) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-center mb-4">
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">
          {language === "marathi" ? `तुमचे आवडते (${likedContent.size})` : `आपके पसंदीदा (${likedContent.size})`}
        </h2>
        <Button variant="ghost" size="sm">
          <Filter className="w-3 h-3 mr-1" />
          {language === "marathi" ? "फिल्टर" : "फिल्टर"}
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-orange-600">{likedContent.size}</div>
            <div className="text-xs text-gray-500">{language === "marathi" ? "आवडते" : "पसंदीदा"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-green-600">15</div>
            <div className="text-xs text-gray-500">{language === "marathi" ? "डाउनलोड" : "डाउनलोड"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-blue-600">8h</div>
            <div className="text-xs text-gray-500">{language === "marathi" ? "ऐकले" : "सुना"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-purple-600">3</div>
            <div className="text-xs text-gray-500">{language === "marathi" ? "प्लेलिस्ट" : "प्लेलिस्ट"}</div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="font-medium mb-2 text-sm">{language === "marathi" ? "अलीकडे जोडलेले" : "हाल ही में जोड़े गए"}</h3>
        <div className="space-y-2">
          {getCurrentContent()
            .filter((a) => likedContent.has(a.id))
            .map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
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

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-sm">{language === "marathi" ? "तुमचे कलेक्शन" : "आपके कलेक्शन"}</h3>
          <Button variant="ghost" size="sm">+ {language === "marathi" ? "नवीन" : "नया"}</Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: language === "marathi" ? "सकाळची प्रार्थना" : "सुबह की प्रार्थना", count: 12, icon: "🌅" },
            { name: language === "marathi" ? "संध्याकालीन आरती" : "शाम की आरती", count: 18, icon: "🪔" },
            { name: language === "marathi" ? "ध्यान अभंग" : "ध्यान अभंग", count: 8, icon: "🧘‍♂️" },
            { name: language === "marathi" ? "त्योहारी गीते" : "त्योहारी गीत", count: 25, icon: "🎉" },
          ].map((collection) => (
            <Card key={collection.name} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-3 text-center">
                <div className="text-2xl mb-1">{collection.icon}</div>
                <div className="font-medium text-xs">{collection.name}</div>
                <div className="text-xs text-gray-500">{collection.count} आइटम</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
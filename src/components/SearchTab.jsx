// src/components/SearchTab.jsx
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Search, Mic, Filter, Play, BookOpen, Share2, Download, Heart, Crown } from "lucide-react";
import LanguageToggle from "./LanguageToggle";

export default function SearchTab({ language, getCurrentContent, playAudio, toggleLike, likedContent, setLanguage }) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-center mb-4">
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder={language === "marathi" ? "संत, अभंग, आरती शोधा..." : "संत, अभंग, आरती खोजें..."}
            className="rounded-xl"
          />
          <Button className="rounded-xl bg-orange-600">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            language === "marathi" ? "सर्व" : "सभी",
            language === "marathi" ? "अभंग" : "अभंग",
            language === "marathi" ? "आरती" : "आरती",
            language === "marathi" ? "ऑडिओ" : "ऑडियो",
            language === "marathi" ? "नवीन" : "नया",
            language === "marathi" ? "लोकप्रिय" : "लोकप्रिय",
          ].map((filter) => (
            <Button key={filter} variant="outline" size="sm" className="rounded-full whitespace-nowrap">
              {filter}
            </Button>
          ))}
          <Button variant="outline" size="sm" className="rounded-full">
            <Filter className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <Mic className="w-5 h-5 text-blue-600" />
            <div className="flex-1">
              <div className="text-sm font-medium text-blue-800">Voice Search</div>
              <div className="text-xs text-blue-600">{language === "marathi" ? "बोलून शोधा" : "बोलकर खोजें"}</div>
            </div>
            <Button size="sm" variant="outline" className="rounded-full">
              {language === "marathi" ? "शुरू करा" : "शुरू करें"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            {language === "marathi" ? `सर्च रिझल्ट (${getCurrentContent().length})` : `खोज परिणाम (${getCurrentContent().length})`}
          </span>
          <Button variant="ghost" size="sm">
            <Filter className="w-3 h-3 mr-1" />
            {language === "marathi" ? "फिल्टर" : "फिल्टर"}
          </Button>
        </div>

        {getCurrentContent().map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-orange-700">{item.saint || item.deity}</h4>
                    {item.isPremium && <Crown className="w-3 h-3 text-yellow-500" />}
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {item.type === "aarti" ? (language === "marathi" ? "आरती" : "आरती") : (language === "marathi" ? "अभंग" : "अभंग")}
                    </span>
                  </div>
                  <p className="text-gray-800 italic mb-1">{item.firstLine || item.title}</p>
                  <p className="text-sm text-gray-600 mb-2">{item.meaning}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <span>▶ {item.plays}</span>
                    <span>⏱ {item.duration}</span>
                    <span>🎵 {item.hasAudio ? "ऑडिओ" : "फक्त मजकूर"}</span>
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => toggleLike(item.id)}>
                  <Heart className={`w-4 h-4 ${likedContent.has(item.id) ? "text-red-500 fill-current" : ""}`} />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="rounded-full flex-1" onClick={() => playAudio(item)}>
                  <Play className="w-3 h-3 mr-1" />
                  {language === "marathi" ? "ऐका" : "सुनें"}
                </Button>
                <Button size="sm" variant="outline" className="rounded-full flex-1">
                  <BookOpen className="w-3 h-3 mr-1" />
                  {language === "marathi" ? "वाचा" : "पढ़ें"}
                </Button>
                <Button size="sm" variant="outline" className="rounded-full">
                  <Share2 className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="outline" className="rounded-full">
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
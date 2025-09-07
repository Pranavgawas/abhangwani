// src/components/SearchTab.jsx
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Search, Mic, Filter, Play, BookOpen, Share2, Download, Heart, Crown, Plus } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { searchContent } from "../data/content";

export default function SearchTab({ language, getCurrentContent, playAudio, toggleLike, likedContent, setLanguage, addToPlaylist, searchQuery, setSearchQuery }) {
  const [filteredContent, setFilteredContent] = useState([]);
  const [activeFilter, setActiveFilter] = useState("सर्व");
  const [isVoiceSearch, setIsVoiceSearch] = useState(false);

  const filters = [
    language === "marathi" ? "सर्व" : "सभी",
    language === "marathi" ? "अभंग" : "अभंग", 
    language === "marathi" ? "आरती" : "आरती",
    language === "marathi" ? "ऑडिओ" : "ऑडियो",
    language === "marathi" ? "नवीन" : "नया",
    language === "marathi" ? "लोकप्रिय" : "लोकप्रिय",
  ];

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredContent(getCurrentContent());
    } else {
      const results = searchContent(searchQuery, language);
      setFilteredContent(results);
    }
  }, [searchQuery, language, getCurrentContent]);

  // Filter functionality
  useEffect(() => {
    let content = getCurrentContent();
    
    if (searchQuery.trim()) {
      content = searchContent(searchQuery, language);
    }

    if (activeFilter === "अभंग" || activeFilter === "अभंग") {
      content = content.filter(item => item.type === "abhang");
    } else if (activeFilter === "आरती" || activeFilter === "आरती") {
      content = content.filter(item => item.type === "aarti");
    } else if (activeFilter === "ऑडिओ" || activeFilter === "ऑडियो") {
      content = content.filter(item => item.hasAudio);
    } else if (activeFilter === "लोकप्रिय" || activeFilter === "लोकप्रिय") {
      content = content.sort((a, b) => parseInt(b.plays.replace('K', '000')) - parseInt(a.plays.replace('K', '000')));
    }

    setFilteredContent(content);
  }, [activeFilter, searchQuery, language, getCurrentContent]);

  const handleVoiceSearch = () => {
    setIsVoiceSearch(true);
    // Simulate voice search (in real app, you'd use Web Speech API)
    setTimeout(() => {
      setIsVoiceSearch(false);
      setSearchQuery("गणेश आरती"); // Example search
    }, 2000);
  };

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button className="rounded-xl bg-orange-600">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((filter) => (
            <Button 
              key={filter} 
              variant={activeFilter === filter ? "default" : "outline"} 
              size="sm" 
              className="rounded-full whitespace-nowrap"
              onClick={() => setActiveFilter(filter)}
            >
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
            <Mic className={`w-5 h-5 ${isVoiceSearch ? 'text-red-600 animate-pulse' : 'text-blue-600'}`} />
            <div className="flex-1">
              <div className="text-sm font-medium text-blue-800">
                {isVoiceSearch ? (language === "marathi" ? "ऐकत आहे..." : "सुन रहे हैं...") : "Voice Search"}
              </div>
              <div className="text-xs text-blue-600">
                {isVoiceSearch ? (language === "marathi" ? "बोलत रहा..." : "बोलते रहें...") : (language === "marathi" ? "बोलून शोधा" : "बोलकर खोजें")}
              </div>
            </div>
            <Button 
              size="sm" 
              variant={isVoiceSearch ? "default" : "outline"} 
              className="rounded-full"
              onClick={handleVoiceSearch}
              disabled={isVoiceSearch}
            >
              {isVoiceSearch ? (language === "marathi" ? "ऐकत आहे" : "सुन रहे") : (language === "marathi" ? "शुरू करा" : "शुरू करें")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            {language === "marathi" ? `सर्च रिझल्ट (${filteredContent.length})` : `खोज परिणाम (${filteredContent.length})`}
          </span>
          <Button variant="ghost" size="sm">
            <Filter className="w-3 h-3 mr-1" />
            {language === "marathi" ? "फिल्टर" : "फिल्टर"}
          </Button>
        </div>

        {filteredContent.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">
              {language === "marathi" ? "कोणतेही परिणाम सापडले नाहीत" : "कोई परिणाम नहीं मिले"}
            </p>
            <p className="text-xs mt-1">
              {language === "marathi" ? "दुसरे शब्द वापरून पहा" : "अन्य शब्दों से खोजें"}
            </p>
          </div>
        ) : (
          filteredContent.map((item) => (
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
                  <Button size="sm" variant="outline" className="rounded-full" onClick={() => addToPlaylist(item)}>
                    <Plus className="w-3 h-3" />
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
          ))
        )}
      </div>
    </div>
  );
}
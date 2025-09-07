// src/components/HomeTab.jsx
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Star, Award, Bell, Play, Pause, Headphones, Share2, Download, Heart, Crown } from "lucide-react";

const categories = [
  { name: "अभंग", nameHindi: "अभंग", nameEnglish: "Abhang", icon: "📿", count: 2547 },
  { name: "आरती", nameHindi: "आरती", nameEnglish: "Aarti", icon: "🪔", count: 856 },
  { name: "भजन", nameHindi: "भजन", nameEnglish: "Bhajan", icon: "🎵", count: 1234 },
  { name: "स्तोत्र", nameHindi: "स्तोत्र", nameEnglish: "Stotra", icon: "📜", count: 445 },
];

const deities = [
  { name: "गणेश", nameHindi: "गणेश", nameEnglish: "Ganesha", icon: "🐘", aartis: 45 },
  { name: "कृष्ण", nameHindi: "कृष्ण", nameEnglish: "Krishna", icon: "🦚", aartis: 78 },
  { name: "शिव", nameHindi: "शिव", nameEnglish: "Shiva", icon: "🔱", aartis: 62 },
  { name: "राम", nameHindi: "राम", nameEnglish: "Rama", icon: "🏹", aartis: 54 },
  { name: "हनुमान", nameHindi: "हनुमान", nameEnglish: "Hanuman", icon: "💪", aartis: 38 },
  { name: "दुर्गा", nameHindi: "दुर्गा", nameEnglish: "Durga", icon: "⚔️", aartis: 29 },
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

  const getCategoryName = (category) => {
    if (language === "english") return category.nameEnglish;
    if (language === "hindi") return category.nameHindi;
    return category.name;
  };

  const getDeityName = (deity) => {
    if (language === "english") return deity.nameEnglish;
    if (language === "hindi") return deity.nameHindi;
    return deity.name;
  };

  return (
    <div className="p-4 space-y-6">
      {/* Content Language Toggle - Compact version */}
      <div className="flex justify-center">
        <div className="bg-white rounded-lg p-2 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Content:</span>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="text-sm border-0 bg-transparent focus:ring-0 font-medium"
            >
              <option value="marathi">मराठी</option>
              <option value="hindi">हिंदी</option>
              <option value="sanskrit">संस्कृत</option>
            </select>
          </div>
        </div>
      </div>

      {/* Daily Progress Card */}
      <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-green-200">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  {userStreak} Day Streak
                </span>
              </div>
              <div className="text-xs text-gray-600 mb-2">
                {dailyProgress}/5 Today's Spiritual Content
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${(dailyProgress / 5) * 100}%` }}
                ></div>
              </div>
            </div>
            <Bell className="w-5 h-5 text-green-600 ml-4" />
          </div>
        </CardContent>
      </Card>

      {/* Today's Special Content */}
      <Card className="bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-200">
        <CardContent className="p-4 lg:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-orange-600" />
            <span className="font-medium text-orange-700">Today's Special</span>
            <span className="text-xs bg-orange-200 text-orange-700 px-3 py-1 rounded-full ml-auto">
              {todayContent?.type === "aarti" ? "Aarti" : "Abhang"}
            </span>
          </div>
          
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-orange-800 text-lg">
                {todayContent?.saint || todayContent?.deity}
              </h3>
              <p className="text-gray-800 italic text-base mb-2">
                {todayContent?.firstLine || todayContent?.title}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {todayContent?.meaning}
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-orange-200">
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full bg-white hover:bg-orange-50"
                  onClick={() => playAudio(todayContent)}
                >
                  {isPlaying && currentAudio === todayContent?.id ? 
                    <Pause className="w-4 h-4" /> : 
                    <Play className="w-4 h-4" />
                  }
                  <span className="ml-2">{todayContent?.duration}</span>
                </Button>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Headphones className="w-4 h-4" />
                  <span>{todayContent?.plays}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
                  <Download className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="rounded-full h-8 w-8 p-0"
                  onClick={() => toggleLike(todayContent?.id)}
                >
                  <Heart className={`w-4 h-4 ${likedContent.has(todayContent?.id) ? "text-red-500 fill-current" : ""}`} />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
          <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <Card key={category.name} className="hover:shadow-md transition-all duration-200 cursor-pointer">
              <CardContent className="p-3 text-center">
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="font-medium text-sm">{getCategoryName(category)}</div>
                <div className="text-xs text-gray-500 mt-1">{category.count.toLocaleString()}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Popular Deities Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Popular Deities</h3>
          <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
            View All
          </Button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {deities.map((deity) => (
            <Card key={deity.name} className="min-w-[100px] hover:shadow-md transition-all duration-200 cursor-pointer">
              <CardContent className="p-3 text-center">
                <div className="text-2xl mb-2">{deity.icon}</div>
                <div className="font-medium text-xs">{getDeityName(deity)}</div>
                <div className="text-xs text-gray-500 mt-1">{deity.aartis} Aartis</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Trending Content */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Trending Now</h3>
          <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
            More
          </Button>
        </div>
        <div className="space-y-3">
          {getCurrentContent().slice(0, 3).map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer">
              <CardContent className="p-4 lg:p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-orange-700">{item.saint || item.deity}</h4>
                      {item.isPremium && <Crown className="w-4 h-4 text-yellow-500" />}
                      <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                        {item.type === "aarti" ? "Aarti" : "Abhang"}
                      </span>
                    </div>
                    <p className="text-gray-800 italic mb-3 leading-relaxed">
                      {item.firstLine || item.title}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Play className="w-3 h-3" />
                        {item.plays}
                      </span>
                      <span className="flex items-center gap-1">
                        ⏱ {item.duration}
                      </span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => playAudio(item)}
                    className="ml-4 h-10 w-10 rounded-full hover:bg-orange-50"
                  >
                    <Play className="w-4 h-4" />
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

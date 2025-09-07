import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  Settings as SettingsIcon, 
  Globe, 
  User, 
  Bell, 
  Volume2, 
  Download, 
  Shield, 
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Smartphone
} from "lucide-react";

export default function SettingsTab({ 
  user, 
  appLanguage, 
  setAppLanguage, 
  contentLanguage, 
  setContentLanguage, 
  onLogout 
}) {
  const [notifications, setNotifications] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const appLanguages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' }
  ];

  const contentLanguages = [
    { code: 'marathi', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'hindi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'sanskrit', name: 'Sanskrit', nativeName: 'संस्कृत' }
  ];

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      {/* User Profile Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">@{user.username}</p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                user.role === 'admin' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {user.role === 'admin' ? 'Administrator' : 'User'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Language Settings</h3>
          </div>
          
          <div className="space-y-4">
            {/* App Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                App Language (Interface)
              </label>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <Smartphone className="w-4 h-4" />
                <span>Like your phone's language - controls buttons, menus, etc.</span>
              </div>
              <select 
                value={appLanguage} 
                onChange={(e) => setAppLanguage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {appLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name} ({lang.nativeName})
                  </option>
                ))}
              </select>
            </div>

            {/* Content Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Language (Spiritual Content)
              </label>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <span>🕉️</span>
                <span>Language for abhangs, aartis, and spiritual texts</span>
              </div>
              <select 
                value={contentLanguage} 
                onChange={(e) => setContentLanguage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {contentLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name} ({lang.nativeName})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Preferences */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <SettingsIcon className="w-5 h-5 text-gray-600" />
            App Preferences
          </h3>
          
          <div className="space-y-4">
            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-gray-600">Daily reminders and updates</p>
                </div>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Auto Download */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium">Auto Download</p>
                  <p className="text-sm text-gray-600">Download content for offline use</p>
                </div>
              </div>
              <button 
                onClick={() => setAutoDownload(!autoDownload)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  autoDownload ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  autoDownload ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-gray-600" />}
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-600">Switch to dark theme</p>
                </div>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  darkMode ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audio Settings */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-gray-600" />
            Audio Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Audio Quality
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option value="high">High Quality (320kbps)</option>
                <option value="medium">Medium Quality (192kbps)</option>
                <option value="low">Low Quality (128kbps)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Streaming Quality
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option value="auto">Auto (Based on connection)</option>
                <option value="high">Always High</option>
                <option value="low">Always Low (Data Saver)</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <Shield className="w-5 h-5 text-gray-600" />
            Account
          </h3>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <span>Privacy Settings</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <span>Terms of Service</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <span>About BhaktiSagar</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Logout */}
      <Card>
        <CardContent className="p-6">
          <Button 
            onClick={onLogout}
            variant="outline" 
            className="w-full py-3 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>

      {/* App Info */}
      <div className="text-center text-gray-500 text-sm py-4">
        <p>BhaktiSagar v1.0.0</p>
        <p>© 2025 Divine Spiritual Collection</p>
      </div>
    </div>
  );
}

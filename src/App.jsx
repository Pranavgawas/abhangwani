// src/App.jsx
import { useState } from "react";
import { Home, Search, Heart, User, Settings } from "lucide-react";
import HomeTab from "./components/HomeTab";
import SearchTab from "./components/SearchTab";
import FavoritesTab from "./components/FavoritesTab";
import ProfileTab from "./components/ProfileTab";
import AudioPlayer from "./components/AudioPlayer";
import PremiumModal from "./components/PremiumModal";
import "./App.css";

const marathiContent = [
	{
		id: 1,
		saint: "संत तुकाराम",
		firstLine: "गुंजे श्रीहरीनामा आनंदाने",
		meaning: "हरीच्या नावाने मन आनंदाने भरते",
		duration: "3:45",
		plays: 2456,
		hasAudio: true,
		type: "abhang",
		isPremium: false,
	},
	{
		id: 2,
		deity: "श्री गणेश",
		title: "सुखकर्ता दुःखहर्ता",
		meaning: "गणपती बाप्पाची आरती",
		duration: "4:12",
		plays: 5670,
		hasAudio: true,
		type: "aarti",
		isPremium: true,
	},
	{
		id: 3,
		saint: "संत ज्ञानेश्वर",
		firstLine: "पसायदान चरण रेणू",
		meaning: "ज्ञानेश्वराची पावन वाणी",
		duration: "5:30",
		plays: 1890,
		hasAudio: true,
		type: "abhang",
		isPremium: false,
	},
];

const hindiContent = [
	{
		id: 1,
		saint: "संत तुलसीदास",
		firstLine: "राम राम जपना प्यारे",
		meaning: "राम नाम का जाप करना चाहिए",
		duration: "3:45",
		plays: 2456,
		hasAudio: true,
		type: "abhang",
		isPremium: false,
	},
	{
		id: 2,
		deity: "श्री गणेश",
		title: "गणेश जी की आरती",
		meaning: "गणपति बप्पा की आरती",
		duration: "4:12",
		plays: 5670,
		hasAudio: true,
		type: "aarti",
		isPremium: true,
	},
	{
		id: 3,
		saint: "संत कबीर",
		firstLine: "राम नाम रस पीजै",
		meaning: "राम नाम का रस पीना चाहिए",
		duration: "5:30",
		plays: 1890,
		hasAudio: true,
		type: "abhang",
		isPremium: false,
	},
];

export default function App() {
	const [activeTab, setActiveTab] = useState("home");
	const [language, setLanguage] = useState("marathi");
	const [likedContent, setLikedContent] = useState(new Set());
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentAudio, setCurrentAudio] = useState(null);
	const [userStreak, setUserStreak] = useState(7);
	const [dailyProgress, setDailyProgress] = useState(3);
	const [showPremiumModal, setShowPremiumModal] = useState(false);

	const getCurrentContent = () => {
		return language === "marathi" ? marathiContent : hindiContent;
	};

	const playAudio = (item) => {
		if (item.isPremium) {
			setShowPremiumModal(true);
			return;
		}
		setCurrentAudio(item.id);
		setIsPlaying(true);
	};

	const toggleLike = (id) => {
		const newLiked = new Set(likedContent);
		if (newLiked.has(id)) {
			newLiked.delete(id);
		} else {
			newLiked.add(id);
		}
		setLikedContent(newLiked);
	};

	const tabs = [
		{ id: "home", icon: Home, label: language === "marathi" ? "होम" : "होम" },
		{ id: "search", icon: Search, label: language === "marathi" ? "शोध" : "खोज" },
		{ id: "favorites", icon: Heart, label: language === "marathi" ? "आवडते" : "पसंदीदा" },
		{ id: "profile", icon: User, label: language === "marathi" ? "प्रोफाइल" : "प्रोफाइल" },
	];

	const renderContent = () => {
		switch (activeTab) {
			case "home":
				return (
					<HomeTab
						language={language}
						getCurrentContent={getCurrentContent}
						userStreak={userStreak}
						dailyProgress={dailyProgress}
						playAudio={playAudio}
						toggleLike={toggleLike}
						likedContent={likedContent}
						isPlaying={isPlaying}
						currentAudio={currentAudio}
						setLanguage={setLanguage}
					/>
				);
			case "search":
				return (
					<SearchTab
						language={language}
						getCurrentContent={getCurrentContent}
						playAudio={playAudio}
						toggleLike={toggleLike}
						likedContent={likedContent}
						setLanguage={setLanguage}
					/>
				);
			case "favorites":
				return (
					<FavoritesTab
						language={language}
						getCurrentContent={getCurrentContent}
						likedContent={likedContent}
						playAudio={playAudio}
						setLanguage={setLanguage}
					/>
				);
			case "profile":
				return (
					<ProfileTab
						language={language}
						userStreak={userStreak}
						likedContent={likedContent}
						setLanguage={setLanguage}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div className="app-container">
			<div className="status-bar">
				<span>9:41</span>
				<span>100%</span>
			</div>

			<div className="header">
				<div>
					<h1>BhaktiSagar</h1>
					<p>{language === "marathi" ? "आध्यात्मिक सामग्री" : "आध्यात्मिक सामग्री"}</p>
				</div>
				<button>
					<Settings className="w-5 h-5" />
				</button>
			</div>

			{isPlaying && currentAudio && (
				<AudioPlayer
					currentAudio={currentAudio}
					getCurrentContent={getCurrentContent}
					setIsPlaying={setIsPlaying}
				/>
			)}

			<div className="content">{renderContent()}</div>

			<div className="nav-bar">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						className={`nav-button ${activeTab === tab.id ? "active" : ""}`}
						onClick={() => setActiveTab(tab.id)}
					>
						<tab.icon className="w-5 h-5" />
						<span>{tab.label}</span>
						{tab.id === "favorites" && likedContent.size > 0 && (
							<div className="badge">{likedContent.size}</div>
						)}
					</button>
				))}
			</div>

			<PremiumModal
				isOpen={showPremiumModal}
				onClose={() => setShowPremiumModal(false)}
				language={language}
			/>
		</div>
	);
}
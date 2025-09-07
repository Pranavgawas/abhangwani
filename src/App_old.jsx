// src/App.jsx
import { useState, useEffect } from "react";
import { Home, Search, Heart, User, Settings } from "lucide-react";
import HomeTab from "./components/HomeTab";
import SearchTab from "./components/SearchTab";
import FavoritesTab from "./components/FavoritesTab";
import ProfileTab from "./components/ProfileTab";
import AudioPlayer from "./components/AudioPlayer";
import PremiumModal from "./components/PremiumModal";
import PlaylistModal from "./components/PlaylistModal";
import { getAllContent } from "./data/content";
import "./App.css";

export default function App() {
	const [activeTab, setActiveTab] = useState("home");
	const [language, setLanguage] = useState("marathi");
	const [likedContent, setLikedContent] = useState(new Set());
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentAudio, setCurrentAudio] = useState(null);
	const [userStreak, setUserStreak] = useState(7);
	const [dailyProgress, setDailyProgress] = useState(3);
	const [showPremiumModal, setShowPremiumModal] = useState(false);
	const [showPlaylistModal, setShowPlaylistModal] = useState(false);
	const [playlists, setPlaylists] = useState([]);
	const [selectedItemForPlaylist, setSelectedItemForPlaylist] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");

	// Load user data from localStorage
	useEffect(() => {
		const savedData = localStorage.getItem('bhaktiSagarUserData');
		if (savedData) {
			try {
				const userData = JSON.parse(savedData);
				setLanguage(userData.language || "marathi");
				setLikedContent(new Set(userData.likedContent || []));
				setPlaylists(userData.playlists || []);
				setUserStreak(userData.userStreak || 7);
				setDailyProgress(userData.dailyProgress || 3);
			} catch (error) {
				console.error('Error loading user data:', error);
			}
		}
	}, []);

	// Save user data to localStorage
	useEffect(() => {
		const userData = {
			language,
			likedContent: Array.from(likedContent),
			playlists,
			userStreak,
			dailyProgress,
			lastSaved: new Date().toISOString()
		};
		localStorage.setItem('bhaktiSagarUserData', JSON.stringify(userData));
	}, [language, likedContent, playlists, userStreak, dailyProgress]);

	const getCurrentContent = () => {
		return getAllContent(language);
	};

	const playAudio = (item) => {
		if (item.isPremium) {
			setShowPremiumModal(true);
			return;
		}
		setCurrentAudio(item.id);
		setIsPlaying(true);
		
		// Update daily progress
		setDailyProgress(prev => Math.min(prev + 1, 5));
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

	const addToPlaylist = (item) => {
		setSelectedItemForPlaylist(item);
		setShowPlaylistModal(true);
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
						addToPlaylist={addToPlaylist}
						playlists={playlists}
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
						addToPlaylist={addToPlaylist}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
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
						addToPlaylist={addToPlaylist}
						playlists={playlists}
						setPlaylists={setPlaylists}
					/>
				);
			case "profile":
				return (
					<ProfileTab
						language={language}
						userStreak={userStreak}
						likedContent={likedContent}
						setLanguage={setLanguage}
						playlists={playlists}
						dailyProgress={dailyProgress}
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
				<button onClick={() => setShowPlaylistModal(true)}>
					<Settings className="w-5 h-5" />
				</button>
			</div>

			{isPlaying && currentAudio && (
				<AudioPlayer
					currentAudio={currentAudio}
					getCurrentContent={getCurrentContent}
					setIsPlaying={setIsPlaying}
					isPlaying={isPlaying}
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

			<PlaylistModal
				isOpen={showPlaylistModal}
				onClose={() => {
					setShowPlaylistModal(false);
					setSelectedItemForPlaylist(null);
				}}
				language={language}
				playlists={playlists}
				setPlaylists={setPlaylists}
				selectedItem={selectedItemForPlaylist}
			/>
		</div>
	);
}

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
					isPlaying={isPlaying}
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

			<PlaylistModal
				isOpen={showPlaylistModal}
				onClose={() => {
					setShowPlaylistModal(false);
					setSelectedItemForPlaylist(null);
				}}
				language={language}
				playlists={playlists}
				setPlaylists={setPlaylists}
				selectedItem={selectedItemForPlaylist}
			/>
		</div>
	);
}
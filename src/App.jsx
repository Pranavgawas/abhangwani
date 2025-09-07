// src/App.jsx
import { useState, useEffect } from "react";
import { Home, Search, Heart, User, Settings } from "lucide-react";
import HomeTab from "./components/HomeTab";
import SearchTab from "./components/SearchTab";
import FavoritesTab from "./components/FavoritesTab";
import ProfileTab from "./components/ProfileTab";
import SettingsTab from "./components/SettingsTab";
import LoginForm from "./components/LoginForm";
import AudioPlayer from "./components/AudioPlayer";
import PremiumModal from "./components/PremiumModal";
import PlaylistModal from "./components/PlaylistModal";
import { getAllContent } from "./data/content";
import "./App.css";

export default function App() {
	const [user, setUser] = useState(null);
	const [activeTab, setActiveTab] = useState("home");
	const [appLanguage, setAppLanguage] = useState("en"); // App interface language
	const [contentLanguage, setContentLanguage] = useState("marathi"); // Spiritual content language
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
		const savedUser = localStorage.getItem('bhaktiSagarUser');
		const savedData = localStorage.getItem('bhaktiSagarUserData');
		
		if (savedUser) {
			try {
				setUser(JSON.parse(savedUser));
			} catch (error) {
				console.error('Error loading user data:', error);
			}
		}
		
		if (savedData) {
			try {
				const userData = JSON.parse(savedData);
				setAppLanguage(userData.appLanguage || "en");
				setContentLanguage(userData.contentLanguage || "marathi");
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
		if (user) {
			localStorage.setItem('bhaktiSagarUser', JSON.stringify(user));
		}
	}, [user]);

	useEffect(() => {
		const userData = {
			appLanguage,
			contentLanguage,
			likedContent: Array.from(likedContent),
			playlists,
			userStreak,
			dailyProgress,
			lastSaved: new Date().toISOString()
		};
		localStorage.setItem('bhaktiSagarUserData', JSON.stringify(userData));
	}, [appLanguage, contentLanguage, likedContent, playlists, userStreak, dailyProgress]);

	const handleLogin = (userData) => {
		setUser(userData);
	};

	const handleLogout = () => {
		setUser(null);
		localStorage.removeItem('bhaktiSagarUser');
		localStorage.removeItem('bhaktiSagarUserData');
		// Reset to defaults
		setAppLanguage("en");
		setContentLanguage("marathi");
		setLikedContent(new Set());
		setPlaylists([]);
		setUserStreak(0);
		setDailyProgress(0);
		setActiveTab("home");
	};

	// Show login if no user
	if (!user) {
		return <LoginForm onLogin={handleLogin} />;
	}

	const getCurrentContent = () => {
		return getAllContent(contentLanguage);
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

	const getTabLabel = (key) => {
		const labels = {
			home: { en: "Home", mr: "होम", hi: "होम" },
			search: { en: "Search", mr: "शोध", hi: "खोज" },
			favorites: { en: "Favorites", mr: "आवडते", hi: "पसंदीदा" },
			profile: { en: "Profile", mr: "प्रोफाइल", hi: "प्रोफाइल" },
			settings: { en: "Settings", mr: "सेटिंग्स", hi: "सेटिंग्स" }
		};
		return labels[key][appLanguage] || labels[key].en;
	};

	const tabs = [
		{ id: "home", icon: Home, label: getTabLabel("home") },
		{ id: "search", icon: Search, label: getTabLabel("search") },
		{ id: "favorites", icon: Heart, label: getTabLabel("favorites") },
		{ id: "profile", icon: User, label: getTabLabel("profile") },
		{ id: "settings", icon: Settings, label: getTabLabel("settings") },
	];

	const renderContent = () => {
		switch (activeTab) {
			case "home":
				return (
					<HomeTab
						language={contentLanguage}
						getCurrentContent={getCurrentContent}
						userStreak={userStreak}
						dailyProgress={dailyProgress}
						playAudio={playAudio}
						toggleLike={toggleLike}
						likedContent={likedContent}
						isPlaying={isPlaying}
						currentAudio={currentAudio}
						setLanguage={setContentLanguage}
						addToPlaylist={addToPlaylist}
						playlists={playlists}
					/>
				);
			case "search":
				return (
					<SearchTab
						language={contentLanguage}
						getCurrentContent={getCurrentContent}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						playAudio={playAudio}
						toggleLike={toggleLike}
						likedContent={likedContent}
						isPlaying={isPlaying}
						currentAudio={currentAudio}
						addToPlaylist={addToPlaylist}
						playlists={playlists}
					/>
				);
			case "favorites":
				return (
					<FavoritesTab
						language={contentLanguage}
						getCurrentContent={getCurrentContent}
						likedContent={likedContent}
						playAudio={playAudio}
						toggleLike={toggleLike}
						isPlaying={isPlaying}
						currentAudio={currentAudio}
						playlists={playlists}
						addToPlaylist={addToPlaylist}
					/>
				);
			case "profile":
				return (
					<ProfileTab
						language={contentLanguage}
						user={user}
						userStreak={userStreak}
						playlists={playlists}
						likedContent={likedContent}
						getCurrentContent={getCurrentContent}
						playAudio={playAudio}
						isPlaying={isPlaying}
						currentAudio={currentAudio}
						setPlaylists={setPlaylists}
					/>
				);
			case "settings":
				return (
					<SettingsTab
						user={user}
						appLanguage={appLanguage}
						setAppLanguage={setAppLanguage}
						contentLanguage={contentLanguage}
						setContentLanguage={setContentLanguage}
						onLogout={handleLogout}
					/>
				);
			default:
				return null;
		}
	};

	const getHeaderSubtitle = () => {
		const subtitles = {
			en: "Spiritual Content",
			mr: "आध्यात्मिक सामग्री", 
			hi: "आध्यात्मिक सामग्री"
		};
		return subtitles[appLanguage] || subtitles.en;
	};

	return (
		<div className="app-container">
			{/* Status Bar - Mobile only */}
			<div className="status-bar">
				<span>9:41</span>
				<span>📶 📶 📶 🔋 100%</span>
			</div>

			{/* Header */}
			<div className="header">
				<div>
					<h1>BhaktiSagar</h1>
					<p>{getHeaderSubtitle()}</p>
					{user && (
						<p style={{ fontSize: '0.75rem', color: '#fed7aa', marginTop: '4px' }}>
							Welcome, {user.name}
						</p>
					)}
				</div>
				<div style={{ 
					width: '48px', 
					height: '48px', 
					background: 'rgba(255, 255, 255, 0.2)', 
					borderRadius: '50%', 
					display: 'flex', 
					alignItems: 'center', 
					justifyContent: 'center',
					fontSize: '1.5rem'
				}}>
					🕉️
				</div>
			</div>

			{/* Audio Player - Fixed position when playing */}
			{isPlaying && currentAudio && (
				<AudioPlayer
					currentAudio={currentAudio}
					getCurrentContent={getCurrentContent}
					setIsPlaying={setIsPlaying}
					isPlaying={isPlaying}
				/>
			)}

			{/* Main Content */}
			<div className="content">
				{renderContent()}
			</div>

			{/* Mobile Bottom Navigation */}
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

			{/* Modals */}
			<PremiumModal
				isOpen={showPremiumModal}
				onClose={() => setShowPremiumModal(false)}
				language={contentLanguage}
			/>

			<PlaylistModal
				isOpen={showPlaylistModal}
				onClose={() => {
					setShowPlaylistModal(false);
					setSelectedItemForPlaylist(null);
				}}
				language={contentLanguage}
				playlists={playlists}
				setPlaylists={setPlaylists}
				selectedItem={selectedItemForPlaylist}
			/>
		</div>
	);
}

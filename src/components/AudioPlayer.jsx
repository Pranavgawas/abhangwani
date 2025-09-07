// src/components/AudioPlayer.jsx
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Pause, Play, Volume2, SkipBack, SkipForward, Repeat, Shuffle, VolumeX } from "lucide-react";

export default function AudioPlayer({ currentAudio, getCurrentContent, setIsPlaying, isPlaying }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const audioRef = useRef(null);
  
  const currentItem = getCurrentContent().find((a) => a.id === currentAudio);
  const currentIndex = getCurrentContent().findIndex((a) => a.id === currentAudio);
  const content = getCurrentContent();

  // Format time helper
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Simulate audio progress (in real app, you'd use actual audio events)
  useEffect(() => {
    let interval;
    if (isPlaying && currentItem) {
      // Simulate 3-5 minute duration based on item.duration
      const totalDuration = parseInt(currentItem.duration.split(':')[0]) * 60 + parseInt(currentItem.duration.split(':')[1]);
      setDuration(totalDuration);
      
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalDuration) {
            if (isRepeat) {
              return 0;
            } else {
              handleNext();
              return 0;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentItem, isRepeat]);

  const handleSeek = (e) => {
    const newTime = parseInt(e.target.value);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handlePrevious = () => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * content.length);
      // In real app, you'd update currentAudio to content[randomIndex].id
    } else {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : content.length - 1;
      // In real app, you'd update currentAudio to content[prevIndex].id
    }
    setCurrentTime(0);
  };

  const handleNext = () => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * content.length);
      // In real app, you'd update currentAudio to content[randomIndex].id
    } else {
      const nextIndex = currentIndex < content.length - 1 ? currentIndex + 1 : 0;
      // In real app, you'd update currentAudio to content[nextIndex].id
    }
    setCurrentTime(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!currentItem) return null;

  return (
    <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-3">
      {/* Progress Bar */}
      <div className="flex items-center gap-2 mb-2 text-xs">
        <span>{formatTime(currentTime)}</span>
        <div className="flex-1 relative">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-white bg-opacity-30 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #fff 0%, #fff ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) 100%)`
            }}
          />
        </div>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Main Controls */}
      <div className="flex items-center gap-3">
        {/* Previous */}
        <Button size="sm" variant="ghost" className="text-white p-1" onClick={handlePrevious}>
          <SkipBack className="w-4 h-4" />
        </Button>

        {/* Play/Pause */}
        <Button size="sm" variant="ghost" className="text-white p-1" onClick={togglePlayPause}>
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>

        {/* Next */}
        <Button size="sm" variant="ghost" className="text-white p-1" onClick={handleNext}>
          <SkipForward className="w-4 h-4" />
        </Button>

        {/* Song Info */}
        <div className="flex-1 mx-2">
          <div className="text-xs font-medium truncate">{currentItem?.saint || currentItem?.deity}</div>
          <div className="text-xs opacity-75 truncate">
            {currentItem?.firstLine || currentItem?.title}
          </div>
        </div>

        {/* Shuffle */}
        <Button 
          size="sm" 
          variant="ghost" 
          className={`text-white p-1 ${isShuffle ? 'text-yellow-300' : ''}`} 
          onClick={() => setIsShuffle(!isShuffle)}
        >
          <Shuffle className="w-3 h-3" />
        </Button>

        {/* Repeat */}
        <Button 
          size="sm" 
          variant="ghost" 
          className={`text-white p-1 ${isRepeat ? 'text-yellow-300' : ''}`} 
          onClick={() => setIsRepeat(!isRepeat)}
        >
          <Repeat className="w-3 h-3" />
        </Button>

        {/* Volume */}
        <div className="flex items-center gap-1">
          <Button size="sm" variant="ghost" className="text-white p-1" onClick={toggleMute}>
            {isMuted || volume === 0 ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
          </Button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-white bg-opacity-30 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
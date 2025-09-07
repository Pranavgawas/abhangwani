// src/components/AudioPlayer.jsx
import { Button } from "./ui/button";
import { Pause, Volume2 } from "lucide-react";

export default function AudioPlayer({ currentAudio, getCurrentContent, setIsPlaying }) {
  const currentItem = getCurrentContent().find((a) => a.id === currentAudio);

  return (
    <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 flex items-center gap-3">
      <Button size="sm" variant="ghost" className="text-white p-0" onClick={() => setIsPlaying(false)}>
        <Pause className="w-4 h-4" />
      </Button>
      <div className="flex-1">
        <div className="text-xs font-medium">{currentItem?.saint || currentItem?.deity}</div>
        <div className="text-xs opacity-75">
          {(currentItem?.firstLine || currentItem?.title)?.substring(0, 20)}...
        </div>
      </div>
      <Button size="sm" variant="ghost" className="text-white p-0">
        <Volume2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
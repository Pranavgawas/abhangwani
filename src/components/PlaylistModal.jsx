// src/components/PlaylistModal.jsx
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { X, Plus, Music, Trash2 } from "lucide-react";

export default function PlaylistModal({ isOpen, onClose, language, playlists, setPlaylists, selectedItem }) {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  if (!isOpen) return null;

  const createPlaylist = () => {
    if (newPlaylistName.trim()) {
      const newPlaylist = {
        id: Date.now(),
        name: newPlaylistName.trim(),
        items: selectedItem ? [selectedItem.id] : [],
        createdAt: new Date().toISOString()
      };
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName("");
      setShowCreateForm(false);
      if (selectedItem) {
        onClose();
      }
    }
  };

  const addToPlaylist = (playlistId) => {
    if (selectedItem) {
      setPlaylists(playlists.map(playlist => 
        playlist.id === playlistId 
          ? { ...playlist, items: [...new Set([...playlist.items, selectedItem.id])] }
          : playlist
      ));
      onClose();
    }
  };

  const deletePlaylist = (playlistId) => {
    setPlaylists(playlists.filter(p => p.id !== playlistId));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-96 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {selectedItem 
                ? (language === "marathi" ? "प्लेलिस्टमध्ये जोडा" : "प्लेलिस्ट में जोड़ें")
                : (language === "marathi" ? "प्लेलिस्ट व्यवस्थापन" : "प्लेलिस्ट प्रबंधन")
              }
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {/* Create new playlist section */}
            <div className="border-b pb-3">
              {!showCreateForm ? (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowCreateForm(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {language === "marathi" ? "नवीन प्लेलिस्ट बनवा" : "नई प्लेलिस्ट बनाएं"}
                </Button>
              ) : (
                <div className="space-y-2">
                  <Input
                    placeholder={language === "marathi" ? "प्लेलिस्ट नाव" : "प्लेलिस्ट का नाम"}
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && createPlaylist()}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={createPlaylist}>
                      {language === "marathi" ? "बनवा" : "बनाएं"}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      setShowCreateForm(false);
                      setNewPlaylistName("");
                    }}>
                      {language === "marathi" ? "रद्द करा" : "रद्द करें"}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Existing playlists */}
            {playlists.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Music className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">
                  {language === "marathi" ? "कोणतीही प्लेलिस्ट नाही" : "कोई प्लेलिस्ट नहीं"}
                </p>
              </div>
            ) : (
              playlists.map((playlist) => (
                <div key={playlist.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div 
                    className="flex-1 cursor-pointer" 
                    onClick={() => selectedItem && addToPlaylist(playlist.id)}
                  >
                    <div className="font-medium">{playlist.name}</div>
                    <div className="text-xs text-gray-500">
                      {playlist.items.length} {language === "marathi" ? "आयटम" : "आइटम"}
                    </div>
                  </div>
                  {!selectedItem && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => deletePlaylist(playlist.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

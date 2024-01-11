"use client";

import { useEffect, useState } from "react";
import { Volume1, VolumeX } from "lucide-react";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    const audioPlayer = document.querySelector("audio");
    if (audioPlayer) {
      if (audioPlayer.paused) {
        audioPlayer.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
        audioPlayer.loop = true;
      } else {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      }

      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => handleTogglePlay, []);

  return (
    <div className="flex justify-end w-full text-white px-4 py-2">
      <audio src="/Quiz.wav" className="hidden" id="audio"></audio>
      {isPlaying ? (
        <Volume1 className="w-8 h-8" onClick={handleTogglePlay} />
      ) : (
        <VolumeX className="w-8 h-8" onClick={handleTogglePlay} />
      )}
    </div>
  );
};

export default AudioPlayer;

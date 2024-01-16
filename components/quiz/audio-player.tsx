"use client";

import { useEffect, useState } from "react";
import { Volume1, VolumeX } from "lucide-react";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
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
      }
    };
    handleTogglePlay();
  }, [isPlaying]);

  return (
    <div className="flex justify-end w-full text-white py-2 col-span-1">
      <audio src="/Quiz.wav" className="hidden" id="audio"></audio>
      {isPlaying ? (
        <Volume1 className="w-8 h-8" onClick={() => setIsPlaying(true)} />
      ) : (
        <VolumeX className="w-8 h-8" onClick={() => setIsPlaying(false)} />
      )}
    </div>
  );
};

export default AudioPlayer;

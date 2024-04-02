"use client";

import { useEffect, useRef, useState } from "react";
import { Volume1, VolumeX } from "lucide-react";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  const audioPlayer = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleTogglePlay = () => {
      if (audioPlayer.current) {
        if (audioPlayer.current.paused) {
          audioPlayer.current.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
          audioPlayer.current.loop = true;
        } else {
          audioPlayer.current.pause();
          audioPlayer.current.currentTime = 0;
        }
      }
    };
    handleTogglePlay();
  }, [isPlaying]);

  return (
    <div className="flex justify-end w-full text-white py-2 col-span-1">
      <audio src="/Quiz.wav" className="hidden" ref={audioPlayer}></audio>
      {!isPlaying ? (
        <button onClick={() => setIsPlaying(true)}>
          <VolumeX className="w-8 h-8" />
        </button>
      ) : (
        <button onClick={() => setIsPlaying(false)}>
          <Volume1 className="w-8 h-8" />
        </button>
      )}
    </div>
  );
};

export default AudioPlayer;

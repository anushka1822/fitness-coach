import { useState, useRef, useEffect } from 'react';
import { Play, Square, Loader2 } from 'lucide-react';

const ELEVEN_LABS_KEY = import.meta.env.VITE_ELEVEN_LABS_KEY;
const VOICE_ID = import.meta.env.VITE_VOICE_ID;

export default function VoiceControl({ text, label }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    return () => stopAudio();
  }, [text]);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const handlePlay = async () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": ELEVEN_LABS_KEY,
          },
          body: JSON.stringify({
            text: text,
            model_id: "eleven_multilingual_v2",
            output_format: "mp3_44100_128",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75
            }
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Details:", errorData);
        throw new Error(errorData.detail?.message || "Voice API Failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);

      audioRef.current = audio;
      audio.play();
      setIsPlaying(true);
      setIsLoading(false);

      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url);
      };

    } catch (error) {
      console.error("TTS Error:", error);
      alert(`Error: ${error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePlay}
      disabled={isLoading}
      className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all
        ${isPlaying
          ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30'
          : 'bg-gray-700 text-gray-200 hover:bg-blue-600 hover:text-white'
        }
      `}
    >
      {isLoading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : isPlaying ? (
        <Square size={16} fill="currentColor" />
      ) : (
        <Play size={16} fill="currentColor" />
      )}

      {isLoading ? "Loading..." : isPlaying ? "Stop" : label}
    </button>
  );
}
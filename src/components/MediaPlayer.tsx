
import { useState, useRef } from "react";
import { FileType } from "@/types/file";
import { Play } from "lucide-react";
import { Button } from "./ui/button";

interface MediaPlayerProps {
  file: FileType;
  type: "video" | "audio";
}

export default function MediaPlayer({ file, type }: MediaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);

  const handlePlayPause = () => {
    if (!mediaRef.current) return;
    
    if (isPlaying) {
      mediaRef.current.pause();
    } else {
      mediaRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  if (type === "video") {
    return (
      <div className="media-player-container">
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          src={file.url || ""}
          controls
          className="w-full h-auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>
    );
  }

  return (
    <div className="media-player-container flex flex-col items-center p-6 w-full">
      <div className="w-full flex justify-center mb-4">
        <div className="w-40 h-40 bg-kalimaya-100 dark:bg-kalimaya-900 rounded-full flex items-center justify-center">
          <Button 
            className="h-16 w-16 rounded-full"
            variant="ghost"
            onClick={handlePlayPause}
          >
            <Play className="h-8 w-8" />
          </Button>
        </div>
      </div>
      <h3 className="text-lg font-medium mb-2">{file.name}</h3>
      <audio
        ref={mediaRef as React.RefObject<HTMLAudioElement>}
        src={file.url || ""}
        controls
        className="w-full"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}

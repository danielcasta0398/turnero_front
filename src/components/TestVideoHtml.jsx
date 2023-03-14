import React, { useState, useEffect } from "react";
import { useRef } from "react";

const TestVideoHtml = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleLoadedMetadata = () => {
    videoRef.current.play();
  };

  return (
    <video
      muted={true}
      autoPlay
      loop
      preload="auto"
      controls={false}
      ref={videoRef}
      src={src}
      onPlay={handlePlay}
      onPause={handlePause}
      onLoadedMetadata={handleLoadedMetadata}
    />
  );
};

export default TestVideoHtml;

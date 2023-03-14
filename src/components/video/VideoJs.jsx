import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoJs = () => {
  const videoRef = useRef(null);
  let player = null;

  useEffect(() => {
    if (videoRef.current) {
      player = videojs(videoRef.current, {
        controls: false,
        autoplay: true,
        preload: "auto",
        muted: true,
        loop: true,
        sources: [
          {
            src: "https://firebasestorage.googleapis.com/v0/b/wifisalesboost-a8a1a.appspot.com/o/connectingthedots%2FSnapSave.io-Repite%20conmigo_%20soy%20%C3%BAnic%40(720p).mp4?alt=media&token=8b320880-97fd-4ab2-9d27-fb1d70b62be5",
            type: "video/mp4",
          },
        ],
      });
    }
  }, [videoRef]);

  useEffect(() => {
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [player]);

  return (
    <ContVideo>
      <video
        ref={videoRef}
        className="video-js vjs-default-skin vjs-big-play-centered"
        controls
      />
    </ContVideo>
  );
};

export default VideoJs;

const ContVideo = styled.div`
  width: 90%;
  height: 50%;
  border-radius: 10px;
  overflow: hidden;

  .video-js {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

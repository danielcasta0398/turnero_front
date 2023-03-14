import React from "react";
import videojs from "video.js";
import VideoJs from "./video/VideoJs";

const TestVideo = () => {
  const playerRef = React.useRef(null);

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "https://firebasestorage.googleapis.com/v0/b/wifisalesboost-a8a1a.appspot.com/o/connectingthedots%2Fistockphoto-1400995224-640_adpp_is.mp4?alt=media&token=1b547ebb-d699-4b74-aa53-64a1769c95dc",
        type: "video/mp4",
      },
    ],
    pauseOtherPlayers: false,
  };

  return <VideoJs options={videoJsOptions} onReady={handlePlayerReady} />;
};

export default TestVideo;

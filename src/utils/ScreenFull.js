import { useNavigate } from "react-router-dom";

export const useLink = (path) => {
  const navigate = useNavigate();

  return navigate(path);
};

export const toggleFullScreen = (document) => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

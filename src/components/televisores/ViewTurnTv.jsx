import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getTurnsByTv } from "../../store/slice/televisores/televisoresThunk";
import { logOut } from "../../utils/logOutUtils";
import { useNavigate } from "react-router-dom";
import { existSession } from "../../assets/svg/svgs";
import { getDataWithToken } from "../../utils/getDataToken";
import io from "socket.io-client";

const ViewTurnTv = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { turns } = useSelector((state) => state.televisores.turnsTv);
  const { configurationData } = useSelector((state) => state.configuration);
  let { turnSound } = useSelector((state) => state.televisores);
  const [url, setUrl] = React.useState("");
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [audiosPending, setAudiosPending] = React.useState([]);
  const [turnDataCall, setTurnDataCall] = React.useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);
  const [imagesLoading, setImagesLoading] = useState(true);

  // Función para cargar imágenes (preserva el índice actual si es una actualización)
  const fetchImages = useCallback(async (preserveIndex = false, currentIdx = 0) => {
    try {
      setImagesLoading(true);
      const res = await getDataWithToken("tv/images");
      
      if (res.success && res.media && res.media.length > 0) {
        setImages(res.media);
        
        if (preserveIndex && currentIdx < res.media.length) {
          // Mantener el índice actual si es válido
          setCurrentImage(res.media[currentIdx]);
          setPreviousImage(res.media[currentIdx]);
        } else {
          // Reiniciar al inicio si es la primera carga o el índice ya no es válido
          setCurrentImage(res.media[0]);
          setPreviousImage(res.media[0]);
          setCurrentImageIndex(0);
        }
      } else {
        setImages([]);
        setCurrentImage(null);
        setPreviousImage(null);
        setCurrentImageIndex(0);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setImages([]);
      setCurrentImage(null);
      setPreviousImage(null);
    } finally {
      setImagesLoading(false);
    }
  }, []);

  // Fetch images from API on mount
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Escuchar evento socket para actualizar imágenes cuando se sincronicen
  useEffect(() => {
    const socket = io(process.env.REACT_APP_URL_SOCKET);

    const handleMediaUpdate = (data) => {
      console.log("📺 Imágenes actualizadas desde el servidor:", data);
      // Recargar las imágenes manteniendo el índice actual
      setCurrentImageIndex((prevIndex) => {
        fetchImages(true, prevIndex);
        return prevIndex;
      });
    };

    socket.on("tv-media-updated", handleMediaUpdate);

    return () => {
      socket.off("tv-media-updated", handleMediaUpdate);
      socket.disconnect();
    };
  }, [fetchImages]);

  const goToNextMedia = React.useCallback(() => {
    setPreviousImage(images[currentImageIndex]);
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImage(images[nextIndex]);
    setCurrentImageIndex(nextIndex);
  }, [images, currentImageIndex]);

  const handleVideoEnd = React.useCallback(() => {
    goToNextMedia();
  }, [goToNextMedia]);

  // Media rotation logic - handles both images and videos
  useEffect(() => {
    if (images.length <= 1) return;

    const currentMedia = images[currentImageIndex];
    
    // If current media is an image, use timer
    if (currentMedia && currentMedia.type !== "video") {
      const timer = setInterval(() => {
        goToNextMedia();
      }, 5000);

      return () => clearInterval(timer);
    }
    // For videos, we'll handle the transition on the onEnded event
  }, [currentImageIndex, images, goToNextMedia]);

  const inicio = () => {
    setIsPlaying(true);
  };

  // Helper para construir URL de audio (local o externa)
  const buildAudioUrl = (audioUrl) => {
    if (!audioUrl) return "";
    // Si es URL local (empieza con /uploads), añadir el prefijo de la API
    if (audioUrl.startsWith("/uploads/")) {
      return `${process.env.REACT_APP_URL_IMAGE}${audioUrl}`;
    }
    // Si ya es URL completa (Firebase u otra), usarla directamente
    return audioUrl;
  };

  useEffect(() => {
    if (turnSound && turnSound.url) {
      if (!isPlaying) {
        setUrl(buildAudioUrl(turnSound.url));
        setTurnDataCall(turnSound);
        setIsPlaying(true);
      } else {
        setAudiosPending(prev => [...prev, turnSound]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turnSound]);

  // Timeout de seguridad: ocultar mensaje después de 10 segundos si el audio no termina
  useEffect(() => {
    if (turnDataCall) {
      const timeout = setTimeout(() => {
        setTurnDataCall("");
        setIsPlaying(false);
        setUrl("");
      }, 10000); // 10 segundos
      
      return () => clearTimeout(timeout);
    }
  }, [turnDataCall]);

  const termino = () => {
    if (audiosPending.length > 0) {
      setUrl(buildAudioUrl(audiosPending[0].url));
      setTurnDataCall(audiosPending[0]);
      setAudiosPending(audiosPending.slice(1));
      return setIsPlaying(true);
    }
    setTurnDataCall("");
    setIsPlaying(false);
  };

  useEffect(() => {
    dispatch(getTurnsByTv());
  }, [dispatch]);

  return (
    <MainContainerTurnTv>
      {url && (
        <audio 
          src={url} 
          autoPlay 
          onPlay={inicio} 
          onEnded={termino}
        />
      )}
      <ContIconExit onClick={() => logOut(navigate)}>
        {existSession}
      </ContIconExit>

      <ContLogo>
        <img src={`${process.env.REACT_APP_URL_IMAGE}${configurationData?.logo_url}`} alt="logo" style={{ maxWidth: "300px", maxHeight: "200px" }} />
      </ContLogo>

      <ContBodyTurnTv>
        <ContTurnTv>
          {turns?.map((turno) => (
            <ContTurnTvLeft key={turno.id}>
              <p>{turno.sequence}</p>
              <p>{turno.user.name.toUpperCase()}</p>
            </ContTurnTvLeft>
          ))}
        </ContTurnTv>
        <ContVideo>
          {imagesLoading ? (
            <ContNoImages>
              <p>Cargando imágenes...</p>
            </ContNoImages>
          ) : images.length === 0 ? (
            <ContNoImages>
              <p>Debes configurar las imágenes desde el panel administrativo</p>
            </ContNoImages>
          ) : (
            <>  
              {previousImage && (
                previousImage.type === "video" ? (
                  <video
                    src={previousImage.url.startsWith('http') ? previousImage.url : `${process.env.REACT_APP_URL_IMAGE}${previousImage.url}`}
                    style={{
                      position: "absolute",
                      width: "50%",
                      height: "50%",
                      top: 0,
                      right: 0,
                      opacity: 0,
                      transition: "opacity 1s ease-in-out",
                      border: "none",
                      objectFit: "cover",
                    }}
                    muted
                    autoPlay
                    onEnded={handleVideoEnd}
                  />
                ) : (
                  <img
                    src={previousImage.url.startsWith('http') ? previousImage.url : `${process.env.REACT_APP_URL_IMAGE}${previousImage.url}`}
                    alt="Imagen anterior"
                    style={{
                      position: "absolute",
                      width: "50%",
                      height: "50%",
                      top: 0,
                      right: 0,
                      opacity: 0,
                      transition: "opacity 1s ease-in-out",
                      border: "none",
                      objectFit: "cover",
                    }}
                  />
                )
              )}
              {currentImage && (
                currentImage.type === "video" ? (
                  <video
                    src={currentImage.url.startsWith('http') ? currentImage.url : `${process.env.REACT_APP_URL_IMAGE}${currentImage.url}`}
                    style={{
                      position: "absolute",
                      width: "50%",
                      height: "50%",
                      top: 0,
                      right: 0,
                      border: "none",
                      objectFit: "cover",
                    }}
                    muted
                    autoPlay
                    onEnded={handleVideoEnd}
                  />
                ) : (
                  <img
                    src={currentImage.url.startsWith('http') ? currentImage.url : `${process.env.REACT_APP_URL_IMAGE}${currentImage.url}`}
                    alt="Imagen actual"
                    style={{
                      position: "absolute",
                      width: "50%",
                      height: "50%",
                      top: 0,
                      right: 0,
                      border: "none",
                      objectFit: "cover",
                    }}
                  />
                )
              )}
            </>
          )}
          {turnDataCall && (
            <ContOnlyTurn>
              <div id="turno">
                <p>Llamando</p>
                <p>
                  {turnDataCall?.newTurn.sequence} {turnDataCall?.user}
                </p>
              </div>
            </ContOnlyTurn>
          )}
        </ContVideo>
      </ContBodyTurnTv>
    </MainContainerTurnTv>
  );
};

export default ViewTurnTv;

const MainContainerTurnTv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
`;

const ContLogo = styled.div``;

const ContBodyTurnTv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  padding: 30px 20px;
`;

const ContTurnTv = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContVideo = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ContOnlyTurn = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 90%;
  margin-right: 20px;

  #turno {
    animation: zoom 2s infinite;
  }

  @keyframes zoom {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: aliceblue;
    width: 100%;
    padding: 20px;
    border-radius: 20px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

  p {
    font-size: 3em;
    font-weight: 700;
    width: 75%;
    text-align: center;
  }
`;

const ContTurnTvLeft = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  width: 90%;
  height: 15%;
  background-color: var(--color-primary);
  border-radius: 20px;
  margin-bottom: 20px;

  p {
    color: white;
    font-size: 2.5em;
    font-weight: 700;
    width: 55%;
    text-align: center;
    line-height: 45px;
  }

  p:nth-child(1) {
    font-size: 3.5em;
    width: 45%;
  }
`;

const ContIconExit = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;

  svg {
    cursor: pointer;
    width: 30px;
    height: 30px;
    margin: 20px;

    path {
      stroke: #cecece;
    }
  }
`;

const ContNoImages = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border: 2px dashed #dee2e6;
  border-radius: 10px;
  
  p {
    color: #6c757d;
    font-size: 1.2em;
    text-align: center;
    font-weight: 500;
    padding: 20px;
    line-height: 1.5;
  }
`;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import logo from "../../assets/logos/logo.png";
import { getTurnsByTv } from "../../store/slice/televisores/televisoresThunk";
import TestVideo from "../TestVideo";
import TestVideoHtml from "../TestVideoHtml";

const ViewTurnTv = () => {
  const dispatch = useDispatch();
  const { turns } = useSelector((state) => state.televisores.turnsTv);
  let { turnSound } = useSelector((state) => state.televisores);
  const [url, setUrl] = React.useState("");
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [audiosPending, setAudiosPending] = React.useState([]);
  const [turnDataCall, setTurnDataCall] = React.useState("");

  const inicio = () => {
    console.log("inicio");
    setIsPlaying(true);
  };

  useEffect(() => {
    console.log(turnSound);
    if (turnSound && !isPlaying && turnSound.url) {
      console.log("hay sonido");
      console.log(turnSound.url);
      setUrl(turnSound.url);
      setTurnDataCall(turnSound);
      setIsPlaying(true);
    } else if (turnSound.url) {
      console.log("no hay sonido");
      console.log(turnSound);
      setAudiosPending(audiosPending.concat(turnSound));
      console.log(audiosPending);
    }
  }, [turnSound]);

  const termino = () => {
    if (audiosPending.length > 0) {
      setUrl(audiosPending[0].url);
      setTurnDataCall(audiosPending[0]);
      setAudiosPending(audiosPending.slice(1));
      return setIsPlaying(true);
    }
    setTurnDataCall("");
    setIsPlaying(false);
  };

  useEffect(() => {
    dispatch(getTurnsByTv());
  }, []);

  return (
    <MainContainerTurnTv>
      {url && <audio src={url} autoPlay onPlay={inicio} onEnded={termino} />}

      <ContLogo>
        <img src={logo} alt="logo" />
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
          <TestVideo />
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
  align-items: center;
`;

const ContOnlyTurn = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;

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
  }
`;

const ContTurnTvLeft = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  width: 90%;
  height: 10%;
  background-color: var(--color-primary);
  border-radius: 20px;
  margin-bottom: 20px;

  p {
    color: white;
    font-size: 2em;
    font-weight: 700;
    width: 55%;
    text-align: center;
  }

  p:nth-child(1) {
    font-size: 2.5em;
    width: 45%;
  }
`;

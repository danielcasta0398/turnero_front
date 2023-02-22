import Lottie from "lottie-react";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import loading from "../assets/animationsJson/loading.json";

const Loading = () => {
  const lottieRef = useRef();
  useEffect(() => {
    lottieRef.current.setSpeed(1);
  }, []);

  return (
    <MainContLoading>
      <Lottie lottieRef={lottieRef} animationData={loading} />
    </MainContLoading>
  );
};

export default Loading;

const MainContLoading = styled.div``;

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import loading from "../assets/animationsJson/loading4.json";
import Lottie from "lottie-react";

const Loading4 = () => {
  const lottieRef = useRef();
  useEffect(() => {
    lottieRef.current.setSpeed(1.5);
  }, []);

  return (
    <MainContLoading>
      <Lottie lottieRef={lottieRef} animationData={loading} loop={true} />
    </MainContLoading>
  );
};

export default Loading4;

const MainContLoading = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 200px;
    height: 200px;
  }
`;

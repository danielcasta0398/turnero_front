import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import loading from "../assets/animationsJson/loading3.json";
import Lottie from "lottie-react";

const Loading3 = () => {
  const lottieRef = useRef();
  useEffect(() => {
    lottieRef.current.setSpeed(1);
  }, []);

  return (
    <MainContLoading>
      <Lottie lottieRef={lottieRef} animationData={loading} loop={true} />
    </MainContLoading>
  );
};

export default Loading3;

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

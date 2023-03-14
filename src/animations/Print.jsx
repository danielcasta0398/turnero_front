import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import print from "../assets/animationsJson/printer.json";
import Lottie from "lottie-react";

const Print = () => {
  const lottieRef = useRef();
  useEffect(() => {
    lottieRef.current.setSpeed(1);
  }, []);

  return (
    <MainContLoading>
      <Lottie lottieRef={lottieRef} animationData={print} loop={true} />
    </MainContLoading>
  );
};

export default Print;

const MainContLoading = styled.div`
  width: 100px !important;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 450px !important;
    position: relative !important;
    right: 0 !important;
  }

  div {
  }
`;

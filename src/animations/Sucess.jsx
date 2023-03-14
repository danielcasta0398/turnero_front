import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import sucess from "../assets/animationsJson/sucess.json";
import Lottie from "lottie-react";

const Sucess = () => {
  const lottieRef = useRef();
  useEffect(() => {
    lottieRef.current.setSpeed(1);
  }, []);

  return (
    <MainContLoading>
      <Lottie lottieRef={lottieRef} animationData={sucess} loop={false} />
    </MainContLoading>
  );
};

export default Sucess;

const MainContLoading = styled.div`
  width: 100px !important;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 200px !important;
    position: relative !important;
    right: 0 !important;
  }

  div {
  }
`;

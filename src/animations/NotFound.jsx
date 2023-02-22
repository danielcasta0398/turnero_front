import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import notFound from "../assets/animationsJson/notfound.json";
import Lottie from "lottie-react";

const NotFound = () => {
  const lottieRef = useRef();
  useEffect(() => {
    lottieRef.current.setSpeed(1);
  }, []);

  return (
    <MainContLoading>
      <Lottie lottieRef={lottieRef} animationData={notFound} loop={true} />
    </MainContLoading>
  );
};

export default NotFound;

const MainContLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    margin-top: -100px;
    width: 400px;
    height: 300px;
  }
`;

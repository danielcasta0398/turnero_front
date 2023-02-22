import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import notFound from "../assets/animationsJson/notfound1.json";
import Lottie from "lottie-react";

const NotFound1 = () => {
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

export default NotFound1;

const MainContLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 300px;
    height: 300px;
  }
`;

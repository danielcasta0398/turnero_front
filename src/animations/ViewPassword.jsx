import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import password from "../assets/animationsJson/password.json";
import Lottie from "lottie-react";
import InputBasic from "../components/inputs/InputBasic";
import ButtonBasic from "../components/buttons/ButtonBasic";
import { getDataStorage } from "../utils/getDataStorage";
import axios from "axios";

const ViewPassword = ({ id }) => {
  const lottieRef = useRef();

  const [active, setActive] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  // Para modificar los valores de la animación
  useEffect(() => {
    lottieRef.current.setSpeed(2);

    if (isView) {
      lottieRef.current.playSegments([35, 50], true);
      setActive(true);
    } else if (!active) {
      lottieRef.current.goToAndStop(33, true);
    } else {
      setActive(true);
      lottieRef.current.playSegments([0, 33], true);
    }
  }, [isView]);

  // Es el evento para poder ver la contraseña de los usuarios
  const onSubmit = async (e) => {
    e.preventDefault();
    const {
      user: { username },
      token,
    } = await getDataStorage("user");
    const password = e.target.password.value;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = {
      username,
      password,
    };

    try {
      const resData = await axios.post(
        `${process.env.REACT_APP_LINK_API}/usuarios/confirmviewpasswordusers`,
        data,
        config
      );
      console.log(resData);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const verifyNumberCharacters = (e) => {
    const target = e.target;
    if (target.value.length >= 8) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <MainContLoading
      onClick={(e) => {
        setIsLogin(true);
        /*const target = e.target;
        const parent = target.closest(`#user${id}`);
        isView
          ? (parent.children[0].type = "password")
          : (parent.children[0].type = "text");

        setIsView(!isView);*/
      }}
    >
      {isLogin && (
        <ContainerPassword ref={ref}>
          <p>
            Por favor ingresa tu contraseña para ver la información de otros
            usuarios. Solo queremos confirmar que eres tú y que nadie más está
            accediendo a esta información.
          </p>
          <form onSubmit={onSubmit}>
            <div>
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                name="password"
                onChange={verifyNumberCharacters}
              />
            </div>

            <ButtonBasic
              textButton="Enviar"
              styl={{
                marginTop: "0px",
                width: "30%",
                height: "35px",
                fontSize: "0.8em",
              }}
              isDisabled={disabled}
            />
          </form>
        </ContainerPassword>
      )}
      <Lottie lottieRef={lottieRef} animationData={password} loop={false} />
    </MainContLoading>
  );
};

export default ViewPassword;

const MainContLoading = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
  position: relative;

  div {
    width: 25px;
    height: 25px;
  }
`;

const ContainerPassword = styled.div`
  width: 300px !important;
  height: 200px !important;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  position: absolute;
  bottom: -110px;
  left: 0;
  z-index: 4;
  border-radius: 10px;
  cursor: default;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 10px;

  p {
    font-size: 0.8em;
    font-weight: 500;
    width: 90%;
    background-color: #e3ffe3;
    padding: 10px;
    color: green;
    border-radius: 10px;
  }

  form {
    display: flex;
    justify-content: center;
    gap: 10px;

    div {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;

      input {
        width: 100% !important;
        height: 35px;
        border: 1px solid #e8f0fe;
        border-radius: 5px;
        padding: 0 10px;
        outline: none;

        &::placeholder {
          font-size: 0.8em;
        }
      }
    }
  }
`;

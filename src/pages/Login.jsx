import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../animations/Loading";
import MsgError from "../components/alerts/MsgError";
import ButtonBasic from "../components/buttons/ButtonBasic";
import {
  ContainerForm,
  MaintContainer,
} from "../components/containers/MainContainer";
import InputBasic from "../components/inputs/InputBasic";
import logo from "../assets/logos/logo.png";
import { loginUser } from "../store/slice/users";
import styled from "styled-components";
import { useCheckSession } from "../hooks/useCheckSession";

const Login = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);
  const loading = useSelector((state) => state.loading);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [errEmail, setErrEmail] = useState(false);
  const [errPassword, setErrPassword] = useState(false);

  // Este Hook se ejecuta cuando se carga la pagina y verifica si hay una sesion activa
  useCheckSession([], "/login");

  // Este useEffect se ejecuta cuando le dan click al boton de iniciar sesion
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ username: user.toLowerCase(), password }));
  };

  const validateForm = (event) => {
    if (event.name === "user") {
      if (event.value.length < 4 && event.value.length !== 0) {
        setErrEmail(true);
      } else if (password.length >= 4 && event.value.length !== 0) {
        setErrEmail(false);
        return setIsDisabled(false);
      } else {
        setErrEmail(false);
      }
    }

    if (event.name === "password") {
      if (event.value.length < 4 && event.value.length > 0) {
        setErrPassword(true);
      } else {
        setErrPassword(false);
      }
    }

    if (!errEmail) {
      if (event.name === "password" && event.value.length >= 4) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }
  };

  return (
    <MaintContainer
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <ImgLogo src={logo} alt="logo" style={{}} />
      {
        <ContainerForm>
          {loading ? (
            <Loading />
          ) : (
            <>
              {loginState.error === 1003 && (
                <MsgError
                  text="No podemos iniciar sesión con esas credenciales. verifica tu usuario y
        contraseña e inténtalo de nuevo."
                />
              )}

              <h1>Iniciar Sesion</h1>
              <form onSubmit={onSubmit} style={{ padding: "5px" }}>
                <InputBasic
                  label="Usuario*"
                  placeholder="Ingresa tu usuario"
                  autoFocus={true}
                  value={user}
                  spellCheck={false}
                  onChange={(e) => {
                    setUser(e.target.value);
                    validateForm(e.target);
                  }}
                  textError={
                    errEmail && "El usuario debe tener al menos 4 caracteres"
                  }
                  nameInput="user"
                />
                <InputBasic
                  label="Contraseña*"
                  placeholder="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validateForm(e.target);
                  }}
                  textError={
                    errPassword &&
                    "La contraseña debe tener al menos 4 caracteres"
                  }
                  nameInput="password"
                />

                <ButtonBasic
                  textButton="Iniciar Sesion"
                  isDisabled={isDisabled}
                />
              </form>
            </>
          )}
        </ContainerForm>
      }
    </MaintContainer>
  );
};

export default Login;

const ImgLogo = styled.img`
  width: 300px;
`;

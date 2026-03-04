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
import { loginUser } from "../store/slice/users";
import styled from "styled-components";
import { useCheckSession } from "../hooks/useCheckSession";

const Login = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);
  const loading = useSelector((state) => state.loading);
  const {logo_url} = useSelector((state) => state.configuration.configurationData) || {};
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  // Este Hook se ejecuta cuando se carga la pagina y verifica si hay una sesion activa
  useCheckSession([], "#/login");

  // Este useEffect se ejecuta cuando le dan click al boton de iniciar sesion
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ username: user.toLowerCase(), password }));
  };

  const validateForm = (event) => {
    const currentUser = event.name === "user" ? event.value : user;
    const currentPassword = event.name === "password" ? event.value : password;

    // Habilitar botón si ambos campos tienen al menos 1 caracter
    if (currentUser.length > 0 && currentPassword.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  console.log(`${process.env.REACT_APP_URL_IMAGE}${logo_url}`);

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
      <ImgLogo src={`${process.env.REACT_APP_URL_IMAGE}${logo_url}`} alt="logo" style={{}} />
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

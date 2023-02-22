import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getDataWithToken } from "../../utils/getDataToken";
import InputLine from "../inputs/InputLine";
import SelectLine from "../inputs/SelectLine";
import ButtonBasic from "../buttons/ButtonBasic";
import Modal from "../modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../store/slice/users";
import Loading3 from "../../animations/Loading3";
import { setMessage } from "../../store/slice/messages";

const CreateConsultorio = () => {
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);
  const [nameUser, setNameUser] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [errorPassword, setErrorPassword] = useState("");
  const loading = useSelector((state) => state.loading);
  const message = useSelector((state) => state.message);
  const userData = useSelector((state) => state.users.userData);

  useEffect(() => {
    getDataWithToken("rols/mostrar", "GET").then((res) => {
      const roles = res.roles_totales.map((rol) => {
        return { value: rol.id, label: rol.nombreRol };
      });

      setRoles(roles);
    });
  }, []);

  const validatePassword = (e) => {
    if (e.target.value !== password) {
      setErrorPassword({
        message: "Las contraseñas no coinciden",
        value: "repeatPassword",
      });
    } else {
      setErrorPassword("");
      console.log("Las contraseñas coinciden");
    }
  };

  useEffect(() => {
    if (password.length < 8 && password.length > 0) {
      setErrorPassword({
        message: "La contraseña debe tener al menos 8 caracteres",
        value: "password",
      });
    } else {
      setErrorPassword("");
    }
  }, [password]);

  useEffect(() => {
    if (nameUser && user && password && repeatPassword === password) {
      dispatch(setMessage(""));
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [nameUser, user, password, repeatPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setMessage(""));
    dispatch(
      createUser({
        name: nameUser.toLocaleLowerCase().trim(),
        username: user,
        password,
        rol: 5,
      })
    );
  };

  useEffect(() => {
    if (userData.status === "200") {
      setNameUser("");
      setUser("");
      setPassword("");
      setRepeatPassword("");
      setDisabled(true);
    }
  }, [userData]);

  return (
    <>
      {userData.status === "200" && (
        <MessageSuccess>Consultorio Creado Correctamente</MessageSuccess>
      )}
      <MainContainerCreateUser sucess={userData.status}>
        <h1>Crear Consultorio</h1>
        <form onSubmit={handleSubmit}>
          <InputLine
            type="text"
            textName="Nombre"
            name="name"
            value={nameUser}
            onChange={(e) => {
              setNameUser(e.target.value);
            }}
            textError={
              (message.value == "name" || message.value == "existTwo") &&
              message.message
            }
          />
          <InputLine
            type="text"
            textName="Usuario"
            name="username"
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
            textError={
              (message.value == "username" || message.value == "existTwo") &&
              message.message
            }
          />
          <InputLine
            type="password"
            textName="Contraseña"
            value={password}
            textError={
              errorPassword.value == "password" && errorPassword.message
            }
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputLine
            type="password"
            textName="Confirmar contraseña"
            value={repeatPassword}
            textError={
              errorPassword.value == "repeatPassword" && errorPassword.message
            }
            onChange={(e) => {
              setRepeatPassword(e.target.value);
              validatePassword(e);
            }}
          />
          <ButtonBasic
            textButton={loading ? <Loading3 /> : "Crear consultorio"}
            isDisabled={disabled}
            colorDisabled={
              loading && { status: true, color: "var(--colorprimary-button)" }
            }
          />
        </form>
      </MainContainerCreateUser>
    </>
  );
};

export default CreateConsultorio;

const MainContainerCreateUser = styled.div`
  padding: ${(props) => (props.sucess ? "0px 40px 40px 40px;" : "40px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  position: relative;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
  }

  h1 {
    color: var(--color-primary);
    font-size: 2em;
    font-weight: 400;
  }

  button {
    width: 80%;
    margin: 0;
  }
`;

const MessageSuccess = styled.p`
  background-color: #c1f1c1;
  padding: 5px;
  border-radius: 10px;
  width: 80%;
  margin: auto;
  margin-top: 15px;
  margin-bottom: 18px;
  text-align: center;
  color: #0d6a0d;
`;

import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import styled from "styled-components";
import { getDataWithToken } from "../../utils/getDataToken";

const ComponentEditProfile = ({ id }) => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState(""); // Estado para el valor del TextField 'Usuario'
  const [name, setName] = useState(""); // Estado para el valor del TextField 'Nombre'

  useEffect(() => {
    getDataWithToken(`users/user/${id}`, "GET").then((res) => {
      setUser(res.user);
      setUsername(res.user.username); // Actualizamos el estado del username cuando los datos estén disponibles
      setName(res.user.name); // Actualizamos el estado del nombre cuando los datos estén disponibles
    });
  }, []);

  const changePass = (e) => {
    e.preventDefault();

    const password = e.target.password.value;
    const repeatPassword = e.target.repeatPassword.value;

    if (password !== repeatPassword) {
      console.log("No Coinciden");
      return "No coinciden";
    }
  };

  return (
    <MainChangePassword onSubmit={changePass}>
      <h2>Editar Usuario</h2>
      <TextField
        label="Usuario"
        type="text"
        name="user"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        variant="outlined"
      />
      <TextField
        label="Nombre"
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)} // Corrección: actualiza el estado de 'name'
        variant="outlined"
      />
      <ButtonPrimary
        type="submit"
        style={{ borderRadius: "5px", padding: "10px 0" }}
      >
        Cambiar Datos
      </ButtonPrimary>
    </MainChangePassword>
  );
};

export default ComponentEditProfile;

const MainChangePassword = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  h2 {
    font-size: 1.5em;
  }
`;

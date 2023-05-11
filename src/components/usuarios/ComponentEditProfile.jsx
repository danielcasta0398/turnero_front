import { Alert, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import styled from "styled-components";
import { getDataWithToken } from "../../utils/getDataToken";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../store/slice/users/usersThunk";
import Sucess from "../../animations/Sucess";

const ComponentEditProfile = ({ id }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(""); // Estado para el valor del TextField 'Usuario'
  const [name, setName] = useState(""); // Estado para el valor del TextField 'Nombre'
  const { stateEditUser, success } = useSelector((state) => state.states);

  console.log(success);

  useEffect(() => {
    getDataWithToken(`users/user/${id}`, "GET").then((res) => {
      setUsername(res.user.username); // Actualizamos el estado del username cuando los datos estén disponibles
      setName(res.user.name); // Actualizamos el estado del nombre cuando los datos estén disponibles
    });
  }, [id]);

  const editProfile = async (e) => {
    e.preventDefault();
    dispatch(editUser(id, { username, name }));
  };

  return (
    <>
      {success ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sucess />
          <h2 style={{ textAlign: "center" }}>
            Los cambios se han realizado con éxito
          </h2>
        </div>
      ) : (
        <MainChangePassword onSubmit={editProfile}>
          {stateEditUser.state && (
            <Alert severity="error">{stateEditUser.message}</Alert>
          )}
          <h2>Editar Usuario</h2>
          <TextField
            label="Usuario"
            type="text"
            name="username"
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
      )}
    </>
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

import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import styled from "styled-components";
import { getDataWithToken } from "../../utils/getDataToken";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../store/slice/users/usersThunk";
import Sucess from "../../animations/Sucess";
import { getAllTvs } from "../../store/slice/televisores/televisoresThunk";


const ComponentEditProfile = ({ id }) => {
  const dispatch = useDispatch();

  const [roleId, setRoleId] = useState(""); // Estado para el valor del TextField 'Rol'
  const [username, setUsername] = useState(""); // Estado para el valor del TextField 'Usuario'
  const [name, setName] = useState(""); // Estado para el valor del TextField 'Nombre'
  const [tvId, setTvId] = useState(""); // Estado para el valor del TextField 'Televisor'

  const { stateEditUser, success } = useSelector((state) => state.states);
  const televisores = useSelector((state) => state.televisores.tvs);


  const handleTvChange = (event) => {
    setTvId(event.target.value);
  };



  useEffect(() => {
    getDataWithToken(`users/user/${id}`, "GET").then((res) => {
      setUsername(res.user.username); // Actualizamos el estado del username cuando los datos estén disponibles
      setName(res.user.name); // Actualizamos el estado del nombre cuando los datos estén disponibles
      setTvId(res.user.tvId);

      setRoleId(res.user.roleId); // Actualizamos el estado del rol cuando los datos estén disponibles
    });
  }, [id]);

  useEffect(() => {
    dispatch(getAllTvs());

  }, [dispatch]);

  const editProfile = async (e) => {
    e.preventDefault();
    // Determinar qué datos enviar según el rol
    const userData = { username, name };
    
    // Solo usuarios consultorio (rol 2, 4, 5) pueden editar televisor
    if (roleId === 2 || roleId === 4 || roleId === 5) {
      userData.tvId = tvId;
    }
    
    // Usuarios televisor (rol 3) solo editan datos básicos, sin selectores
    
    dispatch(editUser(id, userData));
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
          {/* Selector de Televisor - Solo para usuarios consultorio (rol 2, 4, 5) */}
          {(roleId === 2 || roleId === 4 || roleId === 5) && (
            <FormControl fullWidth>
              <InputLabel
                id="tv-select-label"
                sx={{ backgroundColor: "white" }}
              >
                Televisor
              </InputLabel>
              <Select
                labelId="tv-select-label"
                id="tv-select"
                value={tvId}
                label="Televisor"
                onChange={handleTvChange}
              >
                <MenuItem value="">
                  <em>Sin televisor</em>
                </MenuItem>
                {televisores?.users?.map((tv) => (
                  <MenuItem key={tv.id} value={tv.id}>{tv.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

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

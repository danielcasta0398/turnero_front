import { Alert, Box, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../animations/Loading";
import { setState } from "../../store/slice/states";
import { getDataWithToken } from "../../utils/getDataToken";
import Sucess from "../../animations/Sucess";
import { useState } from "react";

const ComponentDeleteUser = ({ id, name }) => {
  const dispatch = useDispatch();
  const [sucess, setSucess] = useState(false);
  const [noMatch, setNoMatch] = useState(false);
  const { isLoadingOptions } = useSelector((state) => state.states);

  console.log(name);

  const closeModal = () => {
    dispatch(setState({ option: "isLoadingOptions", value: false }));
    dispatch(setState({ option: "activeModalUserId", value: null }));
    dispatch(setState({ option: "activeModalType", value: null }));
  };

  const changePass = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const repeatPassword = e.target.repeatPassword.value;

    if (password !== repeatPassword) {
      return setNoMatch(true);
    }

    dispatch(setState({ option: "isLoadingOptions", value: true }));

    try {
      await getDataWithToken(`users/changepassword/${id}`, "PUT", {
        password,
      });

      setSucess(true);
      setTimeout(() => {
        closeModal();
        setSucess(false);
      }, 4000);
    } catch (error) {}
  };

  return (
    <MainChangePassword onSubmit={changePass}>
      {isLoadingOptions ? (
        sucess ? (
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
              La contraseña se cambio correctamente
            </h2>
          </div>
        ) : (
          <Loading />
        )
      ) : (
        <>
          {noMatch && (
            <Alert severity="error">Las contraseñas no coinciden.</Alert>
          )}
          <h2>Eliminar Usuario</h2>
          <Typography color="gray">
            Seguro quieres elimnar el usuario{" "}
            <Box sx={{ color: "black" }}>{name} ?</Box>
          </Typography>
          <Stack
            direction="row"
            justifyContent="end"
            spacing={2}
            sx={{ width: "100%" }}
          >
            <ButtonPrimary onClick={closeModal}>Cancelar</ButtonPrimary>
            <ButtonPrimary style={{ backgroundColor: "#f54040" }}>
              Eliminar
            </ButtonPrimary>
          </Stack>
        </>
      )}
    </MainChangePassword>
  );
};

export default ComponentDeleteUser;

const MainChangePassword = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  h2 {
    font-size: 1.5em;
  }
`;

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
import { deleteUser } from "../../store/slice/users/usersThunk";

const ComponentDeleteUser = ({ id, name }) => {
  const dispatch = useDispatch();
  const { isLoadingOptions } = useSelector((state) => state.states);

  const closeModal = () => {
    dispatch(setState({ option: "isLoadingOptions", value: false }));
    dispatch(setState({ option: "activeModalUserId", value: null }));
    dispatch(setState({ option: "activeModalType", value: null }));
  };

  const actionDeleteUser = async (e) => {
    e.preventDefault();
    dispatch(deleteUser(id));
  };

  return (
    <MainChangePassword onSubmit={actionDeleteUser}>
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

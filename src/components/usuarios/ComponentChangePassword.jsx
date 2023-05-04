import { Alert, TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../animations/Loading";
import { setState } from "../../store/slice/states";
import { getDataWithToken } from "../../utils/getDataToken";
import Sucess from "../../animations/Sucess";
import { useState } from "react";

const ComponentChangePassword = ({ id }) => {
  const dispatch = useDispatch();
  const [sucess, setSucess] = useState(false);
  const [noMatch, setNoMatch] = useState(false);
  const { isLoadingOptions } = useSelector((state) => state.states);

  const changePass = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const repeatPassword = e.target.repeatPassword.value;

    if (password !== repeatPassword) {
      return setNoMatch(true);
    }

    dispatch(setState({ option: "isLoadingOptions", value: true }));

    try {
      const data = await getDataWithToken(`users/changepassword/${id}`, "PUT", {
        password,
      });

      setTimeout(() => {
        setSucess(true);
      }, 1000);

      setTimeout(() => {
        setSucess(false);
        dispatch(setState({ option: "isLoadingOptions", value: false }));
        dispatch(setState({ option: "isActiveModal", value: false }));
      }, 4000);

      console.log(data);
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
          <h2>Cambiar Contraseña</h2>
          <TextField label="Contraseña" type="password" name="password" />
          <TextField
            label="Repetir Contraseña"
            type="password"
            name="repeatPassword"
          />
          <ButtonPrimary
            type="submit"
            style={{ borderRadius: "5px", padding: "10px 0" }}
          >
            Cambiar Contraseña
          </ButtonPrimary>
        </>
      )}
    </MainChangePassword>
  );
};

export default ComponentChangePassword;

const MainChangePassword = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  h2 {
    font-size: 1.5em;
  }
`;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Loading2 from "../../animations/Loading2";
import NotFound from "../../animations/NotFound";
import { setDataTurneros } from "../../store/slice/turneros/turnero.slice";
import {
  getAllButtonsByUser,
  getAllTurneros,
} from "../../store/slice/turneros/turneroThunk";
import {
  getAllUsers,
  getUsersByRol,
  setTurneros,
} from "../../store/slice/users";
import { upperCase } from "../../utils/upperCase";
import ButtonBasic from "../buttons/ButtonBasic";
import RowTable from "../table/RowTable";
import BasicTabs from "../tabs/BasicTabs";
import TestViewButtons from "./TestViewButtons";

const ViewTurnos = () => {
  const dispatch = useDispatch();
  const resUsers = useSelector((state) => state.users);
  const {
    turneros: { users: turneros },
    isLoading,
    viewButtons,
  } = useSelector((state) => state.turnero);

  const changeViewButtons = (id) => {
    dispatch(getAllButtonsByUser(id));
    dispatch(setDataTurneros({ option: "viewButtons", value: !viewButtons }));
    dispatch(setDataTurneros({ option: "idUser", value: id }));
  };

  useEffect(() => {
    dispatch(getAllTurneros());
  }, [dispatch]);

  if (isLoading) {
    return <Loading2 />;
  }

  return (
    <ContainerPrincipalViewUser>
      {resUsers.msgError && resUsers.msgError.code === 101 ? (
        <ContainerNotFount>
          <NotFound />
          <p>No hay ningun Turno Pendiente</p>
        </ContainerNotFount>
      ) : (
        <MainContVieTurns>
          <BasicTabs />
        </MainContVieTurns>
      )}
    </ContainerPrincipalViewUser>
  );
};

export default ViewTurnos;

const ContainerPrincipalViewUser = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const MainContVieTurns = styled.div``;

const ContainerNameTable = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 2px solid #e8f0fe;
  display: flex;
  align-items: center;
  padding: 20px;

  p {
    font-weight: 500;
    color: #5f6368;
  }
`;

const ContainerOnlyUser = styled.div`
  height: 50px;
  padding: 0 20px;
  display: flex;
`;

const ContainerImgUser = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 1em;

  div {
    width: 30px;
    height: 30px;
    background-color: blue;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 500;
  }
`;

const ContainerPassword = styled.div`
  width: 25%;
  display: flex;
  justify-content: space-between;
  padding-right: 20px;

  input {
    max-width: 80%;
    background-color: none;
    border: none;

    &:disabled {
      background-color: transparent;
    }
  }
`;

const ContAllUsersTable = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const ContainerNotFount = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 2em;
    color: #5f6368;
  }
`;

const ContainerSession = styled.div`
  display: flex;
  align-items: center;
  width: 20%;

  p {
    background-color: ${(props) => (props.session ? "#b2e7b2" : "#fdb8b8")};
    padding: 2px 10px;
    border-radius: 20px;
    color: ${(props) => (props.session ? "#2e7d32" : "#c62828")};
  }
`;

const ContainerConfig = styled.div`
  display: flex;
  width: 20%;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;

  /*height: 50%;
    margin: 0;
    font-size: 1em;}}*/
`;

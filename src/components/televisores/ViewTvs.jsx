import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Loading2 from "../../animations/Loading2";
import NotFound from "../../animations/NotFound";
import { getAllTvs } from "../../store/slice/televisores/televisoresThunk";
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
import TestViewButtons from "./TestViewButtons";

const ViewTvs = () => {
  const dispatch = useDispatch();
  const resUsers = useSelector((state) => state.users);
  const { isLoadingTv, tvs } = useSelector((state) => state.televisores);

  const changeViewButtons = (id) => {
    dispatch(getAllButtonsByUser(id));
  };

  useEffect(() => {
    dispatch(getUsersByRol(3));
    dispatch(getAllTvs());
  }, [dispatch]);

  if (isLoadingTv) {
    return <Loading2 />;
  }

  return (
    <ContainerPrincipalViewUser>
      {resUsers.msgError && resUsers.msgError.code === 101 ? (
        <ContainerNotFount>
          <NotFound />
          <p>No hay ningun turnero creado</p>
        </ContainerNotFount>
      ) : (
        <>
          <ContainerNameTable>
            <p style={{ width: "20%" }}>Usuario</p>
            <p style={{ width: "20%" }}>Nombre</p>
            <p style={{ width: "20%" }}>Rol</p>
            <p style={{ width: "20%" }}>Conexion</p>
          </ContainerNameTable>

          <ContAllUsersTable>
            {tvs?.users?.map((tv) => {
              return (
                <RowTable key={tv.id}>
                  <li>
                    <ContainerImgUser>
                      <div>{upperCase(tv?.username[0])}</div>
                      <p>{tv?.username}</p>
                    </ContainerImgUser>
                  </li>
                  <li>{tv.name}</li>
                  <li>Televisor</li>
                  <li>{tv.session}</li>
                </RowTable>
              );
            })}
          </ContAllUsersTable>
        </>
      )}
    </ContainerPrincipalViewUser>
  );
};

export default ViewTvs;

const ContainerPrincipalViewUser = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ContainerNameTable = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 2px solid #e8f0fe;
  display: flex;
  align-items: center;
  padding: 20px 15px;

  p {
    font-weight: 500;
    color: #5f6368;
    text-align: center;
  }
`;

const RowTable = styled.ul`
  display: flex;
  padding: 10px 20px;
  align-items: center;
  li {
    width: 20%;
    text-align: center;
  }
`;

const ContainerOnlyUser = styled.div`
  height: 50px;
  padding: 0 20px;
  display: flex;
`;

const ContainerImgUser = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
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

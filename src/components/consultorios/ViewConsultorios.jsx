import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Loading2 from "../../animations/Loading2";
import NotFound from "../../animations/NotFound";
import ViewPassword from "../../animations/ViewPassword";
import { getAllConsultorios } from "../../store/slice/consultorios";
import {
  setIsLoadingOptions,
  stopLoadingOptions,
} from "../../store/slice/isLoadingOptions.slice";
import { upperCase } from "../../utils/upperCase";

const ViewConsultorios = () => {
  const dispatch = useDispatch();
  const { consultorios, isLoading, message } = useSelector(
    (state) => state.consultorio
  );

  useEffect(() => {
    dispatch(getAllConsultorios());
  }, [dispatch]);

  if (isLoading) {
    return <Loading2 />;
  }

  return (
    <ContainerPrincipalViewUser>
      {message && message.code === 1001 ? (
        <ContainerNotFount>
          <NotFound />
          <p>{message.msg}</p>
        </ContainerNotFount>
      ) : (
        <>
          <ContainerNameTable>
            <p style={{ width: "30%" }}>Usuario</p>
            <p style={{ width: "25%" }}>Nombre</p>
            <p style={{ width: "20%" }}>Rol</p>
            <p>Conexion</p>
          </ContainerNameTable>
          <ContAllUsersTable>
            {consultorios?.map((consultorio) => {
              return (
                <ContainerOnlyUser key={consultorio.id}>
                  <ContainerImgUser>
                    <div>{upperCase(consultorio.username[0])}</div>
                    <p>{consultorio.username}</p>
                  </ContainerImgUser>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "25%",
                    }}
                  >
                    {consultorio.name}
                  </p>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "20%",
                    }}
                  >
                    Consultorio
                  </p>
                  <ContainerSession
                    session={consultorio.session === "active" ? true : false}
                  >
                    {consultorio.session === "active" ? (
                      <p>Activa</p>
                    ) : (
                      <p>Inactiva</p>
                    )}
                  </ContainerSession>
                </ContainerOnlyUser>
              );
            })}
          </ContAllUsersTable>{" "}
        </>
      )}
    </ContainerPrincipalViewUser>
  );
};

export default ViewConsultorios;

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
  width: 30%;
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

const ContainerSession = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    background-color: ${(props) => (props.session ? "#b2e7b2" : "#fdb8b8")};
    padding: 2px 10px;
    border-radius: 20px;
    color: ${(props) => (props.session ? "#2e7d32" : "#c62828")};
  }
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

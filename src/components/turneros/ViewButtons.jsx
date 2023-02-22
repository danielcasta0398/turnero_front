import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Loading2 from "../../animations/Loading2";
import NotFound from "../../animations/NotFound";
import ViewPassword from "../../animations/ViewPassword";
import {
  setIsLoadingOptions,
  stopLoadingOptions,
} from "../../store/slice/isLoadingOptions.slice";
import { setLoading } from "../../store/slice/loadings/loading.slice";
import { getAllUsers, getUsersByRol } from "../../store/slice/users";
import { upperCase } from "../../utils/upperCase";
import ButtonBasic from "../buttons/ButtonBasic";
import CreateButton from "./CreateButton";

const ViewButtons = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.resApi);
  const resUsers = useSelector((state) => state.users);
  const loading = useSelector((state) => state.loading);
  const [stateButton, setStateButton] = useState(true);

  useEffect(() => {
    dispatch(getUsersByRol(4));
  }, [dispatch]);

  if (loading) {
    return <Loading2 />;
  }

  if (stateButton) {
    return <CreateButton state={{ stateButton, setStateButton }} />;
  }

  return (
    <ContainerPrincipalViewUser>
      {resUsers.msgError && resUsers.msgError.code === 101 ? (
        <ContainerNotFount>
          <NotFound />
          <p>No hay ningun boton creado</p>
          <ButtonBasic
            textButton={"Crear Boton"}
            styl={{ width: "50%" }}
            onClick={() => setStateButton(true)}
          />
        </ContainerNotFount>
      ) : (
        <>
          <ContainerNameTable>
            <p style={{ width: "30%" }}>Usuario</p>
            <p style={{ width: "25%" }}>Nombre</p>
            <p>Rol</p>
          </ContainerNameTable>

          <ContAllUsersTable>
            {users?.map((user) => {
              return (
                <ContainerOnlyUser key={user.id}>
                  <ContainerImgUser>
                    <div>{upperCase(user.username[0])}</div>
                    <p>{user.username}</p>
                  </ContainerImgUser>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "25%",
                    }}
                  >
                    {user.name}
                  </p>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "25%",
                    }}
                  >
                    Turnero
                  </p>
                </ContainerOnlyUser>
              );
            })}
          </ContAllUsersTable>
        </>
      )}
    </ContainerPrincipalViewUser>
  );
};

export default ViewButtons;

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

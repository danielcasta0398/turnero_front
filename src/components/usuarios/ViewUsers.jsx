import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Loading2 from "../../animations/Loading2";

import { getAllUsers } from "../../store/slice/users";
import { upperCase } from "../../utils/upperCase";
import { useCheckSession } from "../../hooks/useCheckSession";
import NewTable from "../table/NewTable";
import Opciones from "../ComponenteOpciones/Opciones";
import Modal from "../modal/Modal";
import ModalMui from "../modal/ModalMui";

const itemsHeader = ["Usuario", "Nombre", "Rol", "Opciones"];

const ViewUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.resApi);
  const loading = useSelector((state) => state.loading);

  // Este Hook se ejecuta cuando se carga la pagina y verifica si hay una sesion activa y si el usuario tiene permisos
  useCheckSession([1], "/dashboard/usuarios");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const newData = users?.map((user) => {
    return [
      user.username,
      user.name,
      upperCase(user.role.nombreRol),
      <Opciones tv={user.Televisor?.name ? user.Televisor?.name : ""} />,
    ];
  });

  if (loading) {
    return <Loading2 />;
  }

  return (
    <ContainerPrincipalViewUser>
      {/* <ModalMui /> */}
      <NewTable itemsHeader={itemsHeader} itemsBody={newData} />
    </ContainerPrincipalViewUser>
  );
};

export default ViewUsers;

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

const ContAllUsersTable = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Loading2 from "../../animations/Loading2";

import { getAllUsers } from "../../store/slice/users";
import { upperCase } from "../../utils/upperCase";
import { useCheckSession } from "../../hooks/useCheckSession";
import NewTable from "../table/NewTable";
import Opciones from "../ComponenteOpciones/Opciones";

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
      user.username || "Sin usuario",
      user.name || "Sin nombre",
      user.role?.nombreRol ? upperCase(user.role.nombreRol) : "Sin rol",
      <Opciones
        tv={user.Televisor?.name ? user.Televisor?.name : ""}
        id={user.id}
        name={user?.name}
      />,
    ];
  });

  if (loading) {
    return <Loading2 />;
  }

  return (
    <ContainerPrincipalViewUser>
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

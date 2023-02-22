import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Loading2 from "../../animations/Loading2";

import { getAllUsers } from "../../store/slice/users";
import { upperCase } from "../../utils/upperCase";

const ViewUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.resApi);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if (loading) {
    return <Loading2 />;
  }

  return (
    <ContainerPrincipalViewUser>
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
                style={{ display: "flex", alignItems: "center", width: "25%" }}
              >
                {user.name}
              </p>
              <p style={{ display: "flex", alignItems: "center" }}>
                {user.role?.nombreRol}
              </p>
            </ContainerOnlyUser>
          );
        })}
      </ContAllUsersTable>
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

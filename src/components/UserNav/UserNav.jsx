import localforage from "localforage";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getDataStorage } from "../../utils/getDataStorage";
import { upperCase } from "../../utils/upperCase";

const UserNav = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    getDataStorage("user").then((value) => {
      const { user } = value;
      setUser(upperCase(user.username));
    });
  }, []);

  return (
    <ContainerUser>
      <p>{user}</p>
      <div>{user[0]}</div>
    </ContainerUser>
  );
};

export default UserNav;

const ContainerUser = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;

  p {
    color: white;
    font-weight: 500;
  }

  div {
    width: 30px;
    height: 30px;
    background-color: #ff686899;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 600;
  }
`;

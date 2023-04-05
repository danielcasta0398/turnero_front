import localforage from "localforage";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getDataStorage } from "../../utils/getDataStorage";
import { upperCase } from "../../utils/upperCase";
import { existSession } from "../../assets/svg/svgs";
import { useNavigate } from "react-router-dom";

const UserNav = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [viewConfig, setViewConfig] = useState(false);

  useEffect(() => {
    getDataStorage("user").then((value) => {
      const { user } = value;
      setUser(upperCase(user.username));
    });
  }, []);

  const handleViewConfig = () => {
    setViewConfig(!viewConfig);
  };

  const closeSession = () => {
    localforage.clear();
    navigate("/login");
  };

  return (
    <ContainerUser>
      {viewConfig && (
        <ContainerConfig>
          <div onClick={closeSession}>
            {existSession}
            <p>Cerrar Sesion</p>
          </div>
        </ContainerConfig>
      )}

      <p>{user}</p>
      <div className="cont-letter-user" onClick={handleViewConfig}>
        {user[0]}
      </div>
    </ContainerUser>
  );
};

export default UserNav;

const ContainerUser = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;

  p {
    color: white;
    font-weight: 500;
  }

  .cont-letter-user {
    width: 30px;
    height: 30px;
    background-color: #ff686899;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 600;
    cursor: pointer;
  }
`;

const ContainerConfig = styled.div`
  position: absolute;
  background-color: #ffffff;
  bottom: -10px;
  right: 0;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px #00000026;
  padding: 10px;

  svg {
    width: 20px;
    height: 20px;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 10px;
    width: max-content;
    cursor: pointer;
  }

  p {
    color: black;
  }
`;

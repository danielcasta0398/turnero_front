import localforage from "localforage";
import React, { useEffect, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Navigation from "../components/nav/Navigation";
import TestImpresion from "../components/TestImpresion";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    localforage.getItem("user").then((value) => {
      if (value === null) {
        navigate("/login");
      } else {
        setUser(value);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainContainerDashboard>
      <Navigation />
      <Outlet />
    </MainContainerDashboard>
  );

  if (user) {
    return (
      <MainContainerDashboard>
        <Navigation />
        <ContainerInfoDashboard>
          <div></div>
          <p></p>
        </ContainerInfoDashboard>
      </MainContainerDashboard>
    );
  }
};

export default Dashboard;

const MainContainerDashboard = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContainerInfoDashboard = styled.div`
  height: 100%;
  display: flex;
  div {
    width: 20%;
    background-color: white;
  }

  p {
    width: 80%;
    background-color: blue;
  }
`;

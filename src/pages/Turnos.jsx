import localforage from "localforage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { iconRol, iconUser, volverMenuLogo } from "../assets/svg/svgs";
import ModalAsignacion from "../components/turnos/ModalAsignacion";
import ContainerItemMenu from "../components/usuarios/ContainerItemMenu";

const Turnos = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const { viewModal } = useSelector((state) => state.turn);

  useEffect(() => {
    localforage.getItem("user").then((value) => {
      setRole(value.user.roleId);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const afterMenu = () => {
    navigate("/dashboard");
  };

  return (
    <MainContainerUser>
      {viewModal && <ModalAsignacion />}
      <>
        <ContainerMenu>
          <ContainerItemsMenu>
            <ContainerItemMenu
              role={role}
              icon={iconUser}
              text="Turnos"
              path="/dashboard/consultorios"
            />
            {role !== 2 && role !== 5 && (
              <ContainerVolverMenu onClick={() => afterMenu()}>
                {volverMenuLogo}
                <p>Volver al menu</p>
              </ContainerVolverMenu>
            )}
          </ContainerItemsMenu>
        </ContainerMenu>
        <ContainerUser>
          <ContainerAllUsers>
            <Outlet />
          </ContainerAllUsers>
        </ContainerUser>
      </>
    </MainContainerUser>
  );
};

export default Turnos;

const MainContainerUser = styled.div`
  height: 100%;
  background-color: ${(props) => (props.isLoading ? "white" : " #F6F8FC")};
  display: flex;
  justify-content: center;
`;

const ContainerMenu = styled.div`
  min-width: 250px;
  background-color: transparent;
  display: flex;
  align-items: center;
`;

const ContainerUser = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerItemsMenu = styled.div`
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

const ContainerAddUser = styled.div`
  width: 90%;
  height: 50px;
  margin-left: 10px;
  border-radius: 25px !important;
  background-color: #305381 !important;
  gap: 20px !important;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  padding: 20px;
  cursor: pointer;

  p {
    color: white;
  }

  svg {
    fill: white;
    width: 25px;
    height: 25px;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
      rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
      rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  }
`;

const ContainerAllUsers = styled.div`
  width: 90%;
  height: 90%;
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const ContainerVolverMenu = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  p {
    color: #a4a4a4;
    font-size: 1.2em;

    &:hover {
      color: #305381;
    }
  }

  svg {
    width: 25px;
    height: 25px;
    fill: #a4a4a4;
  }

  &:hover {
    p {
      color: #305381;
    }

    svg {
      fill: #305381;
    }
  }
`;

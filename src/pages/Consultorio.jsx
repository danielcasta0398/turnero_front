import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { iconRol, iconUser, volverMenuLogo } from "../assets/svg/svgs";
import ContainerItemMenu from "../components/usuarios/ContainerItemMenu";

const Consultorio = () => {
  const navigate = useNavigate();

  const afterMenu = () => {
    navigate("/dashboard");
  };

  return (
    <MainContainerUser>
      <>
        <ContainerMenu>
          <ContainerItemsMenu>
            <NavLink to="/dashboard/crearconsultorio">
              <ContainerAddUser>
                <svg
                  width="512"
                  height="512"
                  version="1.1"
                  viewBox="0 0 469.33 469.33"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M437.332 192h-160V32c0-17.664-14.336-32-32-32H224c-17.664 0-32 14.336-32 32v160H32c-17.664 0-32 14.336-32 32v21.332c0 17.664 14.336 32 32 32h160v160c0 17.664 14.336 32 32 32h21.332c17.664 0 32-14.336 32-32v-160h160c17.664 0 32-14.336 32-32V224c0-17.664-14.336-32-32-32zm0 0"
                    data-original="#000000"
                  />
                </svg>
                <p>Crear consultorio</p>
              </ContainerAddUser>
            </NavLink>

            <ContainerItemMenu
              icon={iconUser}
              text="Consultorios"
              path="/dashboard/consultorios"
            />
            <ContainerItemMenu
              icon={iconRol}
              text="Roles"
              path="/dashboard/roles"
            />
            <ContainerVolverMenu onClick={() => afterMenu()}>
              {volverMenuLogo}
              <p>Volver al menu</p>
            </ContainerVolverMenu>
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

export default Consultorio;

const MainContainerUser = styled.div`
  height: 90%;
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

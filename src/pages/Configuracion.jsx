import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { volverMenuLogo } from "../assets/svg/svgs";

const Configuracion = () => {
  const navigate = useNavigate();

  const afterMenu = () => {
    navigate("/dashboard");
  };

  return (
    <MainContainerConfig>
      <>
        <ContainerMenu>
          <ContainerItemsMenu>
            <NavLink to="/dashboard/configuracion/logo">
              <ContainerMenuItem>
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM13.96 12.29L11.21 15.83L9.25 13.47L6.5 17H17.5L13.96 12.29Z" 
                    fill="currentColor"
                  />
                </svg>
                <p>Logo</p>
              </ContainerMenuItem>
            </NavLink>
            <ContainerVolverMenu onClick={() => afterMenu()}>
              {volverMenuLogo}
              <p>Volver al menu</p>
            </ContainerVolverMenu>
          </ContainerItemsMenu>
        </ContainerMenu>
        <ContainerConfig>
          <ContainerAllConfig>
            {/* Siempre mostrar el Outlet que cargará el componente correspondiente */}
            <Outlet />
          </ContainerAllConfig>
        </ContainerConfig>
      </>
    </MainContainerConfig>
  );
};

export default Configuracion;

const MainContainerConfig = styled.div`
  height: 90%;
  background-color: #F6F8FC;
  display: flex;
  justify-content: center;
`;

const ContainerMenu = styled.div`
  min-width: 250px;
  background-color: transparent;
  display: flex;
  align-items: center;
`;

const ContainerConfig = styled.div`
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

const ContainerMenuItem = styled.div`
  width: 90%;
  height: 50px;
  margin-left: 10px;
  border-radius: 10px;
  background-color: #305381;
  gap: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  padding: 20px;
  cursor: pointer;

  p {
    color: white;
  }

  svg {
    color: white;
    width: 25px;
    height: 25px;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
      rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
      rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  }
`;

const ContainerAllConfig = styled.div`
  width: 90%;
  max-height: 90%;
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  overflow-y: auto;
  padding: 0 20px;
  box-sizing: border-box;
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



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Loading2 from "../../animations/Loading2";
import Loading3 from "../../animations/Loading3";
import Loading4 from "../../animations/Loading4";
import NotFound1 from "../../animations/NotFound1";
import { iconPlus } from "../../assets/svg/svgs";
import { setDataTurneros } from "../../store/slice/turneros/turnero.slice";
import {
  changeStateButton,
  getButtonById,
} from "../../store/slice/turneros/turneroThunk";
import ButtonBasic from "../buttons/ButtonBasic";
import ButtonPrimary from "../buttons/ButtonPrimary";
import CollapsibleTable from "../table/CollapsibleTable";
import TestCreateButton from "./TestCreateButton";

const TestViewButtons = ({ data }) => {
  const dispatch = useDispatch();
  const {
    isLoading,
    buttons,
    viewCreateButton,
    isLoadingChangeState,
    clickIdButton,
  } = useSelector((state) => state.turnero);
  const [isOpen, setIsOpen] = useState(false);

  const { viewButtons, setViewButtons } = data;

  const changeViewCreateButton = () => {
    dispatch(setDataTurneros({ option: "viewCreateButton", value: true }));
  };

  // Reinicia los estos del comoponent  ver botones
  const changeViewButtons = () => {
    setViewButtons(!viewButtons);
    dispatch(setDataTurneros({ option: "viewCreateButton", value: false }));
    dispatch(setDataTurneros({ option: "onlyButtonInfo", value: {} }));
    dispatch(setDataTurneros({ option: "idUser", value: "" }));
    dispatch(setDataTurneros({ option: "editButton", value: false }));
  };

  // Cambia el estado del boton para editar

  const buttonEdit = (id) => {
    dispatch(getButtonById(id));
    dispatch(setDataTurneros({ option: "viewCreateButton", value: true }));
    dispatch(setDataTurneros({ option: "editButton", value: true }));
  };

  if (isLoading) {
    return (
      <ContainerViewButtons>
        <Loading4 />
      </ContainerViewButtons>
    );
  }

  if (viewCreateButton) {
    return (
      <ContainerViewButtons>
        <svg
          className="close-icon"
          onClick={changeViewButtons}
          version="1.1"
          viewBox="0 0 329.27 329"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m194.8 164.77 128.21-128.22c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0l-128.22 128.21-128.21-128.21c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.22-128.21 128.21c-8.344 8.34-8.344 21.825 0 30.164a21.266 21.266 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.21 128.22 128.21a21.273 21.273 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164z"
            data-original="#000000"
          />
        </svg>
        <TestCreateButton />
      </ContainerViewButtons>
    );
  }

  // Se renderiza si hay botones creados
  if (buttons.buttons.length > 0) {
    return (
      <ContainerViewButtons>
        <ButtonPrimary className="create-btn" onClick={changeViewCreateButton}>
          {iconPlus} Crear Boton
        </ButtonPrimary>
        <svg
          className="close-icon"
          style={{ width: "15px !important", height: "15px !important" }}
          onClick={changeViewButtons}
          version="1.1"
          viewBox="0 0 329.27 329"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m194.8 164.77 128.21-128.22c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0l-128.22 128.21-128.21-128.21c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.22-128.21 128.21c-8.344 8.34-8.344 21.825 0 30.164a21.266 21.266 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.21 128.22 128.21a21.273 21.273 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164z"
            data-original="#000000"
          />
        </svg>
        <ContaintTable>
          <ul>
            <li>Nombre</li>
            <li>Usuarios Asignados</li>
            <li>Estado</li>
          </ul>
          <ContainerRowButtons>
            {buttons.buttons.map((button) => {
              return (
                <RowTable key={button.id}>
                  <p>{button.nameButton}</p>
                  <div>
                    <ButtonPrimary>Ver Usuarios</ButtonPrimary>
                  </div>
                  <ContainerSession
                    session={button.status === "active" ? true : false}
                  >
                    {button.status === "active" ? (
                      <p>Activo</p>
                    ) : (
                      <p>Inactivo</p>
                    )}
                  </ContainerSession>
                  <div>
                    {isLoadingChangeState && button.id === clickIdButton ? (
                      <Loading4 />
                    ) : (
                      <ButtonPrimary
                        onClick={() => {
                          dispatch(changeStateButton(button.id, button.userId));
                        }}
                        className={button.status === "inactive" && "active-btn"}
                      >
                        {button.status === "active" ? "Desactivar" : "Activar"}
                      </ButtonPrimary>
                    )}
                    <ButtonPrimary
                      onClick={() => {
                        buttonEdit(button.id);
                      }}
                    >
                      Editar
                    </ButtonPrimary>
                  </div>
                </RowTable>
              );
            })}
          </ContainerRowButtons>
        </ContaintTable>
      </ContainerViewButtons>
    );
  }

  return (
    <ContainerViewButtons>
      <svg
        className="close-icon"
        onClick={changeViewButtons}
        version="1.1"
        viewBox="0 0 329.27 329"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m194.8 164.77 128.21-128.22c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0l-128.22 128.21-128.21-128.21c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.22-128.21 128.21c-8.344 8.34-8.344 21.825 0 30.164a21.266 21.266 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.21 128.22 128.21a21.273 21.273 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164z"
          data-original="#000000"
        />
      </svg>
      <ContainerNotFound>
        <NotFound1 />
        <p>No hay ningun boton creado para este turnero</p>
        <button className="button-plus" onClick={changeViewCreateButton}>
          <span>{iconPlus}</span>
          <div>Crear Boton</div>
        </button>
      </ContainerNotFound>
    </ContainerViewButtons>
  );
};

export default TestViewButtons;

const ContainerViewButtons = styled.div`
  position: absolute;
  width: 600px;
  height: 420px;
  background-color: #ffffff;
  top: 0px;
  right: 0;
  z-index: 4;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  .active-btn {
    border-color: #5abe5a !important;
    color: green !important;
    &:hover {
      background-color: #5abe5a !important;
      color: white !important;
    }
  }

  .create-btn {
    position: absolute;
    display: flex;
    align-items: center;
    height: 40px;
    border-radius: 25px;
    gap: 10px;
    bottom: 0;
    right: 0;
    margin: 20px;

    svg {
      width: 20px;
      height: 20px;
      fill: white;
    }
  }

  .close-icon {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 15;
    fill: var(--color-primary);
    cursor: pointer;
  }
`;

const ContainerNotFound = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    margin-top: -50px;
  }

  p {
    font-size: 1.2em;
    font-weight: 500;
    color: #d6dce8;
    margin-top: -70px;
  }

  .button-plus {
    //position: absolute;
    height: 50px !important;
    width: 180px !important;
    background-color: var(--color-primary) !important;
    color: white;
    padding: 0 20px;
    border-radius: 25px;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 1.1em;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      background-color: #203550 !important;
    }

    svg {
      width: 20px;
      height: 20px;
      fill: white;
      margin: 0px !important;
    }
  }
`;

const ContaintTable = styled.div`
  svg {
    width: 15px;
    height: 15px;
  }

  ul {
    padding: 10px;
    display: flex;
    border-bottom: 1px solid #d6dce8;

    li {
      width: 170px;
      font-weight: 500;
      color: #5f6368;
    }

    li:nth-child(3) {
      padding-left: 8px;
    }
  }
`;

const RowTable = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;

  p:nth-child(1) {
    width: 170px;

    p {
      font-size: 0.7em;
    }
  }

  div:nth-child(2) {
    width: 170px;
    display: flex;

    button {
      height: 30px;
      font-size: 0.8em;
      background-color: white;
      border: 1px solid var(--color-primary);
      color: var(--color-primary);
      transition: all 0.3s ease;

      &:hover {
        background-color: var(--color-primary);
        color: white;
      }
    }
  }

  div:nth-child(4) {
    display: flex;
    justify-content: center;
    position: relative;
    gap: 10px;
    width: 150px;

    div {
      width: 50px;
      height: 25px;
    }

    button:nth-child(1) {
      height: 25px;
      font-size: 0.7em;
      padding: 0;
      width: 70px;
      background-color: white;
      border: 1px solid var(--color-delete);
      color: var(--color-delete);
      transition: all 0.3s ease;

      &:hover {
        background-color: var(--color-delete);
        color: white;
      }
    }

    button:nth-child(2) {
      height: 25px;
      padding: 0;
      font-size: 0.7em;
      width: 70px;
      background-color: white;
      border: 1px solid var(--color-secondary);
      color: var(--color-secondary);
      transition: all 0.3s ease;

      &:hover {
        background-color: var(--color-secondary);
        color: white;
      }
    }
  }
`;

const ContainerRowButtons = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const ContainerSession = styled.div`
  display: flex;
  align-items: center;
  width: 70px;
  margin-right: 20px;
  p {
    text-align: center;
    background-color: ${(props) => (props.session ? "#b2e7b2" : "#fdb8b8")};
    padding: 2px 10px;
    border-radius: 20px;
    color: ${(props) => (props.session ? "#2e7d32" : "#c62828")};
  }
`;

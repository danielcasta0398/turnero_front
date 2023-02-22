import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Loading4 from "../../animations/Loading4";
import NotFound1 from "../../animations/NotFound1";
import { iconPlus } from "../../assets/svg/svgs";
import { setDataTurneros } from "../../store/slice/turneros/turnero.slice";
import ButtonBasic from "../buttons/ButtonBasic";
import ButtonPrimary from "../buttons/ButtonPrimary";
import CollapsibleTable from "../table/CollapsibleTable";
import TestCreateButton from "./TestCreateButton";

const TestViewButtons = () => {
  const dispatch = useDispatch();
  const { viewButtons, isLoading, buttons, viewCreateButton } = useSelector(
    (state) => state.turnero
  );
  const [isOpen, setIsOpen] = useState(false);

  const changeViewCreateButton = () => {
    dispatch(setDataTurneros({ option: "viewCreateButton", value: true }));
  };

  const changeViewButtons = () => {
    dispatch(setDataTurneros({ option: "viewButtons", value: false }));
    dispatch(setDataTurneros({ option: "viewCreateButton", value: false }));
  };

  useEffect(() => {
    console.log(buttons.buttons);
  }, [buttons]);

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

          {buttons.buttons.map((button) => {
            return (
              <RowTable key={button.id}>
                <p>{button.nameButton}</p>
                <div>
                  <ButtonPrimary>Ver Usuarios</ButtonPrimary>
                </div>

                <p>Activo</p>
                <div>
                  <ButtonPrimary>Desactivar</ButtonPrimary>
                  <ButtonPrimary>Editar</ButtonPrimary>
                </div>
              </RowTable>
            );
          })}
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
  height: 500px;
  background-color: #ffffff;
  top: 0px;
  right: 0;
  z-index: 4;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  .create-btn {
    position: absolute;
    display: flex;
    align-items: center;
    height: 50px;
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
      width: 180px;
      font-weight: 500;
      color: #5f6368;
    }
  }
`;

const RowTable = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;

  p:nth-child(1) {
    width: 180px;

    p {
      font-size: 0.7em;
    }
  }

  div:nth-child(2) {
    width: 180px;
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

  p:nth-child(3) {
    width: 70px;
  }

  div:nth-child(4) {
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 150px;

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

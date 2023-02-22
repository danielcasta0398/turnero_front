import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setDataTurneros } from "../../store/slice/turneros/turnero.slice";
import { createButtonApi } from "../../store/slice/turneros/turneroThunk";
import { getAllUsers } from "../../store/slice/users";
import ButtonBasic from "../buttons/ButtonBasic";
import ButtonPrimary from "../buttons/ButtonPrimary";
import MultiplesValues from "../inputs/MultiplesValues";

const TestCreateButton = () => {
  const dispatch = useDispatch();
  const [textButton, setTextButton] = useState("");
  const [buttonActive, setButtonActive] = useState(true);
  const [nameUsers, setNameUsers] = useState([]);
  const users = useSelector((state) => state.users.resApi);
  const { idUser } = useSelector((state) => state.turnero);

  const changeViewCreateButton = () => {
    dispatch(setDataTurneros({ option: "viewCreateButton", value: false }));
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    const names = users.map((user) => {
      return { title: user.name, year: "2023" };
    });
    setNameUsers(names);
  }, [users]);

  const handleChange = (e) => {
    if (e.target.value.length < 1) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }

    setTextButton(e.target.value);
  };

  const createButton = () => {
    const data = {
      nameButton: textButton,
      userId: idUser,
    };

    dispatch(createButtonApi(data));

    console.log(data);
  };

  return (
    <ContainerCreateButton>
      <div className="cont-create-boton">
        <p>Crear Boton</p>
        <input
          type="text"
          placeholder="Nombre del boton"
          onChange={handleChange}
          autoCorrect="off"
        />
      </div>
      <div className={textButton ? "preview-button mostrar" : "oculto"}>
        <p>Vista previa del boton</p>
        <ButtonPrimary>{textButton}</ButtonPrimary>
        <MultiplesValues
          label={"Notificar a:"}
          placeholder={"Escribe el usuario"}
          options={nameUsers}
        />
      </div>
      <div className="cont-buttons-accions">
        <ButtonPrimary onClick={changeViewCreateButton}>Volver</ButtonPrimary>
        <ButtonPrimary onClick={createButton}>Crear Boton</ButtonPrimary>
      </div>
    </ContainerCreateButton>
  );
};

export default TestCreateButton;

const ContainerCreateButton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;

  .cont-create-boton {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 10px;

    input {
      width: 60%;
      height: 50px;
      border: 1px solid #cacaca;
      border-radius: 10px;
      font-size: 1.3em;
      outline: none;
      text-align: center;
    }

    p {
      font-size: 1.5em;
      font-weight: 500;
      color: var(--color-primary);
    }
  }

  .oculto {
    display: none;
  }

  .preview-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    overflow: hidden;
    width: 100%;

    .MuiAutocomplete-hasPopupIcon {
      button {
        width: auto !important;
      }
    }

    p,
    button {
      animation: aparecer 0.3s ease-out;
    }

    @keyframes aparecer {
      0% {
        opacity: 0;
        transform: translateY(-100%);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  p {
    font-size: 1.2em;
    font-weight: 400;
    color: #b7b7b7;
  }

  .cont-buttons-accions {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    gap: 20px;
    margin: 20px;

    button:nth-child(1) {
      background-color: #d6661d;
      height: 40px;
    }

    button:nth-child(2) {
      width: 180px !important;
      height: 40px;

      &:disabled {
        background-color: #cacaca;
        transform: none;
      }
    }
  }
`;

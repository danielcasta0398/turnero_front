import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Loading3 from "../../animations/Loading3";
import { setDataTurneros } from "../../store/slice/turneros/turnero.slice";
import {
  createButtonApi,
  updateButtons,
} from "../../store/slice/turneros/turneroThunk";
import { getAllUsers } from "../../store/slice/users";
import ButtonBasic from "../buttons/ButtonBasic";
import ButtonPrimary from "../buttons/ButtonPrimary";
import MultiplesValues from "../inputs/MultiplesValues";

const TestCreateButton = () => {
  const dispatch = useDispatch();
  const {
    idUser,
    onlyButtonInfo,
    userNotiffication,
    editButton,
    isLoadingEdit,
  } = useSelector((state) => state.turnero);
  const [textButton, setTextButton] = useState(
    onlyButtonInfo.button?.nameButton ? onlyButtonInfo.button?.nameButton : ""
  );
  const [buttonActive, setButtonActive] = useState(true);
  const [nameUsers, setNameUsers] = useState([]);
  const [valueDefault, setValueDefault] = useState([]);
  const users = useSelector((state) => state.users.resApi);

  // Se ejecuta cuando se le da al boton de volver para volver a la vista de los botones y reiniciar los estados
  const changeViewCreateButton = () => {
    dispatch(setDataTurneros({ option: "viewCreateButton", value: false }));
    dispatch(setDataTurneros({ option: "editButton", value: false }));
    dispatch(setDataTurneros({ option: "onlyButtonInfo", value: {} }));
  };

  useEffect(() => {
    if (onlyButtonInfo.button?.users) {
      const data = onlyButtonInfo.button?.users.map((user) => {
        return { title: user.username, year: "2023", idUser: user.id };
      });
      setValueDefault(data);
    }
  }, [onlyButtonInfo]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    const names = users.map((user) => {
      return { title: user.name, year: "2023", idUser: user.id };
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
      buttonNotification: userNotiffication,
    };

    dispatch(createButtonApi(data));

    console.log(data);
  };

  const updateButton = () => {
    const data = {
      nameButton: textButton,
      userId: idUser,
      buttonNotification:
        userNotiffication.length > 0
          ? userNotiffication
          : onlyButtonInfo.button.users,
    };

    console.log("test =>>>", data);
    dispatch(updateButtons(onlyButtonInfo.button.id, data));
  };

  return (
    <ContainerCreateButton>
      <div className="cont-create-boton">
        <p>Crear Boton</p>
        <input
          type="text"
          value={textButton}
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
          valueDefault={valueDefault}
        />
      </div>
      <div className="cont-buttons-accions">
        <ButtonPrimary onClick={changeViewCreateButton}>Volver</ButtonPrimary>
        <ButtonPrimary onClick={editButton ? updateButton : createButton}>
          {editButton ? (
            isLoadingEdit ? (
              <Loading3 />
            ) : (
              "Actualizar Boton"
            )
          ) : (
            "Crear Boton"
          )}
        </ButtonPrimary>
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
    margin-bottom: 40px;

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

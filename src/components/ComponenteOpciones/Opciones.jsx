import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  deleteIcon,
  editIcon,
  iconTv,
  passwordIcon,
} from "../../assets/svg/svgs";
import ModalMui from "../modal/ModalMui";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../../store/slice/states";
import { TextField } from "@mui/material";
import ButtonPrimary from "../buttons/ButtonPrimary";
import ComponentChangePassword from "../usuarios/ComponentChangePassword";
import ComponentEditProfile from "../usuarios/ComponentEditProfile";

const Opciones = ({ tv, id }) => {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  const buttonRef = useRef(null);

  const activeModalUserId = useSelector(
    (state) => state.states.activeModalUserId
  );
  const activeModalType = useSelector((state) => state.states.activeModalType);

  const toggleOptions = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions);
  };

  const changePassword = () => {
    console.log("changePassword");
    dispatch(setState({ option: "activeModalUserId", value: id }));
    dispatch(setState({ option: "activeModalType", value: "editPassword" }));
  };

  const editProfile = () => {
    dispatch(setState({ option: "activeModalUserId", value: id }));
    dispatch(setState({ option: "activeModalType", value: "editProfile" }));
  };

  const closeModal = () => {
    dispatch(setState({ option: "activeModalUserId", value: null }));
    dispatch(setState({ option: "activeModalType", value: null }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsRef, buttonRef]);

  return (
    <div style={{ position: "relative" }}>
      <ModalMui
        isActive={
          activeModalUserId === id && activeModalType === "editPassword"
        }
        onClose={closeModal}
        render={<ComponentChangePassword id={id} />}
      />
      <ModalMui
        isActive={activeModalUserId === id && activeModalType === "editProfile"}
        onClose={closeModal}
        render={<ComponentEditProfile id={id} />}
      />
      <StyledButton ref={buttonRef} onClick={toggleOptions}>
        Opciones {showOptions && <Viñeta />}
      </StyledButton>
      <ContOptions show={showOptions} ref={optionsRef}>
        {tv && (
          <RowOptions
            style={{
              position: "absolute",
              top: 0,
              backgroundColor: "rgba(54, 179, 126, 0.16)",
              left: 0,
              width: "100%",
              borderRadius: "10px 10px 0 0",
            }}
            color="rgb(27, 128, 106)"
          >
            {tv && (
              <ContTextTv>
                {iconTv}
                {tv}
              </ContTextTv>
            )}
          </RowOptions>
        )}
        <RowOptions onClick={editProfile} style={{ marginTop: tv && "35px" }}>
          {editIcon} <p>Editar</p>
        </RowOptions>
        <RowOptions onClick={changePassword} style={{}}>
          {passwordIcon} <p>Nueva Contraseña</p>
        </RowOptions>
        <RowOptions colorPath={"rgb(255, 86, 48)"} color="rgb(255, 86, 48)">
          {deleteIcon} <p>Eliminar</p>
        </RowOptions>
      </ContOptions>
    </div>
  );
};

export default Opciones;

const StyledButton = styled.button`
  background-color: rgba(
    255,
    171,
    0,
    0.16
  ); // Cambiado al color que seleccionaste
  border: none;
  border-radius: 30px; // Bordes más redondeados
  color: rgb(183, 110, 0);
  cursor: pointer;
  font-size: 14px;
  font-weight: 600; // Letra más gruesa
  padding: 8px 12px;
  transition: background-color 0.2s;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: rgb(
      255 171 0 / 42%
    ); // Cambiado a un tono más claro al pasar el cursor
  }

  &:focus {
    outline: none;
  }
`;

const Viñeta = styled.span`
  margin-left: 5px;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgb(183, 110, 0);
`;

const ContOptions = styled.div`
  position: absolute;
  width: 250px;
  top: 38px;
  left: -120px;
  border-radius: 10px;
  padding: 5px;
  background-color: #fff;
  box-shadow: rgba(145, 158, 171, 0.24) 0px 0px 2px 0px,
    rgba(145, 158, 171, 0.24) -20px 20px 40px -4px;
  z-index: 1;
  opacity: ${(props) => (props.show ? "1" : "0")};
  transition: opacity 0.2s ease-in-out;
  pointer-events: ${(props) => (props.show ? "auto" : "none")};
`;

const RowOptions = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 10px;

  &:hover {
    background-color: #f5f5f5;
  }

  & > p {
    width: 71%;
    text-align: left;
    color: ${(props) => (props.color ? props.color : "var(--color-primary)")};
  }

  path {
    fill: ${(props) =>
      props.colorPath ? props.colorPath : "var(--color-primary)"};
  }

  svg {
    width: 18px;
    height: 18px;
    fill: var(--color-primary);
  }
`;

const ContTextTv = styled.p`
  display: flex;
  gap: 10px;

  path {
    fill: rgb(27, 128, 106);
  }
`;

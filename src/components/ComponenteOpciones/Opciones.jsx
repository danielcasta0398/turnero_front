import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { deleteIcon, editIcon, iconTv } from "../../assets/svg/svgs";

const Opciones = ({ tv }) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleOptions = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions);
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
        <RowOptions style={{ marginTop: tv && "35px" }}>
          {editIcon} <p>Editar</p>
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
  width: 211px;
  top: 38px;
  left: -80px;
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
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 10px;

  &:hover {
    background-color: #f5f5f5;
  }

  & > p {
    width: 60%;
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

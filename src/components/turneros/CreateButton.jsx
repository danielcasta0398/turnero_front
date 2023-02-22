import React, { useState } from "react";
import styled from "styled-components";
import ButtonBasic from "../buttons/ButtonBasic";
import InputLine from "../inputs/InputLine";

const CreateButton = ({ state }) => {
  const [createButton, setCreateButton] = useState("");

  return (
    <ContainerCreateButton>
      <h1>Crear Boton</h1>
      <InputLine textName={"Nombre del boton"} />
      <InputLine textName={"Texto en el boton"} />
      <GroupInput>
        <h1>Texto en el boton</h1>
        <input
          type="text"
          placeholder="Nombre del boton"
          onChange={(e) => setCreateButton(e.target.value)}
        />
      </GroupInput>
      <GruopButton>
        <h3>Vista previa del boton</h3>
        <ButtonBasic
          textButton={createButton}
          styl={{ width: "40%", margin: 0, borderRadius: "25px" }}
        />
      </GruopButton>
      <GroupButtonSucess>
        <ButtonBasic
          onClick={() => state.setStateButton(false)}
          textButton={"Cancelar"}
          styl={{ width: "30%", backgroundColor: "#f75656" }}
        />
        <ButtonBasic
          isDisabled={createButton.length < 1 ? { state: true } : false}
          textButton={"Crear Boton"}
          styl={{
            width: "30%",
            backgroundColor: `${
              createButton.length < 1 ? "#cacaca" : "#00c853"
            }`,
          }}
        />
      </GroupButtonSucess>
    </ContainerCreateButton>
  );
};

export default CreateButton;

const ContainerCreateButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 80px 0;

  h1 {
    font-size: 2em;
    color: var(--color-primary);
  }
`;

const GroupInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;

  overflow: hidden;

  h1 {
    font-size: 1.5em;
  }

  input {
    border: 1px solid #cacaca;
    width: 60%;
    height: 50px;
    border-radius: 10px;
    font-size: 1.3em;
    outline: none;
    text-align: center;
  }
`;

const GruopButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  h3 {
    font-size: 1.2em;
    color: #5f6368;
  }
`;

const GroupButtonSucess = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 20px;
  button {
    margin: 0;
    width: 200px;
  }
`;

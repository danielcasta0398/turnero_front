import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setDataTurneros } from "../../store/slice/turneros/turnero.slice";
import { getAllButtonsByUser } from "../../store/slice/turneros/turneroThunk";
import { upperCase } from "../../utils/upperCase";
import ButtonBasic from "../buttons/ButtonBasic";
import TestViewButtons from "../turneros/TestViewButtons";

const RowTable = ({ username, name, session, idUser }) => {
  const dispatch = useDispatch();
  const [viewButtons, setViewButtons] = useState(false);
  const changeViewButtons = (id) => {
    dispatch(getAllButtonsByUser(id));
    dispatch(setDataTurneros({ option: "idUser", value: id }));
  };

  const changeState = {
    viewButtons,
    setViewButtons,
  };

  return (
    <ContainerOnlyUser>
      <ContainerImgUser>
        <div>{upperCase(username[0])}</div>
        <p>{username}</p>
      </ContainerImgUser>
      <p
        style={{
          display: "flex",
          alignItems: "center",
          width: "20%",
        }}
      >
        {name}
      </p>
      <p
        style={{
          display: "flex",
          alignItems: "center",
          width: "15%",
        }}
      >
        Turnero
      </p>
      <ContainerSession session={session === "active" ? true : false}>
        {session === "active" ? <p>Activa</p> : <p>Inactiva</p>}
      </ContainerSession>
      <ContainerConfig>
        <ButtonBasic
          textButton={"Botones"}
          bgColor="#30817f"
          onClick={() => {
            changeViewButtons(idUser);
            setViewButtons(!viewButtons);
          }}
          styl={{
            width: "100px ",
            height: "50%",
            margin: "0",
            fontSize: "1em",
          }}
        />
        {/* <ButtonBasic
          textButton={"Editar"}
          bgColor="#d16125"
          styl={{
            width: "100px ",
            height: "50%",
            margin: "0",
            fontSize: "1em",
          }}
        /> */}
        {viewButtons && <TestViewButtons data={changeState} />}
      </ContainerConfig>
    </ContainerOnlyUser>
  );
};

export default RowTable;

const ContainerOnlyUser = styled.div`
  height: 50px;
  padding: 0 20px;
  display: flex;
`;

const ContainerImgUser = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 1em;

  div {
    width: 30px;
    height: 30px;
    background-color: blue;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 500;
  }
`;

const ContainerPassword = styled.div`
  width: 25%;
  display: flex;
  justify-content: space-between;
  padding-right: 20px;

  input {
    max-width: 80%;
    background-color: none;
    border: none;

    &:disabled {
      background-color: transparent;
    }
  }
`;

const ContainerSession = styled.div`
  display: flex;
  align-items: center;
  width: 20%;

  p {
    background-color: ${(props) => (props.session ? "#b2e7b2" : "#fdb8b8")};
    padding: 2px 10px;
    border-radius: 20px;
    color: ${(props) => (props.session ? "#2e7d32" : "#c62828")};
  }
`;

const ContainerConfig = styled.div`
  display: flex;
  width: 20%;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;

  /*height: 50%;
    margin: 0;
    font-size: 1em;}}*/
`;

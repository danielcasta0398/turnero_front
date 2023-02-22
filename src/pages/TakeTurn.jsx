import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ButtonBasic from "../components/buttons/ButtonBasic";
import { MaintContainer } from "../components/containers/MainContainer";
import Modal from "../components/modal/Modal";
import ModalKeyBoard from "../components/TakeTurn/ModalKeyboard";
import { setIsOpenModal } from "../store/slice/isOpenModal.slice";
import logo from "../assets/logos/logo.png";
import { setIsActiveModal } from "../store/slice/isActiveModal.slice";
import { setValueDocument } from "../store/slice/valueDocument.slice";
import { useParams } from "react-router-dom";
import {
  getAllButtonsByUser,
  viewButtonTurnero,
} from "../store/slice/turneros/turneroThunk";
import io from "socket.io-client";

const TakeTurn = () => {
  const isOpen = useSelector((state) => state.isOpenModal);
  const dispatch = useDispatch();
  const { id } = useParams();
  const cancelModal = (cancel) => dispatch(setIsActiveModal(cancel));
  const setIsOpen = (isOpen) => dispatch(setIsOpenModal(isOpen));
  const changeNumber = (number) => dispatch(setValueDocument(number));
  const { buttons, viewButtonsTurnero, buttonsTurnero } = useSelector(
    (state) => state.turnero
  );

  const openModal = () => {
    dispatch(setIsOpenModal(true));
    cancelModal(
      setTimeout(() => {
        setIsOpen(false);
        changeNumber("");
      }, 1000 * 10)
    );
  };

  useEffect(() => {
    dispatch(viewButtonTurnero(id));
    console.log(buttons);
  }, []);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_URL_SOCKET);

    socket.on("viewButtons", (data) => {
      dispatch(viewButtonTurnero(id));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <MaintContainer
      display="flex"
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isOpen && <ModalKeyBoard />}
      <MainContainerTurn>
        <img src={logo} />
        <h1>Seleccione una opcion</h1>
        <div>
          {buttonsTurnero.buttons?.map((button) => (
            <ButtonBasic
              key={button.id}
              textButton={button.nameButton}
              onClick={openModal}
            />
          ))}
        </div>
      </MainContainerTurn>
    </MaintContainer>
  );
};

export default TakeTurn;

const MainContainerTurn = styled.div`
  width: 85%;
  max-width: 1500px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  gap: 20px;
  padding: 40px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    width: 100%;

    button {
      height: 120px;
      font-size: xxx-large;
      margin: 0;
    }
  }

  img {
    width: 400px;
    text-align: center;
  }

  h1 {
    font-size: 3.5em;
    font-weight: 700;
    text-align: center;
  }
`;

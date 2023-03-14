import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import KeyBoardNumber from "../keyboard/KeyBoardNumber";
import Modal from "../modal/Modal";
import ButtonBasic from "../buttons/ButtonBasic";
import { setValueDocument } from "../../store/slice/valueDocument.slice";
import { createTurn } from "../../store/slice/turns/turnsThunk";
import Print from "../../animations/Print";

const ModalKeyBoard = () => {
  const valueDocument = useSelector((state) => state.valueDocument);
  const dispatch = useDispatch();
  const state = true;
  const { isPrint } = useSelector((state) => state.turn);

  const deleteEndCharacter = () => {
    const value = valueDocument.toString();
    dispatch(setValueDocument(value.slice(0, -1)));
    console.log(valueDocument);
  };

  const createTurner = () => {
    dispatch(createTurn());
    console.log("create turner");
  };

  const render = (
    <MainContainerModalKeyBoard>
      {isPrint ? (
        <ContainerPrint>
          <h1>Imprimiendo Turno</h1>
          <Print />
        </ContainerPrint>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              width: "50%",
            }}
          >
            <h1
              style={{
                fontSize: "2.5em",
                fontWeight: "700",
                width: "400px",
                textAlign: "center",
              }}
            >
              Ingrese su numero de documento
            </h1>
            <KeyBoardNumber />
          </div>
          <ContainerInput>
            <InputNumber type="text" value={valueDocument} disabled={true} />
            <p style={{ color: "#305381", fontWeight: 700 }}>
              Continuar sin documento
            </p>
            <div>
              <ButtonBasic
                textButton={"Borrar"}
                bgColor="#909090"
                bgHvColor={"#a6a6a6"}
                onClick={deleteEndCharacter}
                styl={{ fontSize: "1.5em", height: "60px", margin: "0" }}
              />
              <ButtonBasic
                textButton={"Continuar"}
                onClick={createTurner}
                styl={{ fontSize: "1.5em", height: "60px", margin: "0" }}
              />
            </div>
          </ContainerInput>
        </>
      )}
    </MainContainerModalKeyBoard>
  );

  return <Modal render={render}></Modal>;
};

export default ModalKeyBoard;

const ContainerInput = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 110px 20px;

  p {
    font-size: 1.5em;
  }

  div {
    width: 100%;
    display: flex;
    gap: 10px;
  }
`;

const InputNumber = styled.input`
  border: 1px solid #d6d6d6;
  width: 80%;
  height: 100px;
  border-radius: 30px;
  outline: none;
  padding: 20px;
  font-size: 2.5em;
  text-align: center;

  &:disabled {
    background-color: white;
  }
`;

const MainContainerModalKeyBoard = styled.div`
  display: flex;
`;

const ContainerPrint = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 4em;
    color: var(--color-primary);
  }
`;

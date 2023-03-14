import localforage from "localforage";
import { useEffect } from "react";
import { useState } from "react";
import Countdown from "react-countdown";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Sucess from "../../animations/Sucess";
import { setDataTurn } from "../../store/slice/turns/turns.slice";
import {
  asignedTurn,
  getTurnsAsigned,
} from "../../store/slice/turns/turnsThunk";
import ButtonPrimary from "../buttons/ButtonPrimary";
import InputAutocompleteSearch from "../inputs/InputAutocompleteSearch";
import InputLine from "../inputs/InputLine";
import Modal from "../modal/Modal";

const ModalAsignacion = () => {
  const dispatch = useDispatch();
  const { onlyTurn, userAsigned } = useSelector((state) => state.turn);
  const [isStart, setIsStart] = useState(true);
  const [timerEndDate, setTimerEndDate] = useState(Date.now() + 10000);
  const [count, setCount] = useState(0);
  const [options, setOptions] = useState([]);
  const [idUser, setIdUser] = useState(null);
  const [name, setName] = useState(null);
  const [isSucess, setIsSucess] = useState(false);

  useEffect(() => {
    localforage.getItem(`${onlyTurn[0].id}`).then((value) => {
      if (!value) {
        console.log("no existe");
        localforage.setItem(`${onlyTurn[0].id}`, { count: 1 });
        setCount(1);
      } else {
        console.log("existe");
        localforage.setItem(`${onlyTurn[0].id}`, { count: value.count + 1 });
        setCount(value.count + 1);
      }
    });
  }, [timerEndDate]);

  useEffect(() => {
    const options = userAsigned.users?.map((user) => {
      return {
        value: user.id,
        label: user.name,
      };
    });
    setOptions(options);
  }, [userAsigned]);

  useEffect(() => {
    dispatch(getTurnsAsigned());
  }, []);

  const endTime = () => {
    setIsStart(false);
  };

  const llamar = () => {
    setIsStart(true);
    setTimerEndDate(Date.now() + 10000);
  };

  const cancel = () => {
    setIsStart(false);
    localforage.removeItem(`${onlyTurn[0].id}`);
  };

  const asignar = () => {
    if (!name || !idUser) {
      return alert("El nombre y el usuario son obligatorios");
    }

    const data = {
      nameUser: name,
      cedulaUser: onlyTurn[0].cedulaUser,
      userId: idUser,
      turnId: onlyTurn[0].id,
    };

    dispatch(asignedTurn(data));

    setIsSucess(true);

    setTimeout(() => {
      dispatch(setDataTurn({ option: "viewModal", value: false }));
      setIsSucess(false);
    }, 2000);
  };

  const renderModal = (
    <InfoModal>
      {isSucess ? (
        <ContSucess>
          <Sucess />
          <h2>Turno Asignado Correctamente</h2>
        </ContSucess>
      ) : (
        <>
          {" "}
          <h1>TURNO {onlyTurn[0].sequence}</h1>
          <ContInputs>
            <InputLine
              type="text"
              textName="Nombre"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputLine
              type="text"
              textName="Cedula"
              name="name"
              value={onlyTurn[0].cedulaUser}
            />
            <InputAutocompleteSearch
              option={options}
              onChange={(event, newValue) => {
                setIdUser(newValue.value);
              }}
            />
          </ContInputs>
          <ContButtons>
            {(count < 3 || isStart) && (
              <ButtonPrimary
                style={{ backgroundColor: isStart ? "#bfbfbf" : "black" }}
                disabled={isStart ? true : false}
                onClick={() => llamar()}
              >
                {isStart ? (
                  <Countdown
                    intervalDelay={1000}
                    onStart={() => console.log("Iniciado")}
                    onComplete={() => endTime()}
                    date={timerEndDate} // Establece la duración del temporizador en milisegundos
                    renderer={({ seconds }) => (
                      <span>Llamando... {seconds}</span>
                    )}
                  />
                ) : (
                  "Llamar"
                )}
              </ButtonPrimary>
            )}
            <ButtonPrimary onClick={asignar}>Asignar</ButtonPrimary>
            {count >= 3 && (
              <ButtonPrimary
                style={{ backgroundColor: "#ff3f3f" }}
                onClick={() => cancel()}
              >
                Cancelar
              </ButtonPrimary>
            )}
          </ContButtons>
        </>
      )}
    </InfoModal>
  );

  return (
    <ContModalAsignacion>
      <Modal
        width={"600px"}
        height={"400px"}
        viewSvg={false}
        render={renderModal}
      />
    </ContModalAsignacion>
  );
};

export default ModalAsignacion;

const ContModalAsignacion = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const InfoModal = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  h1 {
    font-size: 2rem;
    font-weight: 500;
  }
`;

const ContInputs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const ContButtons = styled.div`
  width: 85%;
  display: flex;
  justify-content: space-around;
  gap: 20px;
  button {
    width: 35%;
    height: 40px;
    font-size: 1.1rem;
  }
`;

const ContSucess = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  h2 {
    font-size: 1.8rem;
  }
`;

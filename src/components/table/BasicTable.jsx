import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import io from "socket.io-client";
import {
  getTurns,
  getTurnsById,
  getTurnsByUser,
} from "../../store/slice/turns/turnsThunk";
import localforage from "localforage";
import { setDataTurn } from "../../store/slice/turns/turns.slice";

const BasicTable = () => {
  const socket = io(process.env.REACT_APP_URL_SOCKET);
  const dispatch = useDispatch();
  const { turns } = useSelector((state) => state.turn);
  const [turnos, setTurnos] = useState(useSelector((state) => state.turn));
  const [role, setRole] = useState(null);

  useEffect(() => {
    localforage.getItem("user").then((value) => {
      setRole(value.user.roleId);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /******  Obtenemos los turnos dependiendo el rol  *******/
  useEffect(() => {
    if (role === 1) {
      dispatch(getTurns("pendding"));
    } else {
      dispatch(getTurnsByUser("pendding"));
    }
  }, [role]);

  useEffect(() => {
    socket.on("turn", (data) => {
      console.log("data", data);
      if (data === 4) {
        console.log("entro");
        return dispatch(getTurnsByUser("pendding"));
      }

      console.log("aca rambien");
      if (role === 1) {
        dispatch(getTurns("pendding"));
      }
    });

    socket.on("pendientes", (data) => {
      if (role !== 1) {
        return dispatch(getTurnsByUser("pendding"));
      }

      if (role === 1) {
        dispatch(getTurns("pendding"));
      }
    });

    if (turns.turns) {
      socket.on("llamar", (data) => {
        console.log(turnos);
        const updateTurns = turns?.turns?.filter((turn) => {
          return turn.id !== data;
        });

        const newData = {
          ...turns,
          turns: updateTurns,
        };

        dispatch(setDataTurn({ option: "turns", value: newData }));
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [turns]);

  const callTurn = (id) => {
    const test = turns.turns.filter((turn) => turn.id === id);
    dispatch(setDataTurn({ option: "onlyTurn", value: test }));
    dispatch(setDataTurn({ option: "viewModal", value: true }));
    socket.emit("llamar", id);
    dispatch(getTurnsById(id));
  };

  return (
    <MainContTable>
      <ContHeaderTable>
        <HeaderTable>
          <li className="turno">Turno</li>
          <li className="servicio">Servicio</li>
          <li className="cedula">Cedula</li>
          <li className="name">Nombre</li>
        </HeaderTable>
        <HeaderTable gap="20px">
          <li className="estado">Estado</li>
          <li>Acciones</li>
        </HeaderTable>
      </ContHeaderTable>

      {turns.turns?.map((turn) => (
        <ContRows key={turn.id}>
          <RowTable>
            <li className="turno">{turn.sequence}</li>
            <li className="servicio">{turn.servicio.nameButton}</li>
            <li className="cedula">{turn.cedulaUser}</li>
            <li className="name">
              {turn.nameUser ? turn.nameUser : "Sin nombre"}
            </li>
          </RowTable>
          <RowTable gap="20px">
            <li className="pendiente">Pendiente</li>
            <li>
              <ButtonLlamar onClick={() => callTurn(turn.id)}>
                Llamar
              </ButtonLlamar>
            </li>
          </RowTable>
        </ContRows>
      ))}
    </MainContTable>
  );
};

export default BasicTable;

const MainContTable = styled.div``;

const ContHeaderTable = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #e8f0fe;
  padding-bottom: 5px;

  .name {
    width: 150px;
  }

  li {
    text-align: center;
  }
`;

const HeaderTable = styled.ul`
  display: flex;
  gap: ${(props) => props.gap || "10px"};

  .turno {
    width: 50px;
  }

  .servicio {
    width: 80px;
  }

  .estado {
    text-align: center;
  }

  .cedula {
    width: 80px;
  }

  li {
    width: 120px;
    color: #5f6368;
    font-weight: 600;
  }
`;

const RowTable = styled.ul`
  display: flex;
  align-items: center;
  gap: ${(props) => props.gap || "10px"};

  .name {
    width: 150px;
    font-size: 0.8em;
  }

  .turno {
    width: 50px;
    font-size: 0.7em;
    font-weight: 500;
    color: black;
  }

  .servicio {
    width: 80px;
    font-size: 0.9em;
  }

  .cedula {
    width: 80px;
  }

  .pendiente {
    background-color: #f4b400;
    color: white;
    border-radius: 15px;
    font-weight: 500;
    text-align: center;
    font-size: 1em;
  }

  li {
    width: 120px;
    color: gray;
    text-align: center;
  }
`;

const ContRows = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
`;

const ButtonLlamar = styled.button`
  background-color: #000000;
  color: white;
  width: 100px;
  border-radius: 15px;
`;

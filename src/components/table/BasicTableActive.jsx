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

const BasicTableActive = () => {
  const dispatch = useDispatch();
  const { turns } = useSelector((state) => state.turn);
  const [role, setRole] = useState(null);
  const [turnAgain, setTurnAgain] = useState(false);

  useEffect(() => {
    localforage.getItem("user").then((value) => {
      setRole(value.user.roleId);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /******  Obtenemos los turnos dependiendo el rol  *******/
  useEffect(() => {
    if (role === 1) {
      dispatch(getTurns("active"));
    } else {
      dispatch(getTurnsByUser("active"));
    }
  }, [role]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_URL_SOCKET);

    socket.on("turn", (data) => {
      dispatch(getTurns());
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const callTurn = (id) => {
    const test = turns.turns.filter((turn) => turn.id === id);
    dispatch(setDataTurn({ option: "onlyTurn", value: test }));
    dispatch(setDataTurn({ option: "viewModal", value: true }));
    console.log("llamo");
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
            <li className="pendiente">Activo</li>
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

export default BasicTableActive;

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
    background-color: #67ab48;
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

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import styled from "styled-components";
import logo from "../assets/logos/logo-principal.png";
import localforage from "localforage";

function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
}

export default function TestImpresion(props) {
  const { isPrint, infoTurn } = useSelector((state) => state.turn);
  const componentRef = useRef();

  const [nameTurn, setNameTurn] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const getNameTurno = async () => {
      const data = await localforage.getItem("user");
      setNameTurn(data.user.name);
      setIsDataLoaded(true);
    };
    getNameTurno();
  }, []);

  const ComponentToPrint = forwardRef((props, ref) => {
    const now = new Date();
    const fechaHora = formatDate(now);

    return (
      <Div ref={ref}>
        <img src={logo} alt="image" width={"80px"} height="10px" />
        <h2>{infoTurn?.nameButton.toUpperCase()}</h2>
        <h1>{infoTurn?.sequence}</h1>
        <div>
          <p>{fechaHora}</p>
          <p>{nameTurn}</p>
        </div>
      </Div>
    );
  });

  useEffect(() => {
    if (isPrint && isDataLoaded) {
      handlePrint();
    }
  }, [isPrint, isDataLoaded]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div style={{ display: "none" }}>
      <ComponentToPrint ref={componentRef} />
    </div>
  );
}

const Div = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 82mm;

  div {
    width: 100%;
    display: flex;
    justify-content: space-between;

    p:nth-child(1) {
      font-size: 0.8em;
      text-align: start;
    }

    p:nth-child(2) {
      font-size: 0.8em;
      text-align: end;
    }
  }

  p {
    width: 100%;
    text-align: end;
  }

  img {
    width: 72mm;
    height: 10mm;
  }

  h1 {
    font-size: 2.5em;
  }

  h2 {
    font-size: 1.5em;
  }

  @media print {
  }

  @page {
    size: 72mm 45mm;
    margin: 0;
  }
`;

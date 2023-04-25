import React, { forwardRef, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import styled from "styled-components";
import logo from "../assets/logos/logo.png";

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

  const ComponentToPrint = forwardRef((props, ref) => {
    const now = new Date();
    const fechaHora = formatDate(now);

    return (
      <Div ref={ref}>
        <img src={logo} alt="image" width={"120px"} height="100px" />
        <h2>{infoTurn?.nameButton.toUpperCase()}</h2>
        <h1>{infoTurn?.sequence}</h1>
        <div>
          <p>Turnero 1</p>
          <p>{fechaHora}</p>
        </div>
      </Div>
    );
  });

  useEffect(() => {
    if (isPrint) {
      handlePrint();
    }
  }, [isPrint]);

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 88mm;

  div {
    width: 100%;
    display: flex;

    p:nth-child(1) {
      text-align: start;
    }

    p:nth-child(2) {
    }
  }

  p {
    width: 100%;
    text-align: end;
  }

  img {
    height: 10mm;
  }

  h1 {
    font-size: 2.5em;
  }

  h2 {
    font-size: 1.5em;
  }

  @media print {
    @page {
      margin: 5mm;
    }
  }

  @page {
    size: 72mm 40mm;
    margin: 0;
  }
`;

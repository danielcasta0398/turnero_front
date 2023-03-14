import React, { forwardRef, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import styled from "styled-components";
import logo from "../assets/logos/logo.png";

export default function TestImpresion(props) {
  const { isPrint, infoTurn } = useSelector((state) => state.turn);
  const componentRef = useRef();

  const ComponentToPrint = forwardRef((props, ref) => {
    const now = new Date();
    const fechaHora = now.toLocaleString();

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
    justify-content: space-between;

    p:nth-child(1) {
      text-align: start;
    }

    p:nth-child(2) {
      text-align: end;
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

// import React, { forwardRef, useRef } from "react";
// import { useReactToPrint } from "react-to-print";
// import styled from "styled-components";
// import logo from "../assets/logos/logo.png";
// import jsPDF from "jspdf";

// const ComponentToPrint = forwardRef((props, ref) => (
//   <Div ref={ref}>
//     <img src={logo} alt="image" width={"200px"} />
//     <h1>URGENCIAS</h1>
//     <h2>URG-001</h2>
//   </Div>
// ));

// const generatePDF = () => {
//   const doc = new jsPDF({
//     orientation: "portrait",
//     unit: "mm",
//     format: [72, 50], // ajusta el ancho y la altura del documento según tu papel
//   });

//   doc.addImage(logo, "PNG", 10, 10, 50, 20); // agrega la imagen de tu logo en las coordenadas (10, 10) con un tamaño de 20 x 20 mm
//   doc.setFontSize(20);
//   doc.text("URGENCIAS", 20, 50); // agrega el texto "URGENCIAS" en las coordenadas (40, 20)
//   doc.setFontSize(16);
//   doc.text("URG-001", 20, 70); // agrega el texto "URG-001" en las coordenadas (40, 30)

//   doc.autoPrint();
//   doc.output("dataurlnewwindow");
// };

// export default function TestImpresion(props) {
//   const componentRef = useRef();
//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });

//   return (
//     <div>
//       <ComponentToPrint ref={componentRef} />
//       <button onClick={generatePDF}>Print</button>
//     </div>
//   );
// }

// const Div = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   height: 100px;
//   overflow: auto;

//   h1 {
//     font-size: 2em;
//   }

//   @page {
//     size: 72mm 100mm;
//     margin: 0;
//   }
// `;

// /*import React, { useRef } from "react";
// import logo from "../assets/logos/logo.png";

// const TestImpresion = ({ content }) => {
//   const iframeRef = useRef();

//   const handlePrint = () => {
//     const iframe = iframeRef.current;
//     const iframeWindow = iframe.contentWindow;

//     iframeWindow.document.body.innerHTML = `<div>
//        <img src=${logo} alt="logo" />
//       <h1>URGENCIAS</h1>
//       <h2>URG-001</h2>
//     </div>`;
//     iframeWindow.print();
//   };

//   return (
//     <>
//       <iframe title="print-frame" ref={iframeRef} style={{ display: "none" }} />
//       <button onClick={handlePrint}>Imprimir</button>
//     </>
//   );
// };

// export default TestImpresion;*/

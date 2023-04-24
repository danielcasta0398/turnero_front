import React from "react";
import styled from "styled-components";

const NewTable = ({ itemsHeader = [], itemsBody = [] }) => {
  return (
    <ContainerTable>
      <HeaderTable>
        {itemsHeader.map((item, index) =>
          itemsHeader.length === index + 1 ? (
            <HeaderItem
              key={index}
              style={{ textAlign: "center", paddingLeft: "10px" }}
            >
              {item}
            </HeaderItem>
          ) : (
            <HeaderItem key={index}>{item}</HeaderItem>
          )
        )}
      </HeaderTable>
      <BodyWrapper>
        <BodyTable>
          {itemsBody?.map((item, index) => (
            <BodyRow key={index}>
              {item.map((cell, cellIndex) =>
                itemsBody[0].length === cellIndex + 1 ? (
                  <BodyItem
                    key={cellIndex}
                    style={{ justifyContent: "center" }}
                  >
                    {cell}
                  </BodyItem>
                ) : (
                  <BodyItem key={cellIndex}>{cell}</BodyItem>
                )
              )}
            </BodyRow>
          ))}
        </BodyTable>
      </BodyWrapper>
    </ContainerTable>
  );
};

export default NewTable;

const ContainerTable = styled.div`
  font-family: Arial, sans-serif;
  width: 100%;
  height: 100%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const HeaderTable = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  background-color: #0a2344;
  color: #fff;
  z-index: 1;
`;

const BodyWrapper = styled.div`
  overflow-y: auto;
  max-height: 100vh; // Ajusta este valor según la altura máxima deseada en función del tamaño de la ventana
`;

const BodyTable = styled.div`
  display: grid;
  position: relative;
`;

const BodyRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1); // Agrega una línea suave como separación
`;

const HeaderItem = styled.div`
  font-weight: bold;
  padding: 10px 30px;
  text-transform: uppercase;
`;

const BodyItem = styled.div`
  padding: 10px 30px;
  display: flex;
  align-items: center;
`;

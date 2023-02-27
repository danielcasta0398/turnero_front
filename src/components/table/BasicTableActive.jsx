import React from "react";
import styled from "styled-components";

const BasicTable = () => {
  return (
    <div>
      <ContHeaderTable>
        <HeaderTable>
          <li>Turno</li>
          <li>Servicio</li>
          <li>Cedula</li>
          <li>Nombre</li>
        </HeaderTable>
        <HeaderTable>
          <li>Estado</li>
          <li>Acciones</li>
        </HeaderTable>
      </ContHeaderTable>
    </div>
  );
};

export default BasicTable;

const ContHeaderTable = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #e8f0fe;
  padding-bottom: 5px;
`;

const HeaderTable = styled.ul`
  display: flex;
  gap: 10px;

  li {
    width: 100px;
    color: #5f6368;
    font-weight: 600;
  }
`;

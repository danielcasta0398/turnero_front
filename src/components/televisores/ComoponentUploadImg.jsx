import React from "react";
import styled from "styled-components";
import { addIcon } from "../../assets/svg/svgs";
import { useState } from "react";
import { useEffect } from "react";

const ComoponentUploadImg = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  useEffect(() => {
    if (dragCounter === 0) {
      setIsDragOver(false);
    }
  }, [dragCounter]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragCounter((prev) => prev + 1);
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragCounter((prev) => prev - 1);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    setDragCounter(0);
    // Aquí continuarías con el manejo de los archivos soltados.
  };

  return (
    <ComponentMain>
      <ComponentUploadImg
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {isDragOver && (
          <DropImage>
            <h1>Suelta la Imagen</h1>
          </DropImage>
        )}
        <ContTextUploadImg>
          {addIcon}
          <h1>Subir Imagen</h1>
          <p>O arrástralas y suéltalas</p>
        </ContTextUploadImg>
      </ComponentUploadImg>
    </ComponentMain>
  );
};

export default ComoponentUploadImg;

const ComponentMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
`;

const ComponentUploadImg = styled.div`
  position: relative;
  width: 80%;
  height: 50%;
  border: 2px dashed #cfd8dc;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContTextUploadImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 20px;
    color: #cfd8dc;
    font-weight: 700;
  }

  p {
    font-size: 15px;
    color: #cfd8dc;
    font-weight: 400;
  }

  svg {
    width: 100px;
    height: 100px;
    fill: #cfd8dc;

    path {
      fill: #cfd8dc;
    }
  }
`;

const DropImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgb(255 255 255 / 70%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
`;

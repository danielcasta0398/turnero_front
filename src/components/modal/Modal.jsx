import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setIsOpenModal } from "../../store/slice/isOpenModal.slice";
import { setValueDocument } from "../../store/slice/valueDocument.slice";
import { MaintContainer } from "../containers/MainContainer";

const Modal = ({ width, height, render }) => {
  const isActiveModal = useSelector((state) => state.isActiveModal);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setValueDocument(""));
    dispatch(setIsOpenModal(false));
    clearTimeout(isActiveModal);
  };

  return (
    <MaintContainer
      display="flex"
      style={{
        position: "absolute",
        backgroundColor: "rgb(0 0 0 / 35%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "5",
      }}
    >
      <MaintContainerModal width={width} height={height}>
        <svg
          onClick={closeModal}
          width="512"
          height="512"
          version="1.1"
          viewBox="0 0 329.27 329"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m194.8 164.77 128.21-128.22c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0l-128.22 128.21-128.21-128.21c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.22-128.21 128.21c-8.344 8.34-8.344 21.825 0 30.164a21.266 21.266 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.21 128.22 128.21a21.273 21.273 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164z"
            data-original="#000000"
          />
        </svg>
        {render}
      </MaintContainerModal>
    </MaintContainer>
  );
};

export default Modal;

const MaintContainerModal = styled.div`
  width: ${(props) => (props.width ? props.width : "90%")};
  height: ${(props) => (props.height ? props.height : "90%")};
  max-width: 1200px;
  max-height: 700px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  svg {
    width: 30px;
    height: 30px;
    fill: #305381;
    margin-top: 20px;
    position: absolute;
    top: 0;
    right: 20px;
    cursor: pointer;
  }
`;

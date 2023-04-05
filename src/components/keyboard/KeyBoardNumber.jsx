import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setIsActiveModal } from "../../store/slice/isActiveModal.slice";
import { setIsOpenModal } from "../../store/slice/isOpenModal.slice";
import { setValueDocument } from "../../store/slice/valueDocument.slice";
import { toggleFullScreen } from "../../utils/ScreenFull";
import localforage from "localforage";
import { useNavigate } from "react-router-dom";

const KeyBoardNumber = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const valueDocument = useSelector((state) => state.valueDocument);
  const isActiveModal = useSelector((state) => state.isActiveModal);
  const dispatch = useDispatch();
  const changeNumber = (number) => dispatch(setValueDocument(number));
  const setIsOpen = (isOpen) => dispatch(setIsOpenModal(isOpen));
  const cancelModal = (cancel) => dispatch(setIsActiveModal(cancel));
  const navigate = useNavigate();

  const handleNumber = (number) => {
    clearTimeout(isActiveModal);
    cancelModal(
      setTimeout(() => {
        setIsOpen(false);
        changeNumber("");
      }, 1000 * 10)
    );

    if (valueDocument.toString().length > 12) {
      return;
    }

    changeNumber(valueDocument.toString() + number.toString());
  };

  /*This function allows us to put the full screen if you execute the correct code*/

  useEffect(() => {
    if (valueDocument === "001451") {
      changeNumber("");

      return toggleFullScreen(document);
    }

    if (valueDocument === "001021") {
      localforage.clear();
      navigate("/login");
    }
  }, [valueDocument, navigate, changeNumber]);

  return (
    <MaintContainerKeyboard>
      {numbers.map((number) =>
        number === 0 ? (
          <button
            key={number}
            style={{ gridColumn: "2/3" }}
            onClick={() => {
              handleNumber(number);
            }}
          >
            {number}
          </button>
        ) : (
          <button
            key={number}
            onClick={() => {
              handleNumber(number);
            }}
          >
            {number}
          </button>
        )
      )}
    </MaintContainerKeyboard>
  );
};

export default KeyBoardNumber;

const MaintContainerKeyboard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;

  button {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #d6d6d6;
    font-size: 1.8em;
    font-weight: 500;
    transition: all 0.1s ease-in-out;
    cursor: pointer;

    &:active {
      transform: scale(0.95);
      background-color: #d6d6d6;
    }
  }
`;

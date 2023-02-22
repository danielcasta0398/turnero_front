import React, { useState } from "react";
import styled from "styled-components";

const InputLine = ({ textName, value, textError, ...custom }) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  const className = focused || value ? "input-focused" : "";

  return (
    <MainContainerInputLine textError={textError}>
      <input
        {...custom}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={className}
      />
      <label>{textName}</label>
      {textError && (
        <p>
          <svg
            xmlns="https://www.w3.org/2000/svg"
            aria-hidden="true"
            className="stUf5b qpSchb"
            fill="currentColor"
            focusable="false"
            width="16px"
            height="16px"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          {textError}
        </p>
      )}
    </MainContainerInputLine>
  );
};

export default InputLine;

const MainContainerInputLine = styled.div`
  position: relative;
  width: 80%;

  label {
    position: absolute;
    bottom: ${(props) => (props.textError ? "20px" : "2px")};
    left: 0;
    transition: all 0.2s ease-out;
    pointer-events: none;
    color: #bbb;
  }

  input {
    width: 100%;
    outline: none;
    border-bottom: ${(props) =>
      props.textError ? "1px solid #ff2d2d" : "1px solid #bbb"};
    transition: all 0.2s ease-out;
    padding-bottom: 2px;
  }

  .input-focused {
    border-bottom: ${(props) =>
      props.textError ? "1px solid #ff2d2d" : "2px solid var(--color-primary)"};
  }

  .input-focused + label {
    color: ${(props) => (props.textError ? "#ff2d2d" : "var(--color-primary)")};
    transform: translateY(-24px);
  }

  p {
    display: flex;
    color: #ff2d2d;
    font-size: 0.7em;
    margin-top: 0px;
    gap: 5px;
    align-items: center;

    svg {
      fill: #ff2d2d;
    }
  }
`;

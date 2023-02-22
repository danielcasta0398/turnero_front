import React from "react";
import styled from "styled-components";

const InputBasic = ({
  label,
  placeholder,
  type,
  autoFocus,
  onChange,
  textError,
  event,
  nameInput,
  value,
  spellCheck = true,
}) => {
  return (
    <MainContInput error={textError}>
      <label htmlFor={label}>{label}</label>
      <Input
        value={value ? value : ""}
        type={type ? type : "text"}
        placeholder={placeholder}
        id={label}
        error={textError}
        autoFocus={autoFocus ? autoFocus : false}
        onChange={onChange ? onChange : null}
        autoComplete="off"
        onKeyDown={event ? event : null}
        name={nameInput ? nameInput : null}
        spellCheck={spellCheck ? spellCheck : false}
      />
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
    </MainContInput>
  );
};

export default InputBasic;

const MainContInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  ${(props) => props.error && "label {color: #ff2d2d}"}
  ${(props) =>
    props.error &&
    `input {
    &:focus {
      border: 1px solid #ff2d2d !important;
    }
  }`}

  label {
    font-size: 1.1em;
    font-weight: 500;
    color: "#2f2f2f";
  }

  p {
    display: flex;
    color: #ff2d2d;
    font-size: 0.9em;
    margin-top: -3px;
    gap: 5px;
    align-items: center;

    svg {
      fill: #ff2d2d;
    }
  }

  input {
    &::placeholder {
      font-size: 1.2em;
    }

    &:focus {
      border: 3px solid #305381;
    }
  }

  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  border: ${(props) =>
    props.error ? "1px solid #ff2d2d" : "1px solid #d6d6d6"};
  outline: none;
  font-size: 1rem;
  line-height: 1.5rem;
  border-radius: 5px;
  padding: 10px 15px;
`;

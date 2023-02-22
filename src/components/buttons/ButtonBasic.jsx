import React from "react";
import styled from "styled-components";

const ButtonBasic = ({
  textButton,
  isDisabled,
  styl,
  colorText,
  bgColor,
  bgHvColor,
  onClick,
  style,
  colorDisabled,
}) => {
  return (
    <Button
      colorDisabled={colorDisabled}
      //disabled={isDisabled?.state || colorDisabled?.status ? true : false}
      disabled={isDisabled}
      disabledStyle={isDisabled}
      style={styl}
      colorText={colorText}
      bgColor={bgColor}
      bgHvColor={bgHvColor}
      onClick={onClick}
      {...style}
    >
      {textButton}
    </Button>
  );
};

export default ButtonBasic;

const Button = styled.button`
  width: 100%;
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : "var(--colorprimary-button)"};
  height: 50px;
  border-radius: 5px;
  color: ${(props) => (props.colorText ? props.Text : "white")};
  font-size: 1.2em;
  font-weight: 500;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "30px")};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.bgHvColor ? props.bgHvColor : "")};
  }

  &:disabled {
    background-color: ${(props) =>
      props.colorDisabled ? props.colorDisabled.color : " #d6d6d6"};
    color: ${(props) => (props.colorDisabled ? "white" : " #a0a0a0;")};
  }

  &:active {
    transform: ${(props) =>
      props.disabled?.state ? "scale(1)" : "scale(0.95)"};
    background-color: ${(props) =>
      props.disabled?.state
        ? props.disabled.color
        : "var(--colorprimary-button)"};
  }

  ${(props) => (props.style ? props.style : "")}
`;

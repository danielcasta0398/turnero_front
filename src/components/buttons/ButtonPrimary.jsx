import React from "react";
import styled from "styled-components";

const ButtonPrimary = ({ children, className, ...rest }) => {
  return (
    <Button className={className} {...rest}>
      {children}
    </Button>
  );
};

export default ButtonPrimary;

const Button = styled.button`
  width: auto;
  background-color: var(--colorprimary-button);
  color: white;
  padding: 5px 20px;
  border-radius: 15px;
  font-weight: 500;
`;

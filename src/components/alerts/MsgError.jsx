import React from "react";
import styled from "styled-components";

const MsgError = ({ text }) => {
  return (
    <ContainerMsgError>
      <p>{text}</p>
    </ContainerMsgError>
  );
};

export default MsgError;

const ContainerMsgError = styled.div`
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
  padding: 0.75rem 1.25rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  text-align: center;
`;

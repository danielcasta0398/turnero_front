import styled from "styled-components";
const DarkMode = false;

export const MaintContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: ${(props) => (props.display ? props.display : "")};
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#f4f4f4")};
  ${DarkMode && "background-color : #111827 !important"}
  ${(props) => (props.sty ? props.sty : "")}
`;

export const ContainerForm = styled.div`
  width: 90%;
  max-width: 500px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  background-color: white;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h1 {
    font-size: 2em;
    font-weight: 500;
  }

  form {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  @media (max-width: 400px) {
    padding: 20px;
    font-size: 14px;
  }

  ${DarkMode &&
  `background-color : #1E293B !important;
  color : #CBD5E1 !important;
  border : 1px solid #374151 !important;

  h1{
    color: white !important;
  }

  input{
    background-color : #374151 !important;
    border : 1px solid #475264 !important;
    color : white !important;
    font-weight : 500 !important;

    &:focus {
      border: 3px solid #3F83F8 !important;
    }
  }
  
  button{
    color : white !important;
    background-color: #3F83F8;
    &:hover {
      background-color: #1A56DB;
    }
    &:disabled {
    background-color: #707070;
    color: #CBD5E1;
    &:active {
      transform: none;
    }
  }
  }
  
  `}
`;

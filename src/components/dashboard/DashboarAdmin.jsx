import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { iconTurnero, iconTv } from "../../assets/svg/svgs";

const DashboarAdmin = () => {
  const navigate = useNavigate();

  const optionsDashboard = [
    {
      svg: (
        <svg
          width="512"
          height="512"
          version="1.1"
          viewBox="0 0 80.13 80.13"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M48.355 17.922c3.705 2.323 6.303 6.254 6.776 10.817a11.69 11.69 0 0 0 4.966 1.112c6.491 0 11.752-5.261 11.752-11.751 0-6.491-5.261-11.752-11.752-11.752-6.429.002-11.644 5.169-11.742 11.574zm-7.699 24.062c6.491 0 11.752-5.262 11.752-11.752s-5.262-11.751-11.752-11.751c-6.49 0-11.754 5.262-11.754 11.752s5.264 11.751 11.754 11.751zm4.985.801h-9.972c-8.297 0-15.047 6.751-15.047 15.048v12.195l.031.191.84.263c7.918 2.474 14.797 3.299 20.459 3.299 11.059 0 17.469-3.153 17.864-3.354l.785-.397h.084V57.833c.003-8.297-6.747-15.048-15.044-15.048zm19.443-12.132h-9.895a14.483 14.483 0 0 1-4.47 10.088c7.375 2.193 12.771 9.032 12.771 17.11v3.758c9.77-.358 15.4-3.127 15.771-3.313l.785-.398h.084V45.699c0-8.296-6.75-15.046-15.046-15.046zm-45.049-.8c2.299 0 4.438-.671 6.25-1.814a14.544 14.544 0 0 1 5.467-9.276c.012-.22.033-.438.033-.66 0-6.491-5.262-11.752-11.75-11.752-6.492 0-11.752 5.261-11.752 11.752 0 6.488 5.26 11.75 11.752 11.75zm10.554 10.888a14.492 14.492 0 0 1-4.467-10.032c-.367-.027-.73-.056-1.104-.056h-9.971C6.75 30.653 0 37.403 0 45.699v12.197l.031.188.84.265c6.352 1.983 12.021 2.897 16.945 3.185v-3.683c.002-8.078 5.396-14.915 12.773-17.11z"
            data-original="#000000"
          />
        </svg>
      ),
      text: "Usuarios",
      onClick: () => {
        navigate("/dashboard/usuarios");
      },
    },
    {
      svg: (
        <svg
          width="512"
          height="512"
          version="1.1"
          viewBox="0 0 30 30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              d="M26.125 19.095V6.635c0-1.61-1.31-2.92-2.92-2.92H6.785c-1.61 0-2.92 1.31-2.92 2.92v12.46l-1.01 4.6a2.128 2.128 0 0 0 2.07 2.59h20.14c1.182 0 2.13-.973 2.13-2.13 0-.407-1.092-5.16-1.07-5.06zm-2-.88H5.865V6.635a.92.92 0 0 1 .92-.92h16.42a.92.92 0 0 1 .92.92v11.58z"
              data-original="#000000"
            />
            <path
              d="M17.84 13.295a.627.627 0 0 0-.683.03 3.768 3.768 0 0 1-2.152.694c-.794 0-1.532-.263-2.166-.7a.65.65 0 0 0-.72-.003c-.165.105-.316.23-.452.371a2.746 2.746 0 0 0-.823 2.011c.005.507.434.91.94.91h6.42c.534 0 .958-.44.952-.974a2.775 2.775 0 0 0-1.317-2.339zM15.004 12.873c1.336 0 2.417-1.726 2.417-3.062a2.416 2.416 0 0 0-2.417-2.417 2.424 2.424 0 0 0-2.426 2.417c0 1.336 1.09 3.062 2.426 3.062z"
              data-original="#000000"
            />
          </g>
        </svg>
      ),
      text: "Consultorios",
      onClick: () => {
        navigate("/dashboard/consultorios");
      },
    },
    {
      svg: iconTurnero,
      text: "Turneros",
      onClick: () => {
        navigate("/dashboard/turneros");
      },
    },
    {
      svg: iconTv,
      text: "Televisores",
    },
    {
      svg: (
        <svg
          width="512"
          height="512"
          version="1.1"
          viewBox="0 0 510 510"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M321.712 185.221c165.925 0 153.667-.035 156.222.064a34.353 34.353 0 0 0-8.968-15.636l-45.491-45.491c-9.83-9.831-24.922-12.689-37.558-7.108-6.785 2.998-14.87 1.485-20.118-3.763-5.248-5.247-6.76-13.332-3.764-20.117 5.581-12.633 2.725-27.727-7.108-37.559l-45.49-45.491c-13.484-13.482-35.422-13.483-48.906 0l-56.914 56.914 118.095 118.187zM182.404 88.248l-96.973 96.973h193.854c-.351-.352-7.77-7.779-96.881-96.973zM488.468 345.72C501.347 340.734 510 328.04 510 314.136v-64.333c0-19.068-15.514-34.582-34.582-34.582H405v294.771h70.418c19.068 0 34.582-15.514 34.582-34.582v-64.333c0-13.903-8.652-26.597-21.531-31.584-6.918-2.68-11.566-9.466-11.566-16.887s4.648-14.207 11.565-16.886zM0 249.803v64.333c0 13.904 8.653 26.598 21.531 31.583 6.918 2.68 11.565 9.466 11.565 16.887s-4.648 14.207-11.566 16.887C8.652 384.48 0 397.173 0 411.077v64.333c0 19.068 15.514 34.582 34.582 34.582H375V215.221H34.582C15.514 215.221 0 230.734 0 249.803zm105 35.189h225v30H105zm0 60h225v30H105zm0 60h225v30H105z"
            data-original="#000000"
          />
        </svg>
      ),
      text: "Turnos",
    },
  ];

  return (
    <MainContainerDashboard>
      <ContMenuItems>
        {optionsDashboard.map((option, index) => (
          <CardOption key={index} onClick={option.onClick}>
            {option.svg}
            <p>{option.text}</p>
          </CardOption>
        ))}
      </ContMenuItems>
    </MainContainerDashboard>
  );
};

export default DashboarAdmin;

const MainContainerDashboard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 20px;
`;

const ContMenuItems = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 200px);
  justify-content: center;
  width: 70%;
  gap: 20px;
`;

const CardOption = styled.div`
  width: 200px;
  height: 200px;
  background-color: var(--color-primary);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }

  &:active {
    transform: scale(0.97);
  }

  svg {
    width: 60px;
    height: 60px;
    fill: white;
  }

  p {
    color: white;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    &:hover {
      transform: none;
    }

    &:active {
      transform: scale(0.97);
    }
  }
`;

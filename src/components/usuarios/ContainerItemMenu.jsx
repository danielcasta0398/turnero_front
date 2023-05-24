import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

const ContainerItemMenu = ({ icon, text, path }) => {
  const location = useLocation();
  return (
    <StyledNavLink
      to={path}
      isActive={(match, location) => location.pathname === path}
    >
      <ContainerOnlyItemMenu>
        {icon}
        {text}
      </ContainerOnlyItemMenu>
    </StyledNavLink>
  );
};

export default ContainerItemMenu;

const ContainerOnlyItemMenu = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-weight: 500;
  font-size: 1.1rem;
  gap: 30px;
  color: gray;

  svg {
    width: 20px;
    height: 20px;
    fill: gray;

    path {
      fill: gray;
    }

    & > path {
      width: 20px;
      height: 20px;
      fill: gray;
    }

    g {
      width: 20px;
      height: 20px;
      fill: gray;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  &.active {
    div {
      color: #1967d2;
      border-radius: 0 25px 25px 0;
      background-color: #e8f0fe;

      svg {
        fill: #1967d2;

        path {
          width: 20px;
          height: 20px;
          fill: #1967d2;
        }

        & > path {
        }

        g {
          fill: #1967d2;
        }
      }
    }
  }

  &.active:hover {
    div {
      color: #1967d2;
      border-radius: 0 25px 25px 0;
      background-color: #e8f0fe;
    }
  }

  &:hover {
    div {
      border-radius: 0 25px 25px 0;
      background-color: #f0f0f0;
    }
  }
`;

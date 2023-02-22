import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import logo from "../../assets/logos/logo-blanco.png";
import UserNav from "../UserNav/UserNav";

const Navigation = ({ userName }) => {
  const isMobile = useMediaQuery({ maxWidth: 520 });
  return isMobile ? (
    <ul className="nav__mobile">
      <li className="nav__mobile-item">
        <Link to="/" className="nav__mobile-link">
          Home
        </Link>
      </li>
      <li className="nav__mobile-item">
        <Link to="/about" className="nav__mobile-link">
          About
        </Link>
      </li>
      <li className="nav__mobile-item">
        <Link to="/contact" className="nav__mobile-link">
          Contact
        </Link>
      </li>
    </ul>
  ) : (
    <Nav>
      <img src={logo} alt="logo" />
      <UserNav userName={userName} />
    </Nav>
  );
};

export default Navigation;

const Nav = styled.nav`
  width: 100%;
  background-color: var(--color-primary);
  height: 13%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;

  img {
    width: 280px;
    z-index: 1;
    padding: 5px;
    border-radius: 5px;
  }
  /* .nav__mobile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav__mobile-item {
    margin: 10px 0;
  }

  .nav__mobile-link {
    text-decoration: none;
    color: black;
  }

  .nav__desktop {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }*/
`;

const ContUser = styled.div``;

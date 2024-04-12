import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import styled from 'styled-components'

const StyledNavbar = styled(Navbar)`
  background-color: #333;
  border: none;
  padding: 0;
  height: 70px;
`;

const StyledNav = styled(Nav)`
  a {
    color: #fff;
    margin-right: 15px;

    &:hover {
      color: #ddd;
    }
  }
`;

const StyledBrand = styled(Navbar.Brand)`
  font-weight: bold;
  display: flex;
  align-items: center;

  img {
    margin-right: 10px;
    width: 30px; // Adjust this value to change the size of the image
  }
`;

const Header = () => {
  return (
    <StyledNavbar variant="dark">
      <Container>
        <StyledBrand href="/">
          <img src="https://www.pngkey.com/png/full/168-1684318_golf-icon-white-yireh-online-business-solutions-golf.png" alt="Logo" />
          Hotel Intelligence
        </StyledBrand>
        <StyledNav className="me-auto">
          <Nav.Link href="/predict">Predict</Nav.Link>
          <Nav.Link href="/stats">Stats</Nav.Link>
          <Nav.Link href="/retrain">Retrain</Nav.Link>
        </StyledNav>
      </Container>
    </StyledNavbar>
  )
}

export default Header
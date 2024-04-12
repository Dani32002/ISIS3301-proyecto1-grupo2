import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'

const Header = () => {
  return (
    <Navbar bg="light" data-bs-theme="light" className='header'>
        <Container>
          <Navbar.Brand href="/">BI ;{"("}</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/predict">Predict</Nav.Link>
            <Nav.Link href="/stats">Stats</Nav.Link>
            <Nav.Link href="/retrain">Retrain</Nav.Link>
          </Nav>
        </Container>
    </Navbar>
  )
}

export default Header
import React from 'react'
import { Col, Nav, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <div className="footerContainer">
      <Row>
        <p className="footerParagraph">Making hotel managing an intelligent activity.</p>
      </Row>
      <Row className="contentColFooter">
        <Col sm={6}>
          <Row>
            <Nav variant='dark' className="navFooter flex-column">
              <Nav.Link href="/predict">Predict</Nav.Link>
              <Nav.Link href="/metrics">Metrics</Nav.Link>
              <Nav.Link href="/retrain">Retrain</Nav.Link>
            </Nav>
          </Row>
        </Col>
        <Col className="contactColFooter">
          <p className="subTitle">Contact us:</p>
          <ul>
            <li>Daniel Escalante Perez - <a href='mailto:d.escalante@uniandes.edu.co'>d.escalante@uniandes.edu.co</a></li>
            <li>Daniel Felipe Vargas Ulloa - <a href='mailto:d.vargasu@uniandes.edu.co'>d.vargasu@uniandes.edu.co</a></li>
            <li>Santiago Chamie Rey - <a href='mailto:s.chamie@uniandes.edu.co'>s.chamie@uniandes.edu.co</a></li>
          </ul>
        </Col>
      </Row>
      <Row>
        <p className="footerParagraph">2023 - Universidad de Los Andes</p>
      </Row>
    </div>
  )
}

export default Footer
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styled from 'styled-components'
import { Bar } from 'react-chartjs-2'; // You need to install this library

const LandingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  padding: 20px;
  box-sizing: border-box;
`;


const data = {
  labels: ['Poor Service', 'Dirty Rooms', 'Noisy Environment', 'Great Location', 'Friendly Staff', 'Delicious Food'],
  datasets: [
    {
      label: '# of Mentions',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
      ],
      borderWidth: 1,
    },
  ],
};

const Stats = () => {
  const negativeAspects = ['Poor Service', 'Dirty Rooms', 'Noisy Environment'];
  const positiveAspects = ['Great Location', 'Friendly Staff', 'Delicious Food'];

  return (
    <LandingContainer>
      <Container>
        <Row className="mb-4">
          <Col xs={12} className="text-center">
            <h1 className="font-weight-bold">Your Hotel's Stats</h1>

            <p> This is a summary of the most important aspects of your hotel <br></br>according to our machine learning model.</p>

          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={4}>
            <Card>
              <Card.Header>Average Rating</Card.Header>
              <Card.Body>
                <Card.Text>3.7</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={4}>
            <Card>
              <Card.Header>Number of Reviews</Card.Header>
              <Card.Body>
                <Card.Text>1223</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={4}>
            <Card>
              <Card.Header>Number of negative reviews</Card.Header>
              <Card.Body>
                <Card.Text>452</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={6}>
            <Card>
              <Card.Header>Most Complained Aspects</Card.Header>
              <Card.Body>
                {negativeAspects.map((aspect, index) => (
                  <Card.Text key={index}>
                    {aspect}
                  </Card.Text>
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6}>
            <Card>
              <Card.Header>Most Praised Aspects</Card.Header>
              <Card.Body>
                {positiveAspects.map((aspect, index) => (
                  <Card.Text key={index}>
                    {aspect}
                  </Card.Text>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12}>
            <Card>
              <Card.Header>Aspect Mentions</Card.Header>
              <Card.Body>
                <Bar data={data} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </LandingContainer>
  );
};

export default Stats;
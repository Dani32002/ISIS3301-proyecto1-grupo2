import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import styled from 'styled-components'
import axios from 'axios'; // Import axios

const LandingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px); // assuming the navbar height is 60px
  background-color: #f4f4f4;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
`;

function Retrain() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const fileContents = await file.text();

      console.log("File contents have been read");

      const data = JSON.parse(fileContents);

      console.log("File contents have been parsed");

      console.log("Data read from file:", data.slice(0, 5));

      // Replace fetch with axios
      const response = await axios.post('http://localhost:8000/retrain', data);

      console.log('File uploaded:', file.name);

      // If the response is successful, show a popup to the user
      if (response.status === 200) {
        alert('The training has ended successfully');
      }
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LandingContainer>
      <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
        {loading ? (
          <>
            <Spinner animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
            <p>The model is being retrained, this may take a few minutes...</p>
          </>
        ) : (
          <>
            <Row className="mb-4">
              <Col xs={12} className="text-center">
                <h1 className="font-weight-bold">Retrain the analysis model</h1>
                <p className="text-muted">Upload a JSON file with your hotel's reviews to retrain  <br></br>the model and customize it to your hotel's needs</p>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col className="my-3">
                <Form.Control type="file" accept=".json" onChange={handleFileChange} />
              </Col>
            </Row>
            <Row className="my-2">
              <Button variant="primary" onClick={handleUpload}>
                Upload and Retrain
              </Button>
            </Row>
          </>
        )}
      </Container>
    </LandingContainer>
  );
}

export default Retrain;
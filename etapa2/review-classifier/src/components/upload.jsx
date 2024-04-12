import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import styled from 'styled-components'

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


function Upload() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file first');
            return;
        }

        // TODO: Implement the logic to upload the file and obtain the information
        console.log('File uploaded:', file.name);
    };

    return (
        <LandingContainer>

            <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
                <Row className="mb-4">
                    <Col xs={12} className="text-center">
                        <h1 className="font-weight-bold">Upload your hotel's reviews</h1>

                        <p className="text-muted">Upload a JSON file with your hotel's reviews to <br></br> analyze them and obtain valuable insights</p>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col className="my-3">
                        <Form.Control type="file" accept=".json" onChange={handleFileChange} />
                    </Col>
                </Row>
                <Row className="my-2">
                    <Button variant="primary" onClick={handleUpload}>
                        Upload reviews
                    </Button>
                </Row>
            </Container>
        </LandingContainer>

    );
}

export default Upload
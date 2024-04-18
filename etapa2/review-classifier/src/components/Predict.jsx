import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';
import styled from 'styled-components';
import Comparison from './Comparison';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

const PredictContainer = styled.div`
  height: calc(100vh - 70px);
  background-color: #f4f4f4;
  padding: 20px;
  padding-top: 50px;
  box-sizing: border-box;
`;
const Predict = () => {

    const [review, setReview] = useState("");
    const [value, setValue] = useState(0);
    const [option, setOption] = useState("No");
    const [showAnswer, setShowAnswer] = useState(false);
    const [prediction, setPrediction] = useState(0);
    const [disableCheck, setDisableCheck] = useState(false);

    const [data, setData] = useState({
        labels: ['1', '2', '3', '4', '5'],
        datasets: [
            {
                label: 'Probabilities',
                data: [0, 0, 0, 0, 0],
                backgroundColor: 'aqua',
                borderColor: 'black',
                borderWidth: 1
            }
        ]
    });

    const cleanHandler = () => {
        setReview("");
        setValue(0);
        setOption("No");
        setShowAnswer(false);
        setPrediction(0);
        setDisableCheck(false);
        setData({
            labels: ['1', '2', '3', '4', '5'],
            datasets: [
                {
                    label: 'Probabilities',
                    data: [0, 0, 0, 0, 0],
                    backgroundColor: 'aqua',
                    borderColor: 'black',
                    borderWidth: 1
                }
            ]
        });
    }

    const options = {

    }


    const handleOption = (e) => {
        setOption(e.target.value);
    }

    const selectScoreHandle = (e) => {
        setValue(Number(e.target.value));
    }

    const predictHandler = () => {
        setDisableCheck(true);

        fetch('http://localhost:8000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([{ "Review": review }])
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);

                // the response is a list with the following structure:

                /*
                [
                    {
                        "prediction": 1,
                        "probabilities": [
                            0.6952821541993005,
                            0.21264938575402295,
                            0.06423904445386158,
                            0.022508859770563477,
                            0.00532055582225158
                        ]
                    }
                ]
                */

                let respuesta = data[0].probabilities;
                console.log(respuesta);

                // round the probabilities to 1 decimal
                respuesta = respuesta.map((value) => {
                    return Math.round(value * 10) / 10;
                });
                const backgroundColorNew = ['#9BC4D5', '#9BC4D5', '#9BC4D5', '#9BC4D5', '#9BC4D5']; // Cambiado a un azul más suave
                if (option === "Yes") {
                    backgroundColorNew[value - 1] = '#bce8d8'; // Cambiado a un verde más suave
                }
                let predictedValue = data[0].prediction;
                backgroundColorNew[predictedValue - 1] = '#BCE8D8'; // Cambiado a un púrpura más suave

                if (predictedValue === 0) {
                    alert('The prediction failed, the model could not predict the score');
                    predictedValue = "Unknown";
                }
                setPrediction(predictedValue);


                setData({
                    labels: ['1', '2', '3', '4', '5'],
                    datasets: [
                        {
                            label: 'Probabilities',
                            data: respuesta,
                            backgroundColor: backgroundColorNew,
                            borderColor: 'black',
                            borderWidth: 1
                        }
                    ]
                });
                setShowAnswer(true);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Request failed, a fake prediction will be shown');

                // Fallback behavior
                const respuesta = [0, 0.1, 0.3, 0.7, 1];
                const backgroundColorNew = ['aqua', 'aqua', 'aqua', 'aqua', 'aqua'];
                if (option === "Yes") {
                    backgroundColorNew[value - 1] = 'green';
                }
                const predictedValue = respuesta.indexOf(Math.max(...respuesta)) + 1
                setPrediction(predictedValue);
                backgroundColorNew[predictedValue - 1] = 'purple';

                setData({
                    labels: ['1', '2', '3', '4', '5'],
                    datasets: [
                        {
                            label: 'Probabilities',
                            data: respuesta,
                            backgroundColor: backgroundColorNew,
                            borderColor: 'black',
                            borderWidth: 1
                        }
                    ]
                });
                setShowAnswer(true);
            });
    }

    return (


        <PredictContainer style={(showAnswer) ? { height: "750px" } : {}}>

            <div className='predictFormContainer'>

                <Row className="mb-4">
                    <Col xs={12} className="text-center">
                        <h1 className="font-weight-bold">Predict the Score of a Review</h1>

                        <p className="text-muted">Write a review and predict the score that it will receive. <br></br>This is useful to check the accuracy of the model</p>
                    </Col>
                </Row>

                <Row>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>
                                        Write a Review:
                                    </Form.Label>
                                    <Form.Control
                                        as={"textarea"}
                                        rows={4}
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                        disabled={disableCheck}
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={3} className='scoreSelectionSpace'>
                                <Form.Group>
                                    <Form.Label className='scoreLabel'>
                                        Do you have the score?
                                    </Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="Yes"
                                        name="radioOptionTrue"
                                        value={"Yes"}
                                        checked={option === "Yes"}
                                        onChange={handleOption}
                                        disabled={disableCheck}

                                    />
                                    <Form.Check
                                        type="radio"
                                        label="No"
                                        name="radioOptionFalse"
                                        value={"No"}
                                        checked={option === "No"}
                                        onChange={handleOption}
                                        disabled={disableCheck}
                                    />
                                </Form.Group>
                            </Col>
                            {(option === "Yes") ?
                                (
                                    <Col sm={2} className='scoreSelectionSpace'>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                            <Form.Label>Score</Form.Label>
                                            <Form.Select onChange={selectScoreHandle} disabled={disableCheck}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                )
                                :
                                (
                                    <>
                                    </>
                                )
                            }
                            <Col sm={2} className='predictButtonSpace'>
                                <Button onClick={predictHandler} className='submitPredictionButton' disabled={disableCheck}>Predict!</Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                {
                    (showAnswer) ?
                        (
                            <>
                                <Row className='metricsRow'>
                                    <Col sm={6}>
                                        <Bar data={data} options={options}></Bar>
                                    </Col>
                                    <Col sm={6}>
                                        <Comparison value={value} prediction={prediction} option={option} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Button onClick={cleanHandler} className='cleanPredictButton'>Clean</Button>
                                </Row>
                            </>
                        )
                        :
                        (
                            <>
                            </>
                        )
                }

            </div>
        </PredictContainer>

    )
}

export default Predict
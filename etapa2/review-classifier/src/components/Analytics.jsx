import React from 'react'
import { Col, Row, ListGroup } from 'react-bootstrap';
import PiePercentage from './PiePercentage';


const Analytics = ({ info }) => {

  return (
    <div>
        <Row className="percentagesRowAnalytics">
            <Col className="pieAnalytics" >
                <PiePercentage title={"Precision"} percentage={info.precision} />
            </Col>
            <Col className="pieAnalytics" >
                <PiePercentage title={"Recall"} percentage={info.recall} />
            </Col>
            <Col className="pieAnalytics" >
                <PiePercentage title={"F1-Score"} percentage={info.f1_score} />
            </Col>
        </Row>
        { (info.top_words)?  
            (
                <Row className="wordsRow">
                    <h3>Top Influential Words</h3>
                    <ListGroup variant='flush' className="wordsTable">
                        { info.top_words.map((word, index) => (
                            <ListGroup.Item key={index}>
                                {word}
                            </ListGroup.Item>
                        )) }
                    </ListGroup>
                </Row>
            ): (<></>)
    
        }
        
    </div>
  )
}

export default Analytics
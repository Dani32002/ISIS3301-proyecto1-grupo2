import React, {useState, useEffect} from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import styled from 'styled-components'
import Analytics from './Analytics';

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  padding: 20px;
  box-sizing: border-box;
`;

const Stats = () => {

  const [metrics, setMetrics] = useState({
    general: {
        precision: 80,
        recall: 80,
        f1_score: 80
    },
    score1: {
        precision: 80,
        recall: 80,
        f1_score: 80,
        top_words: ["poop","poop","poop","poop","poop","poop","poop","poop","poop","poop",]
    },
    score2: {
        precision: 80,
        recall: 80,
        f1_score: 80,
        top_words: ["poop","poop","poop","poop","poop","poop","poop","poop","poop","poop",]
    },
    score3: {
        precision: 80,
        recall: 80,
        f1_score: 80,
        top_words: ["mid","mid","mid","mid","mid","mid","mid","mid","mid","mid",]
    },
    score4: {
        precision: 80,
        recall: 80,
        f1_score: 80,
        top_words: ["great","great","great","great","great","great","great","great","great","great",]
    },
    score5: {
        precision: 80,
        recall: 80,
        f1_score: 80,
        top_words: ["great","great","great","great","great","great","great","great","great","great",]
    }
  })

  useEffect(() => {

  }, []);

  return (
    <StatsContainer>
      <Container className="tabsComponent">
        <Tabs
            defaultActiveKey="general"
            id="uncontrolled-tab-example"
            className="mb-3"
            >
            <Tab eventKey="general" title="General">
                <Analytics info={metrics.general}/>
            </Tab>
            <Tab eventKey="score1" title="Score 1">
                <Analytics info={metrics.score1}/>
            </Tab>
            <Tab eventKey="score2" title="Score 2">
                <Analytics info={metrics.score2}/>
            </Tab>
            <Tab eventKey="score3" title="Score 3">
                <Analytics info={metrics.score3}/>
            </Tab>
            <Tab eventKey="score4" title="Score 4">
                <Analytics info={metrics.score4}/>
            </Tab>
            <Tab eventKey="score5" title="Score 5">
                <Analytics info={metrics.score5}/>
            </Tab>
        </Tabs>
      </Container>
    </StatsContainer>
  );
};

export default Stats;
import React, { useState, useEffect } from 'react';
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
  height:  calc(100vh - 70px);
`;

// function to correct some words that were lemmatized incorrectly
// for the better visualization of the metrics
function correctWords(words) {
    return words.map(word => {
        // first word: 'demaciadoma' should be 'demasiado'
        if (word === 'demaciadoma') {
            return 'demasiado';
        }
        // second word: 'pierd' should be 'pierde'
        if (word === 'pierd') {
            return 'pierde';
        }
        // third word: 'pesimar' should be 'pesimo'
        if (word === 'pesimar') {
            return 'pesima';
        }
        // fourth word: 'colos' should be 'colosal'
        if (word === 'colos') {
            return 'colosal';
        }
        // fifth word: 'epoco' should be 'epoca'
        if (word === 'epoco') {
            return 'epoca';
        }
        // sixth word: 'esperabar' should be 'esperar'
        if (word === 'esperabar') {
            return 'esperar';
        }
        // seventh word: 'mantencion' should be 'mantenimiento'
        if (word === 'mantencion') {
            return 'mantenimiento';
        }
        // eighth word: 'sorprendent' should be 'sorprendente'
        if (word === 'sorprendent') {
            return 'sorprendente';
        }
        // ninth word: 'person' should be 'persona'
        if (word === 'person') {
            return 'persona';
        }
        // tenth word: 'envergadurar' should be 'envergadura'
        if (word === 'envergadurar') {
            return 'envergadura';
        }
        // eleventh word: 'diabet' should be 'diabetico'
        if (word === 'diabet') {
            return 'diabetico';
        }
        // twelfth word: 'delicios' should be 'delicioso'
        if (word === 'delicios') {
            return 'delicioso';
        }

        else {
            return word;
        }

    });
}




const Stats = () => {

    const fallbackData = {
        general: {
            precision: 80,
            recall: 80,
            f1_score: 80
        },
        score1: {
            precision: 80,
            recall: 80,
            f1_score: 80,
            top_words: ["poop", "poop", "poop", "poop", "poop", "poop", "poop", "poop", "poop", "poop",]
        },
        score2: {
            precision: 80,
            recall: 80,
            f1_score: 80,
            top_words: ["poop", "poop", "poop", "poop", "poop", "poop", "poop", "poop", "poop", "poop",]
        },
        score3: {
            precision: 80,
            recall: 80,
            f1_score: 80,
            top_words: ["mid", "mid", "mid", "mid", "mid", "mid", "mid", "mid", "mid", "mid",]
        },
        score4: {
            precision: 80,
            recall: 80,
            f1_score: 80,
            top_words: ["great", "great", "great", "great", "great", "great", "great", "great", "great", "great",]
        },
        score5: {
            precision: 80,
            recall: 80,
            f1_score: 80,
            top_words: ["great", "great", "great", "great", "great", "great", "great", "great", "great", "great",]
        }
    }

    const [metrics, setMetrics] = useState(fallbackData);


    useEffect(() => {
        fetch('http://localhost:8000/metrics')
            .then(response => response.json())
            .then(data => {

                // multiply the metrics by 100 to get a percentage
                data.general.precision *= 100;
                data.general.recall *= 100;
                data.general.f1_score *= 100;

                data.score1.precision *= 100;
                data.score1.recall *= 100;
                data.score1.f1_score *= 100;

                data.score2.precision *= 100;
                data.score2.recall *= 100;
                data.score2.f1_score *= 100;

                data.score3.precision *= 100;
                data.score3.recall *= 100;
                data.score3.f1_score *= 100;

                data.score4.precision *= 100;
                data.score4.recall *= 100;
                data.score4.f1_score *= 100;

                data.score5.precision *= 100;
                data.score5.recall *= 100;
                data.score5.f1_score *= 100;

                // corrije la lematización de algunas palabras
                data.score1.top_words = correctWords(data.score1.top_words);
                data.score2.top_words = correctWords(data.score2.top_words);
                data.score3.top_words = correctWords(data.score3.top_words);
                data.score4.top_words = correctWords(data.score4.top_words);
                data.score5.top_words = correctWords(data.score5.top_words);

                setMetrics(data);

            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to fetch metrics, showing fallback data.');
                setMetrics(fallbackData);
            });
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
                        <Analytics info={metrics.general} />
                    </Tab>
                    <Tab eventKey="score1" title="Score 1">
                        <Analytics info={metrics.score1} />
                    </Tab>
                    <Tab eventKey="score2" title="Score 2">
                        <Analytics info={metrics.score2} />
                    </Tab>
                    <Tab eventKey="score3" title="Score 3">
                        <Analytics info={metrics.score3} />
                    </Tab>
                    <Tab eventKey="score4" title="Score 4">
                        <Analytics info={metrics.score4} />
                    </Tab>
                    <Tab eventKey="score5" title="Score 5">
                        <Analytics info={metrics.score5} />
                    </Tab>
                </Tabs>
            </Container>
        </StatsContainer>
    );
};

export default Stats;
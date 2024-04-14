import React from 'react'
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

const Content = styled.div`
  text-align: center;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #333;
`;

const Subtitle = styled.h2`
  font-size: 1.1em; // Reduce this value to make the font smaller
  color: #777;
  margin-top: 20px;
`;
const Landing = () => {
  return (
    <LandingContainer>
      <Content>
        <Title style={{ paddingBottom: "30px" }}>Welcome to our Hotel Management App</Title>
        <Subtitle>
          This application will help you improve your management and decision-making by identifying the most important complaints in reviews and points of improvement based on reviews from multiple hotels.
        </Subtitle>

        <Subtitle>
          Our machine learning model will analyze your reviews and provide you with valuable insights to help you improve your hotel's performance.
        </Subtitle>

      </Content>
    </LandingContainer>
  )
}

export default Landing
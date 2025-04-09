import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Header = styled(motion.header)`
  background: rgba(255, 255, 255, 0.85);
  padding: 4rem 2rem;
  border-radius: 30px;
  box-shadow: ${props => props.theme.shadows.card};
  margin: 4rem auto 3rem auto;
  width: 90%;
  max-width: 900px;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const LogoSpace = styled(motion.div)`
  width: 180px;
  height: 180px;
  margin: 0 auto 2rem auto;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s ease;

  &:hover {
    transform: scale(1.15);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.7rem;
  color: ${props => props.theme.colors.text};
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 30px;
  padding: 3rem;
  max-width: 800px;
  width: 90%;
  box-shadow: ${props => props.theme.shadows.card};
  margin: 0 auto 6rem auto;
  text-align: center;
  position: relative;
  z-index: 1;

  p {
    font-size: 1.5rem;
    line-height: 1.8;
    color: ${props => props.theme.colors.text};
    margin-bottom: 2rem;
  }
`;

const Button = styled(motion.button)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  border: none;
  padding: 1.2rem 2.5rem;
  color: white;
  font-size: 1.3rem;
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme.shadows.button};

  &:hover {
    transform: scale(1.05);
    background: linear-gradient(135deg, ${props => props.theme.colors.secondary}, ${props => props.theme.colors.primary});
  }
`;

const Features = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3rem;
  padding: 6rem 2rem;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const FeatureBox = styled(motion.div)`
  background: transparent;
  padding: 2.5rem;
  width: 300px;
  height: 320px;
  text-align: center;
  transition: all 0.4s ease;
  transform: scale(1);
  z-index: 1;
  overflow: hidden;

  img {
    width: 80px;
    height: 80px;
    margin-bottom: 1rem;
    transition: transform 0.3s ease;
  }

  h3, p {
    opacity: 0;
    transition: opacity 0.3s ease;
    height: 0;
    overflow: hidden;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    box-shadow: ${props => props.theme.shadows.card};
    transform: scale(1.15);

    img {
      transform: scale(1.2);
    }

    h3, p {
      opacity: 1;
      height: auto;
    }
  }
`;

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <LogoSpace
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.4 }}
        >
          <img src="https://i.ibb.co/8DnG3Cmf/Chat-GPT-Image-Apr-9-2025-08-47-48-AM.png" alt="Logo" />
        </LogoSpace>
        <Title>FlightPredict</Title>
        <Subtitle>Your smart assistant for predicting flight ticket prices!</Subtitle>
      </Header>

      <Card
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p>
          Discover the best time to book your flights. FlightPredict uses data-driven models to forecast ticket prices so
          you can travel smart and save more.
        </p>
        <Button
          onClick={() => navigate('/input')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try It Now!
        </Button>
      </Card>

      <Features
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <FeatureBox>
          <img src="https://img.icons8.com/?size=100&id=70562&format=png&color=000000" alt="Function Icon" />
          <h3>Functions</h3>
          <p>Advanced ML models to predict optimal flight booking times.</p>
        </FeatureBox>
        <FeatureBox>
          <img src="https://img.icons8.com/fluency/48/database.png" alt="Dataset Icon" />
          <h3>DataSet Used</h3>
          <p>We leverage historical airline pricing data and travel trends.</p>
        </FeatureBox>
        <FeatureBox>
          <img src="https://img.icons8.com/fluency/48/combo-chart.png" alt="Visualization Icon" />
          <h3>Visualization</h3>
          <p>Interactive charts and graphs to help visualize price patterns.</p>
        </FeatureBox>
      </Features>
    </>
  );
};

export default HomePage; 
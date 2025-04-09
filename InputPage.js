import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Container = styled(motion.div)`
  max-width: 800px;
  margin: 4rem auto;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

const Form = styled(motion.form)`
  background: rgba(255, 255, 255, 0.9);
  padding: 3rem;
  border-radius: 30px;
  box-shadow: ${props => props.theme.shadows.card};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${props => props.theme.colors.secondary};
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${props => props.theme.colors.secondary};
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.1);
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
  width: 100%;
  margin-top: 1rem;

  &:hover {
    transform: scale(1.05);
    background: linear-gradient(135deg, ${props => props.theme.colors.secondary}, ${props => props.theme.colors.primary});
  }
`;

const BackButton = styled(motion.button)`
  background: transparent;
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
  width: 100%;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const InputPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    departure: '',
    destination: '',
    date: '',
    passengers: '1',
    class: 'economy'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to your backend
    console.log('Form submitted:', formData);
    // For now, we'll just navigate back to home
    navigate('/');
  };

  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Title>Predict Flight Prices</Title>
        
        <FormGroup>
          <Label>Departure City</Label>
          <Input
            type="text"
            name="departure"
            value={formData.departure}
            onChange={handleChange}
            placeholder="Enter departure city"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Destination City</Label>
          <Input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Enter destination city"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Travel Date</Label>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Number of Passengers</Label>
          <Select
            name="passengers"
            value={formData.passengers}
            onChange={handleChange}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Class</Label>
          <Select
            name="class"
            value={formData.class}
            onChange={handleChange}
          >
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="first">First Class</option>
          </Select>
        </FormGroup>

        <Button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Predict Price
        </Button>

        <BackButton
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Home
        </BackButton>
      </Form>
    </Container>
  );
};

export default InputPage; 
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ConnectingCitiesContainer = styled(motion.div)`
  margin-top: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  border: 1px dashed ${props => props.theme.colors.secondary};
`;

const ConnectingCityTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const ConnectingCityRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
`;

const ConnectingCityInput = styled(Input)`
  flex: 1;
`;

const AddButton = styled(motion.button)`
  background: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  margin-top: 1rem;
  align-self: center;
`;

const RemoveButton = styled(motion.button)`
  background: #ff5252;
  color: white;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
`;

const InputPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    departure: '',
    destination: '',
    date: '',
    passengers: '1',
    class: 'economy',
    isDirectFlight: 'yes',
    connectingCities: [{ city: '' }]
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'radio' ? value : value
    }));
  };

  const handleConnectingCityChange = (index, value) => {
    setFormData(prev => {
      const newConnectingCities = [...prev.connectingCities];
      newConnectingCities[index] = { city: value };
      return {
        ...prev,
        connectingCities: newConnectingCities
      };
    });
  };

  const addConnectingCity = () => {
    setFormData(prev => ({
      ...prev,
      connectingCities: [...prev.connectingCities, { city: '' }]
    }));
  };

  const removeConnectingCity = (index) => {
    setFormData(prev => ({
      ...prev,
      connectingCities: prev.connectingCities.filter((_, i) => i !== index)
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
          <Label>Flight Type</Label>
          <RadioGroup>
            <RadioLabel>
              <RadioInput
                type="radio"
                name="isDirectFlight"
                value="yes"
                checked={formData.isDirectFlight === 'yes'}
                onChange={handleChange}
              />
              Direct Flight
            </RadioLabel>
            <RadioLabel>
              <RadioInput
                type="radio"
                name="isDirectFlight"
                value="no"
                checked={formData.isDirectFlight === 'no'}
                onChange={handleChange}
              />
              Connecting Flight
            </RadioLabel>
          </RadioGroup>
          
          <AnimatePresence>
            {formData.isDirectFlight === 'no' && (
              <ConnectingCitiesContainer
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ConnectingCityTitle>Connecting Cities</ConnectingCityTitle>
                <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#666' }}>
                  Specify the cities where your flight will stop before reaching your destination.
                </p>
                
                {formData.connectingCities.map((city, index) => (
                  <ConnectingCityRow key={index}>
                    <ConnectingCityInput
                      type="text"
                      value={city.city}
                      onChange={(e) => handleConnectingCityChange(index, e.target.value)}
                      placeholder={`Connecting city ${index + 1}`}
                      required
                    />
                    {index > 0 && (
                      <RemoveButton
                        type="button"
                        onClick={() => removeConnectingCity(index)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        ×
                      </RemoveButton>
                    )}
                  </ConnectingCityRow>
                ))}
                
                <AddButton
                  type="button"
                  onClick={addConnectingCity}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  +
                </AddButton>
              </ConnectingCitiesContainer>
            )}
          </AnimatePresence>
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

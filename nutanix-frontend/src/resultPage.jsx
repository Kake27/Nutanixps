import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const response = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(location.state?.formData),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch prediction');
        }

        const data = await response.json();
        setPrediction(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (location.state?.formData) {
      fetchPrediction();
    } else {
      navigate('/input');
    }
  }, [location.state, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1603522830343-3c330ab81542?q=80&w=1932&auto=format&fit=crop')` }}>
        <div className="bg-white/90 p-8 rounded-3xl shadow-xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-900 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Calculating your flight price...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1603522830343-3c330ab81542?q=80&w=1932&auto=format&fit=crop')` }}>
        <div className="bg-white/90 p-8 rounded-3xl shadow-xl text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={() => navigate('/input')}
            className="mt-4 px-6 py-3 bg-indigo-900 text-white text-lg rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1603522830343-3c330ab81542?q=80&w=1932&auto=format&fit=crop')` }}>
      <div className="bg-white/90 p-8 rounded-3xl shadow-xl max-w-lg w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-indigo-900">Flight Price Prediction</h2>
          <p className="text-gray-600 mt-2">Here's what we found for your journey</p>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-indigo-900 mb-4">Journey Details</h3>
            <div className="space-y-3">
              <p className="flex justify-between">
                <span className="text-gray-600">From:</span>
                <span className="font-medium">{location.state.formData.from}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">To:</span>
                <span className="font-medium">{location.state.formData.to}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Departure Date:</span>
                <span className="font-medium">{new Date(location.state.formData.departure).toLocaleDateString()}</span>
              </p>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-green-900 mb-4">Predicted Price</h3>
            <p className="text-3xl font-bold text-green-700 text-center">
              ₹{prediction?.predicted_price?.toLocaleString()}
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/input')}
              className="px-6 py-3 bg-indigo-900 text-white text-lg rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              New Prediction
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-600 text-white text-lg rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage; 
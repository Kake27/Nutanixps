import React from "react";
import {useNavigate} from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cover bg-center relative pt-16" 
    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1603522830343-3c330ab81542?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}>
      <div className="absolute inset-0  backdrop-blur-sm"></div>
      
      <header className="relative z-10 bg-white/85 p-10 rounded-3xl shadow-lg max-w-3xl my-0 mx-auto text-center">
        <div className="w-44 h-44 mx-auto mb-6 rounded-full overflow-hidden transform transition duration-500 hover:scale-110">
          <img src="https://i.ibb.co/8DnG3Cmf/Chat-GPT-Image-Apr-9-2025-08-47-48-AM.png" alt="Logo" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-4xl font-bold text-indigo-900">FlightPredict</h1>
        <p className="text-xl text-gray-700">Your smart assistant for predicting flight ticket prices!</p>
      </header>
      
      <div className="relative z-10 bg-white/90 rounded-3xl p-10 max-w-2xl mx-auto mt-10 shadow-xl transition-transform duration-500 hover:translate-y-[-10px] hover:shadow-2xl text-center">
        <p className="text-lg text-gray-700 leading-relaxed">
          Discover the best time to book your flights. FlightPredict uses data-driven models to forecast ticket prices so you can travel smart and save more.
        </p>
        <button className="mt-6 bg-indigo-900 text-white px-6 py-3 rounded-full text-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
          onClick={()=>navigate("/input")}
        >Try It Now!</button>
      </div>
      
      <div className="relative z-10 flex justify-center flex-wrap gap-12 py-16 max-w-5xl mx-auto">
        <FeatureBox imgSrc="https://img.icons8.com/?size=100&id=70562&format=png&color=000000" title="Functions" description="Advanced ML models to predict optimal flight booking times." />
        <FeatureBox imgSrc="https://img.icons8.com/fluency/48/database.png" title="DataSet Used" description="We leverage historical airline pricing data and travel trends." />
        <FeatureBox imgSrc="https://img.icons8.com/fluency/48/combo-chart.png" title="Visualization" description="Interactive charts and graphs to help visualize price patterns." />
      </div>
    </div>
  );
};

const FeatureBox = ({ imgSrc, title, description }) => {
  return (
    <div className="w-72 h-80 flex flex-col items-center text-center p-6 bg-transparent transition-transform duration-500 hover:scale-110 hover:bg-white hover:shadow-xl rounded-lg">
      <img src={imgSrc} alt={title} className="w-20 h-20 mb-4 transform transition-transform duration-300 hover:scale-110" />
      <h3 className="text-lg font-semibold opacity-50 transition-opacity duration-300 hover:opacity-100">{title}</h3>
      <p className="text-gray-600 opacity-50 transition-opacity duration-300 hover:opacity-100">{description}</p>
    </div>
  );
};

export default LandingPage;

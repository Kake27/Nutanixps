import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FlightPredictForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ from: "", to: "", departure: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/result', { state: { formData } });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center "
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1603522830343-3c330ab81542?q=80&w=1932&auto=format&fit=crop')` }}>
  
        <div className="w-40 h-40 mb-6 rounded-full overflow-hidden transform transition duration-500 hover:scale-110">
            <img
            src="https://i.ibb.co/8DnG3Cmf/Chat-GPT-Image-Apr-9-2025-08-47-48-AM.png"
            alt="Logo"
            className="w-full h-full object-cover"
            />
        </div>

        <div className="bg-white/90 p-8 rounded-3xl shadow-xl max-w-lg w-full text-center">
            <h2 className="text-2xl font-semibold text-indigo-900 mb-4">Book Smart with FlightPredict</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="from" className="block text-lg text-gray-700 mb-2">From:</label>
                <select
                id="from"
                value={formData.from}
                onChange={handleChange}
                required
                className="w-full p-3 text-lg border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                <option value="">Select departure airport</option>
                <option value="DEL">Delhi (DEL)</option>
                <option value="BOM">Mumbai (BOM)</option>
                <option value="BLR">Bengaluru (BLR)</option>
                <option value="HYD">Hyderabad (HYD)</option>
                <option value="MAA">Chennai (MAA)</option>
                <option value="CCU">Kolkata (CCU)</option>
                </select>
            </div>

            <div>
                <label htmlFor="to" className="block text-lg text-gray-700 mb-2">To:</label>
                <select
                id="to"
                value={formData.to}
                onChange={handleChange}
                required
                className="w-full p-3 text-lg border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                <option value="">Select arrival airport</option>
                <option value="DEL">Delhi (DEL)</option>
                <option value="BOM">Mumbai (BOM)</option>
                <option value="BLR">Bengaluru (BLR)</option>
                <option value="HYD">Hyderabad (HYD)</option>
                <option value="MAA">Chennai (MAA)</option>
                <option value="CCU">Kolkata (CCU)</option>
                <option value="PNQ">Pune (PNQ)</option>
                <option value="GOI">Goa (GOI)</option>
                <option value="AMD">Ahmedabad (AMD)</option>
                <option value="COK">Kochi (COK)</option>
                </select>
            </div>

            <div>
                <label htmlFor="departure" className="block text-lg text-gray-700 mb-2">Date of Departure:</label>
                <input
                type="date"
                id="departure"
                value={formData.departure}
                onChange={handleChange}
                required
                className="w-full p-3 text-lg border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
            </div>

            <button
                type="submit"
                className="hover:cursor-pointer mt-4 px-6 py-3 bg-indigo-900 text-white text-lg rounded-full shadow-lg hover:scale-105 transition-transform"
            >Predict Price
            </button>
        </form>
      </div>
    </div>
  );
};

export default FlightPredictForm;

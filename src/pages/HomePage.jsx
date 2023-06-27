import { useDispatch, useSelector } from "react-redux";
import { colorStore } from "../features/colorSlice";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Color from "tinycolor2";

const ColorPicker = () => {
  const storedcolor = useSelector((state)=>state.color.colorData)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSaveColor = () => {
    if (inputValue !== "" && storedcolor.length < 5) {
      dispatch(colorStore(inputValue));
      setInputValue("");
      if (storedcolor.length === 3) {
        navigate("/generate"); // Redirect to the desired route
      }
    }
  };


  const rgbCode = Color(inputValue).toRgbString();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100" style={{backgroundColor:inputValue}}>
      <header className="bg-white py-8">
        <h1 className="text-4xl font-bold text-center fixed top-2 left-2">Color Picker</h1>
      </header>
      <div className="bg-white p-8 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-bold mb-4">Choose a Color</h2>
        <div className="flex gap-5">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter color hex code"
          className="px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
        />

        <input
          type="text"
          value={rgbCode}
          placeholder="RGB Color"
          className="px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          readOnly
        />

        <button
          onClick={handleSaveColor}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded h-10"
        >
          Save Color
        </button>
        </div>

        <div>
        <button
          onClick={() => navigate("/generate")}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2 fixed top-1 right-2"
        >
          Saved Color
        </button>
        <p className="fixed top-0 right-1 rounded-full bg-black text-white px-2">{storedcolor.length}</p>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;




import { useDispatch, useSelector } from "react-redux";
import { colorStore } from "../features/colorSlice";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Color from "tinycolor2";

const ColorPicker = () => {
  const storedColors = useSelector((state) => state.color.colorData.flat());
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [colorGroup, setColorGroup] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSaveColor = () => {
    if (colorGroup.length < 4) {
      setColorGroup([...colorGroup, inputValue]);
      setInputValue("");
      if (colorGroup.length === 3) {
        dispatch(colorStore([...colorGroup, inputValue]));
      }
    }
    if (colorGroup.length === 3) {
      setColorGroup([...colorGroup, inputValue]); 
      setInputValue("");
      dispatch(colorStore([...colorGroup, inputValue]));
      setColorGroup([]); 
      navigate("/generate");
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
        <div className="flex gap-2">{colorGroup.map((item)=>(
            <div style={{backgroundColor : item}} className="border rounded w-12 h-12"> </div>
          ))}</div>
      </div>
    </div>
  );
};

export default ColorPicker;




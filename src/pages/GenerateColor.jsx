import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveGeneratedColors } from "../features/colorSlice";
import { useNavigate } from "react-router-dom";

const GenerateColor = () => {
  const colordata = useSelector((state) => state.color.colorData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [randomColors, setRandomColors] = useState([]);
  const [copyIndex, setCopyIndex] = useState(null);

  const handleGenerateColors = () => {
    const generatedColors = colordata.map(() => generateRandomColor());
    setRandomColors(generatedColors);
  };

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleSaveColors = () => {
    dispatch(saveGeneratedColors(randomColors));
  };

  const handleCopyCode = (index) => {
    navigator.clipboard.writeText(randomColors[index] || colordata[index]);
    setCopyIndex(index);
    setTimeout(() => {
      setCopyIndex(null);
    }, 2000);
  };

  return (
    <div className="container">
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleGenerateColors}
          >
            Generate
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSaveColors}
          >
            Save
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {colordata.map((item, index) => (
            <div
              key={index}
              style={{ backgroundColor: randomColors[index] || item }}
              className="w-full h-20 rounded-lg shadow-md flex flex-col justify-center items-center"
            >
              <div
                className="text-black font-semibold cursor-pointer"
                onClick={() => handleCopyCode(index)}
              >
                {randomColors[index] || item}
              </div>
              {copyIndex === index && (
                <p className="bg-green-500 text-white px-2 py-1 rounded-md  transform translate-x-1 -translate-y-1">
                  Copied
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/save")}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Generated colors
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateColor;

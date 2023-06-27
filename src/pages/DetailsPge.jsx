import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Color from "tinycolor2";
import { updatedColors } from "../features/colorSlice";
import { useDispatch, useSelector } from "react-redux";

const DetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { colorcode } = useParams();
  const color = `#${colorcode}`;
  const colors = useSelector((state) => state.color.colorData);
  const [hexCode, setHexCode] = useState(Color(colorcode).toHexString());
  const [rgbCode, setRgbCode] = useState(Color(colorcode).toRgbString());
  const [hslCode, setHslCode] = useState(Color(colorcode).toHslString());

  const handleHexChange = (event) => {
    const newHexCode = event.target.value;
    setHexCode(newHexCode);
    updateColorCodes(newHexCode, "hex");
  };

  const handleRgbChange = (event) => {
    const newRgbCode = event.target.value;
    setRgbCode(newRgbCode);
    updateColorCodes(newRgbCode, "rgb");
  };

  const handleHslChange = (event) => {
    const newHslCode = event.target.value;
    setHslCode(newHslCode);
    updateColorCodes(newHslCode, "hsl");
  };

  const updateColorCodes = (newCode, codeType) => {
    const color = Color(newCode);

    switch (codeType) {
      case "hex":
        setRgbCode(color.toRgbString());
        setHslCode(color.toHslString());
        break;
      case "rgb":
        setHexCode(color.toHexString());
        setHslCode(color.toHslString());
        break;
      case "hsl":
        setHexCode(color.toHexString());
        setRgbCode(color.toRgbString());
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div
          className="w-48 h-48 rounded-lg mb-8"
          style={{ backgroundColor: rgbCode }}
        ></div>
        <div className="mb-4">
          <label className="font-bold">Hex Code:</label>
          <input
            type="text"
            value={hexCode}
            onChange={handleHexChange}
            className=" px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="font-bold">RGB Code:</label>
          <input
            type="text"
            value={rgbCode}
            onChange={handleRgbChange}
            className=" px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="font-bold">HSL Code:</label>
          <input
            type="text"
            value={hslCode}
            onChange={handleHslChange}
            className=" px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          onClick={() => {  const updatedColorData = colors.map((colorArray) => {
            const updatedArray = colorArray.map((colorData) => {
              if (colorData === color) {
                return hexCode;
              }
              return colorData;
            });
            return updatedArray;
          });
          dispatch(updatedColors(updatedColorData));
          navigate("/save");
        
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Color
        </button>
      </div>
    </div>
  );
};

export default DetailsPage;

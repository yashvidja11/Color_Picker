
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveGeneratedColors } from '../features/colorSlice';
import { useNavigate } from 'react-router-dom';

const GenerateColor = () => {
  const colorData = useSelector((state) => state.color.colorData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [copyIndex, setCopyIndex] = useState(null);

  const handleGenerateColors = () => {
    const generatedColors = colorData.map((item) => item.map(() => generateRandomColor()));
    dispatch(saveGeneratedColors(generatedColors));
  };

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleCopyCode = (data) => {
    navigator.clipboard.writeText(data);
    setCopyIndex(data);
    setTimeout(() => {
      setCopyIndex(null);
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <button
          onClick={handleGenerateColors}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate
        </button>
        <button
          onClick={() => navigate('/save')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Saved Color
        </button>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {colorData.map((item , index) => (
          <div key={index} >
            {item.map((data) => (
              <div
                key={data}
                style={{ backgroundColor: data }}
                className="w-[200px] h-[150px] flex items-center justify-center shadow-md relative"
              >
                <p className="text-white cursor-pointer" onClick={() => handleCopyCode(data)}>
                  {data}
                </p>
                {copyIndex === data && (
                  <p className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 rounded-md transform translate-x-1 -translate-y-1">
                    Copied
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenerateColor;



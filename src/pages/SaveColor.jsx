import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SaveColor = () => {
  const colorData = useSelector((state) => state.color.colorData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showColor, setShowColor] = useState(true);
  const [showPallets, setShowpallets] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredColors = colorData
    .flat()
    .filter((color) => color.toLowerCase().includes(searchTerm.toLowerCase()));
  console.log(filteredColors);
  const palletshow = () => {
    setShowpallets(true);
    setShowColor(false);
  };
  const colorShow = () => {
    setShowpallets(false);
    setShowColor(true);
  };
  return (
    <div className="container">
      {showColor && (
        <div className="w-full px-4 mb-4 text-center mt-5">
          {" "}
          <input
            type="text"
            value={searchTerm}
            placeholder="Search by color code"
            className=" px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={handleSearch}
          />
        </div>
      )}
      <div className="flex justify-around items-center my-5">
        <div
          className={` ${
            showColor ? "border-4 border-gray-500" : ""
          } px-2 text-3xl font-bold cursor-pointer `}
          onClick={colorShow}
        >
          Colors
        </div>
        <div
          className={` ${
            showPallets ? "border-4 border-gray-500" : ""
          } px-2  text-3xl font-bold cursor-pointer`}
          onClick={palletshow}
        >
          Palettes
        </div>
      </div>
      {showColor && (
        <div className="flex flex-wrap justify-center">
          {filteredColors.length === 0 ? (
            <p className="text-gray-500">No matching colors found.</p>
          ) : (
            <div className="mt-4 grid grid-cols-5 gap-5 ">
              {filteredColors.map((color) => {
                const colorCodeWithoutHash = color.slice(1);
                return (
                  <div key={color.id}>
                    <Link
                      to={`/savecolordetails/${colorCodeWithoutHash}`}
                      style={{ backgroundColor: color }}
                      className="w-[200px] h-[150px] flex items-center justify-center"
                    >
                      <p className="text-white">{color}</p>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      {showPallets && (
        <div className="mt-20 flex flex-col gap-2 ms-[130px]">
          {colorData.map((item) => (
            <div className="flex">
              {item.map((data) => (
                <div
                  style={{ backgroundColor: data }}
                  className=" w-[500px] h-[100px]"
                ></div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SaveColor;

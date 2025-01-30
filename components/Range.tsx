import React, { useState } from "react";
type HandleChangesType = (e: React.ChangeEvent<HTMLInputElement>) => void;
const DoubleRangeSlider = ({
  min = 0,
  max = 500,
  initialOne = 100,
  initialTwo = 500,
  handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  },
}: {
  min?: number;
  max?: number;
  initialOne?: number;
  initialTwo?: number;
  handleChanges?: HandleChangesType;
}) => {
  const [rangeOne, setRangeOne] = useState(initialOne);
  const [rangeTwo, setRangeTwo] = useState(initialTwo);
  const handleRangeOneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), rangeTwo - 1);
    setRangeOne(value);
  };
  const handleRangeTwoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), rangeOne + 1);
    setRangeTwo(value);
  };
  const calculatePercentage = (value: number) => ((value - min) / (max - min)) * 100;
  return (
    <div className="relative w-full bg-white max-w-xl mx-auto">
      <div className="relative mt-8">
        {/* Track */}
        <div className="absolute w-full h-2  bg-gray-200 rounded-lg "></div>
        {/* Selected Range */}
        <div
          className="absolute h-2 bg-black text-black rounded-lg"
          style={{
            left: `${calculatePercentage(rangeOne)}%`,
            width: `${calculatePercentage(rangeTwo) - calculatePercentage(rangeOne)}%`,
          }}
        ></div>
        {/* Range Input One */}
        <input
          type="range"
          min={min}
          max={max}
          value={rangeOne}
          onChange={handleRangeOneChange}
          className="range-input"
          style={{
            zIndex: rangeOne > max / 2 ? "5" : "3",
          }}
        />
        {/* Range Input Two */}
        <input
          type="range"
          min={min}
          max={max}
          value={rangeTwo}
          onChange={(e) => {
            handleRangeTwoChange(e);
            handleChanges(e);
          }}
          className="range-input"
          style={{
            zIndex: rangeTwo < max / 2 ? "5" : "3",
          }}
        />
        {/* Value Display for Range One */}
        <div
          className="absolute top-4 text-sm font-medium text-gray-900 "
          style={{
            left: `calc(${calculatePercentage(rangeOne)}% - 12px)`,
          }}
        > 
          ${rangeOne}
        </div>
        {/* Value Display for Range Two */}
        <div
          className="absolute top-4 text-sm font-medium text-gray-900 "
          style={{
            left: `calc(${calculatePercentage(rangeTwo)}% - 12px)`,
          }}
        >
          ${rangeTwo}
        </div>
      </div>
    </div>
  );
};

export default DoubleRangeSlider;

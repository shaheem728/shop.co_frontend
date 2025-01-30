import React from 'react';

interface ColorSelectorProps {
  color: string; 
  value: string; 
  isSelected: boolean; 
  onSelect: (color: string) => void; // Callback to select a color
}
export default function ColorSelector({ color, isSelected, onSelect,value }: ColorSelectorProps) {
  return (
    <div className="flex flex-row my-3">
     
      <span
        className={`rounded-full h-10 w-10 me-1 flex items-center justify-center cursor-pointer ${
          isSelected ? 'border-4 border-white' : ''
        }`}
        style={{
          backgroundColor: value,
          border: '1px solid black' // Use the color prop for background
        }}
        onClick={()=> onSelect(color)}
          >
        {isSelected && <span className='text-gray-300 font-bold'>✓</span>
}
      </span>
    </div>
  );
}


import dynamic from 'next/dynamic';
import React from 'react';
function Loading() {
  return (
    <div className='flex items-center justify-center my-60'>
        <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
   </div>
  );
}
export default Loading;

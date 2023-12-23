import React from 'react';

const Banner = () => {
  return (
    <div
      className="relative h-80 w-full overflow-hidden mt-20"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 100%)' }}
    >
      <img
        src="https://images.unsplash.com/photo-1702983189831-4b917e842fd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Banner Image"
        className="h-full w-full object-cover"
        style={{ transform: 'scaleX(-1)' }}
      />
      <div className="absolute inset-0 flex items-center justify-center mb-12">
        <div className="text-center text-white">
          <h1 className="text-4xl mb-2">Ideas</h1>
          <p className="text-lg">Where all our great things begin</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;

import React from 'react';

const Card = ({ title, value }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
};

export default Card;

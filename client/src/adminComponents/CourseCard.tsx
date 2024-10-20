// src/components/CourseCard.tsx
import React from 'react';

interface CourseCardProps {
  title: string;
  topic: string;
  price: string | number;
  thumbnail: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, topic, price, thumbnail }) => {
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      <img src={thumbnail} alt={title} className="w-full h-32 object-cover rounded" />
      <h3 className="font-bold text-xl mt-2">{title}</h3>
      <p className="text-gray-700">{topic}</p>
      <p className="text-green-600 font-semibold">{price}</p>
    </div>
  );
};

export default CourseCard;

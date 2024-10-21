import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  value: number | string;
  description: string;
  icon: JSX.Element;
}

const Card: React.FC<CardProps> = ({ title, value, description, icon }) => {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg p-6 text-center"
      whileTap={{ scale: 0.98 }} 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3, ease: "easeInOut" }} 
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
    >
      <div className="flex justify-center items-center mb-4 text-purple-500">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <span className="text-4xl font-bold text-black mt-2 mb-2">{value}</span>
      <p className="text-gray-500">{description}</p>
    </motion.div>
  );
};

export default Card;

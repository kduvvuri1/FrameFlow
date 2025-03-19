import React from 'react';
import { motion } from 'framer-motion';

const MovingStars = () => {
  const stars = Array.from({ length: 100 }).map((_, index) => (
    <motion.div
      key={index}
      className="star"
      initial={{ x: '-100vw' }}
      animate={{ x: '100vw' }}
      transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: 'linear' }} // Random duration for each star
      style={{
        position: 'absolute',
        width: `${Math.random() * 3 + 1}px`, // Random width for stars
        height: `${Math.random() * 3 + 1}px`, // Random height for stars
        background: 'white',
        borderRadius: '50%',
        top: `${Math.random() * 100}vh`, // Random vertical position
      }}
    />
  ));

  return <div className="starfield">{stars}</div>;
};

export default MovingStars;
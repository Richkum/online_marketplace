import { useState } from 'react';
import { motion } from 'framer-motion';

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '/images/blog-header.jpg',
    '/images/blog-header.jpg',
    '/images/blog-header.jpg',
    '/images/blog-header.jpg'
  ];

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative bg-no-repeat bg-cover bg-center">
      <motion.div
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        <button onClick={prevImage} className="absolute left-0 top-1/2 transform -translate-y-1/2">
          Prev
        </button>
        <button onClick={nextImage} className="absolute right-0 top-1/2 transform -translate-y-1/2">
          Next
        </button>
      </motion.div>
    </div>
  );
};

export default ImageCarousel;

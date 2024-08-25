import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';
const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      <div className='you' >
        <img src="/images/blog-header.jpg" alt="Image 2" />
      </div>
      <div className='you' >
        <img src="/images/blog-header.jpg" alt="Image 2" />
      </div>
      <div className='you' >
        <img src="/images/blog-header.jpg" alt="Image 2" />
      </div>
    </Slider>
  );
};

export default ImageCarousel;

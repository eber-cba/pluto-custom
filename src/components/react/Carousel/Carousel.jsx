import React from "react";
import SliderImport from "react-slick";
const Slider = SliderImport.default || SliderImport;
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

const Carousel = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  };

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="carousel-slide">
            {product.images && product.images.length > 0 && (
              <img
                src={product.images[0]}
                alt={product.name}
                className="carousel-image"
              />
            )}
            <h3 className="carousel-title">{product.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

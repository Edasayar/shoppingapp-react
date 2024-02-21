import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './createCard.css';
import iconCart from '/src/shopping-cart.png'; 

const CreateCard = ({ id, title, description, price, thumbnail, images, onAddToBasket }) => {
  const handleAddToBasket = () => {
    const product = {
      id,
      title,
      description,
      price,
      thumbnail,
      images,
    };
    onAddToBasket(product);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className='shop-card'>
      <div className='card'>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Product ${index + 1}`} />
            </div>
          ))}
        </Slider>
        <div className="product-details">
          <div>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <br /><br />
          <div className="price-add-to-basket">
            <h6>Price: {price}</h6>
            <button onClick={handleAddToBasket}><img src={iconCart}  alt="Cart" /></button>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default CreateCard;

import './navigationBar.css';
import iconImage from '/src/online-shopping.png'; 
import iconCart from '/src/shopping-cart.png'; 
import {Link} from "react-router-dom"

const NavigationBar = () => {
  return (
    <>
      <nav className="navbar">
        <img src={iconImage} width={45} alt="Icon" />
        <h1 className="logo">Pleasure Basket</h1>
        <a href="/">Home</a>
        <Link to="/Products">Products</Link>
        <Link to="/Basket">
          <img src={iconCart} width={30} alt="Cart" />
        </Link>
      </nav>
    </>
  );
};

export default NavigationBar;



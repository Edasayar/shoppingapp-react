import './basket.css';

const Basket = ({ basketItems, removeFromBasket }) => {
  return (
    <div className="basket">
      <h2>Sepet</h2>
      <ul>
        {basketItems.map((item, index) => (
          <li key={index}>
            <span>{item.title}</span>
            <button onClick={() => removeFromBasket(item.id)}>Kaldır</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Basket;

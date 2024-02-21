import CreateCard from '../cards/CreateCard';
import './productList.css';

const ProductList = ({ products, isLoading, addToBasket }) => {
  return (
    <div className='product-list'>
      {isLoading.read && <img src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif" alt="Loading..." width={100} />}
      {products.map((product) => (
        <div key={product.id} className="recipe-list-item">
          <CreateCard
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            onAddToBasket={() => addToBasket(product)}
            thumbnail={product.thumbnail}
            images={product.images}
            isLoading={isLoading}
            
          />
        </div>
      ))}
    </div>
  );
};

export default ProductList;



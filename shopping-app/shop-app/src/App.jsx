import { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from './components/navbar/NavigationBar.jsx';
import Slider from './components/slider/Slider.jsx';
import Basket from './components/basket/Basket.jsx';
import image1 from './vector-shopping-online-banner.jpg';
import image2 from './slides_shopping.jpg';
import image3 from './ecommerce-shopping-retail-ss-1920.jpg';
import image4 from './a92b0318-ed91-441b-8b0a-051f13ab8ec5-istock-957125704.jpg';
import ProductList from './components/productList/ProductList.jsx';
import { Route, Routes } from 'react-router-dom';



function App() {

  const image = [
    image1, image2, image3, image4];


  const [products, setProducts] = useState([]);
  const [basketItems, setBasketItems] = useState([]);
  const [isLoading, setIsLoading] = useState({
    read: false,
    add: false,
    delete: false,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        console.log(response.data); 
    
        if (response.data && Array.isArray(response.data)) {
          console.log(response.data);
          setProducts(response.data); 
          setIsLoading((prevIsLoading) => ({ ...prevIsLoading, read: false }));
        } else {
          console.error('Fetched products data is not in the expected format');
        }
      } catch (error) {
        console.error('There was an error fetching the products', error);
      }
    };
    
    
  
    fetchProducts(); 
  }, []);

  const addToBasket = async (product) => {
    try {
      
      const response = await axios.post('https://example.com/api/basket', product);

      
      if (response.status === 200) {
        setBasketItems([...basketItems, product]);
        console.log('Ürün sepete eklendi:', product);
      } else {
        console.error('Ürün eklenirken bir hata oluştu');
      }
    } catch (error) {
      console.error('Ürün eklenirken bir hata oluştu:', error);
    }
  };
  
  

 

  const deleteProduct = async (id) => {
    setIsLoading((prevIsLoading) => ({ ...prevIsLoading, delete: true }));
    try {
      const response = await axios.delete(`http://localhost:3001/products/${id}`);
      if (response.status === 200) {
        setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
    setIsLoading((prevIsLoading) => ({ ...prevIsLoading, delete: false }));
  };

  return (
    <div className="App">
      <NavigationBar />
      <Slider image={image} />
      <Routes>
        <Route path="/Products" element= {<ProductList products={products} deleteProduct={deleteProduct} isLoading={isLoading} />}/>
        <Route path="/Basket" element={<Basket basketItems={basketItems} addToBasket ={addToBasket} />} /> 
        
      </Routes>
      
      
    </div>
  );
}

export default App;

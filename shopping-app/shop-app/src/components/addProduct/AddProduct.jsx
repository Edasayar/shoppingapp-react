import { useState } from 'react';
import PropTypes from 'prop-types';
import './addProduct.css';
import axios from 'axios';

const AddProduct = ({ addProductToList, isLoading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [rating, setRating] = useState(0);
  const [stock, setStock] = useState(0);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      title.trim() &&
      description.trim() &&
      price > 0 &&
      discountPercentage >= 0 &&
      rating >= 0 &&
      stock >= 0 &&
      brand.trim() &&
      category.trim() &&
      thumbnail.trim() &&
      images.length > 0
    ) {
      const newProduct = {
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        thumbnail,
        images,
      };

      axios.post("http://localhost:3001/products", newProduct)
        .then(response => addProductToList(response.data))
        .catch(error => console.error('Error adding product:', error));

      // Form gönderildikten sonra alanları sıfırla
      setTitle('');
      setDescription('');
      setPrice(0);
      setDiscountPercentage(0);
      setRating(0);
      setStock(0);
      setBrand('');
      setCategory('');
      setThumbnail('');
      setImages([]);
    } else {
      console.error('Form validation failed.');
      // Burada hata işleme veya kullanıcıya bir bildirim gösterme işlemi yapılabilir.
    }
  };

  // Additional handlers for input changes if required

  return (
    <div className='add-product'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Product Title'
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
        <textarea
          placeholder='Product Description'
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
        <input
          type='number'
          placeholder='Price'
          onChange={(event) => setPrice(event.target.value)}
          value={price}
        />
        <input
          type='number'
          placeholder='Discount Percentage'
          onChange={(event) => setDiscountPercentage(event.target.value)}
          value={discountPercentage}
        />
        {/* Diğer giriş alanları için benzer yapılar */}
        <input
          type='text'
          placeholder='Brand'
          onChange={(event) => setBrand(event.target.value)}
          value={brand}
        />
        <input
          type='text'
          placeholder='Category'
          onChange={(event) => setCategory(event.target.value)}
          value={category}
        />
        <input
          type='text'
          placeholder='Thumbnail URL'
          onChange={(event) => setThumbnail(event.target.value)}
          value={thumbnail}
        />
        {/* Images input could be a file upload, for instance */}
        {/* İmage alanı örneği dosya yükleme olabilir */}
        <input
          type='file'
          onChange={(event) => {
            // Handle file upload and setImages accordingly
            // Dosya yükleme işlemini ele al ve setImages'ı buna göre ayarla
          }}
        />
        <button type='submit'>
          {isLoading.add ? (
            <img src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif" alt="Loading..." width={20} />
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </div>
  );
};

AddProduct.propTypes = {
  addProductToList: PropTypes.func.isRequired,
};

export default AddProduct;

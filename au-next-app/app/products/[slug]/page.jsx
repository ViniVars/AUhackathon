'use client'
import { read } from '../../../actions/server';
import { useEffect, useState } from 'react';

const ProductDetailsPage = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const productId = params.slug.replace(/%20/g, ' ');
      console.log(productId)
      try {
        const productData = await read(`Products/${productId}`);
        setProduct({
          description: productData.Desc,
          price: productData.Price,
          image: productData.img,
          title: productId.split('_')[1],
          seller: productId.split('_')[0]
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
    fetchData();
  }, [params.slug]);

  const handleBuyProduct = () => {
    alert(
      `You are about to buy ${quantity} ${product.title}(s) for a total of ₹${(
        quantity * product.price
      )}`
    );
  };

  return (
    <div className="bg-gray-800 container mx-auto py-8 px-4">
      {product ? (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className='img'>
            <img src={product.image} alt={product.title} className="w-full object-cover" />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-semibold mb-4">{product.title}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-blue-600">Seller: {product.seller}</p>
            <p className="text-blue-600 font-semibold mb-4">Price: ₹{product.price}</p>
            <div className="flex items-center mb-4">
              <label className="mr-2">Quantity:</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  if (parseInt(e.target.value) > 0) {
                    setQuantity(parseInt(e.target.value));
                  }
                }}
                className="w-16 border rounded-md p-1 text-center"
              />
            </div>
            <button
              onClick={handleBuyProduct}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Buy {quantity} for ₹{(quantity * product.price)}
            </button>
          </div>
        </div>
      ) : (
        <div class="loader bg-gray-800 container mx-auto py-8 px-4">
<div class="loader-square"></div>
<div class="loader-square"></div>
<div class="loader-square"></div>
<div class="loader-square"></div>
<div class="loader-square"></div>
<div class="loader-square"></div>
<div class="loader-square"></div>
</div>
      )}
    </div>
  );
};

export default ProductDetailsPage;

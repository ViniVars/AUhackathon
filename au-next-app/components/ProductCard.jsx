// components/ProductCard.js
import Link from 'next/link';

// Function to truncate the string to a specified number of words
const truncateString = (str, numWords) => {
  const words = str.split(' ');
  if (words.length > numWords) {
    return words.slice(0, numWords).join(' ') + '...';
  }
  return str;
};

const ProductCard = ({ product }) => {
  // Limit description to 10 words
  const truncatedDescription = truncateString(product.Desc, 6);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md" id={product.id}>
      <Link href={`/products/${product.id}`}>
        <div className='img'>
          <img src={product.img} alt={product.title} className="w-full h-80 object-cover mb-4 rounded-md" />
        </div>
          <h2 className="text-blue-600 text-xl font-semibold mb-2">{product.title.replace(/%/g, ' ')}</h2>
          <h6 className="text-blue-600 text-md font-semibold mb-2"> By : {product.By}</h6>
          <p className="text-gray-700">{truncatedDescription}</p> {/* Display truncated description */}
          <p className="text-blue-600 font-semibold mt-2">${product.Price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;

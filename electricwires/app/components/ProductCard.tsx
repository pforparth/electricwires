import { Product } from '../products/data';
import { useCart } from '../cart/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4 flex flex-col items-center bg-white shadow-sm">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-lg font-semibold text-center h-16">{product.name}</h2>
      <p className="text-xl font-bold text-gray-800 my-2">${product.price.toFixed(2)}</p>
      <button 
        onClick={() => addToCart(product)}
        className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-full transition-colors duration-300">
        Add to Cart
      </button>
    </div>
  );
}

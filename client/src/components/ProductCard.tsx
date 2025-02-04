import React from "react";

interface ProductProps {
  imageUrl: string;
  title: string;
  price: number;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductProps> = ({ imageUrl, title, price }) => {
  return (
    <div className="rounded-[20px] border border-[#DFDFDF] shadow-md bg-white w-56 h-auto overflow-hidden">
      {/* Product Image */}
      <div className="w-full h-40 flex justify-center">
        <img
          src={imageUrl}
          alt={title}
          className="rounded-t-lg w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="px-3 mb-2">
        <div className="mt-4 px-3">
          <h3 className="font-medium text-[15px]">{title}</h3>
          <p className="text-[16px] font-semibold mt-5">₹{price}</p>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full cursor-pointer text-sm mt-3 py-2 border border-[#785BF8] text-[#785BF8] rounded-[13px] font-medium hover:bg-purple-100 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

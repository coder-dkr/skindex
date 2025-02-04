import ProductCard from "./ProductCard";
import { getProducts } from "../api/getProducts";
import { useEffect, useState } from "react";
import useSearch from "../hooks/useSearch";

interface Product {
  imageUrl: string;
  title: string;
  price: number;
  category: string;
}

interface ProductGalleryProps {
  category?: boolean;
  isSearchResults? : boolean;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ category, isSearchResults }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

  const { searchResults} = useSearch()

  useEffect(() => {
    async function fetchProducts() {
      const selectedCategory = localStorage.getItem("category");

      try {
        const data = await getProducts();

        if (category) {
          const orderedData = data.filter((prod) => prod.category === selectedCategory);
          setCategoryProducts(orderedData);
          console.log(category);
        }
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    fetchProducts();

    window.addEventListener("storage", fetchProducts);

    return () => {
      window.removeEventListener("storage", fetchProducts);
    };
  }, [category]);

 
  if (isSearchResults) {
    return (
      <div className="w-full grid grid-cols-5 gap-x-5 gap-y-12">
        {searchResults?.length > 0 ? (searchResults?.map((product: Product) => (
          <div key={product.title} className="w-full flex justify-center items-center">
            <ProductCard {...product} />
          </div>
        ))) : (
            <p className="px-8 text-gray-500">No Products</p>
        )}
      </div>
    );
  }

  return (
    <>
      {categoryProducts.length > 0 && (
        <div className="w-full grid grid-cols-5 gap-x-5 gap-y-12 mb-10">
          {categoryProducts.map((product: Product) => (
            <div key={product.title} className="w-full flex justify-center items-center">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      )}
      {categoryProducts.length > 0 && <p className="text-[#A4A4A4] text-xl px-8 mb-4">Our Other Products</p>}
      <div className="w-full grid grid-cols-5 gap-x-5 gap-y-12">
        {products.length > 0 ? (
          products.map((product: Product) => (
            <div key={product.title} className="w-full flex justify-center items-center">
              <ProductCard {...product} />
            </div>
          ))
        ) : (
          <p>No Products</p>
        )}
      </div>
    </>
  );
};

export default ProductGallery;

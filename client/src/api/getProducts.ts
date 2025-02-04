import api from "./api";

interface Product {
    imageUrl: string;
    title: string;
    price: number;
    category: string;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/api/products');  
    return response.data; 
  } catch (err) {
    console.log('Error getting products', err);
    return [];  
  }
};

import api from "./api";

interface Product {
    imageUrl: string;
    title: string;
    price: number;
    category: string;
}

export const getSearchedProducts = async (query : string): Promise<Product[]> => {
  try {
    const response = await api.get(`/api/search?name=${query}`); 
    return response.data; 
  } catch (err) {
    console.log('Error getting searched products', err);
    return [];  
  }
};

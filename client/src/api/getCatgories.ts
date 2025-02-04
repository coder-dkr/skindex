import api from "./api";

interface Category {
  image_url: string; 
  name: string;
}

export const getCatgories = async (): Promise<Category[]> => {
  try {
    const response = await api.get('/api/categories');  
    return response.data; 
  } catch (err) {
    console.log('Error getting categories', err);
    return [];  
  }
};

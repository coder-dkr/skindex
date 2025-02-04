import api from "../api"
import {jwtDecode} from 'jwt-decode'

interface newUser  {
    username : string,
    password : string,
    selectedCategory : string
}

interface DecodedToken {
    username: string;
    selectedCategory: string
    
  }

export const SignUpUser =  async ({username, password, selectedCategory } :newUser) => {
    try{
        const response = await api.post('/api/signup', {
            username, password, selectedCategory 
        })
        const data = response.data;
        const token = data.token
        localStorage.setItem('authToken',token )
        const category = jwtDecode<DecodedToken>(token).selectedCategory
        localStorage.setItem('category',category)
        return data.message
    }
    catch (err) {
        console.log('error in  signing up',err)
    }
}
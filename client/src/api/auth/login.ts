import api from "../api"
import {jwtDecode} from 'jwt-decode'

interface User {
    username : string,
    password : string
}


interface DecodedToken {
    username: string;
    selectedCategory: string
    
  }

export const LoginUser =  async ({username , password}:User) => {
    try{
        const response = await api.post('/api/login',{
            username,
            password
        })
        const data = response.data
        const token = data.token

        localStorage.setItem('authToken',token)
        const category = jwtDecode<DecodedToken>(token).selectedCategory
        localStorage.setItem('category',category)

        return data.message
    }
    catch (err) {
        console.log('error in  login',err)
        return err
    }
}
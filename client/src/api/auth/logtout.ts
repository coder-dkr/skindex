export const LogoutUser = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('category')
 
}
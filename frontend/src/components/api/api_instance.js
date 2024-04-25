import axios from 'axios';

// Create an instance of Axios with custom configuration
const api = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    withCredentials: true,
    
    headers: {
        'Content-Type': 'application/json',
        
      
        // You can add more headers if needed
    }
    
});


export default api;
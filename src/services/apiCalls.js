import axios from "axios";

//Register
export const registerUser = async (body) => {
    //Conectamos la API a la base de datos
    return await axios.post (`http://localhost:4000/user`, body) 
}

//Login
export const logUser = async (body) => {
    //Conectamos la API a la base de datos
    return await axios.post (`http://localhost:4000/user/login`, body) 
}

//Profile
export const profileUser = (token) => {
    return axios.get (`http://localhost:4000/user/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

// Productos
export const getAllproducts = async () => {
    // Conectamos la API a la base de datos
    return await axios.get (`http://localhost:4000/product`);
}


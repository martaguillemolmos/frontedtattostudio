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
// Mostramos los datos del usuario.
export const profileUser = (token) => {
    return axios.get (`http://localhost:4000/user/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
// Actualizamos los datos del usuario
export const updateUser = (token,id, body) => {
    return axios.put (`http://localhost:4000/user/${id}`, body, {
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


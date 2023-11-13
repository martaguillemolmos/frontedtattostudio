import axios from "axios";

//Login
export const logUser = async (body) => {
    //Conectamos la API a la base de datos
    return await axios.post (`http://localhost:4000/user/login`, body) 
}
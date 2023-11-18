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
export const updateUser = (token, id, body) => {
    return axios.put (`http://localhost:4000/user/${id}`, body, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

// Productos
export const getAllproducts = async () => {
    // Conectamos la API a la base de datos
    return await axios.get (`http://localhost:4000/portfolio`);
}

// Appointments
export const getAppointmentsByUserId = async (token) => {
    // Conectamos la API a la base de datos
    return await axios.get (`http://localhost:4000/appointment/user`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

// Super_Admin: Appointments
export const getAllAppointments = async (token) => {
    // Conectamos la API a la base de datos
    return await axios.get (`http://localhost:4000/appointment`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

//Crear appointment
export const createAppointment = async (token, body) => {
    // Conectamos la API a la base de datos
    return await axios.post (`http://localhost:4000/appointment`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }, body
    });
}

//Workers
//Recuperar la información de todos los trabajadores
export const getAllWorkers = async (token) => {
    // Conectamos la API a la base de datos
    return await axios.get (`http://localhost:4000/worker`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}
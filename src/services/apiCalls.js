import axios from "axios";

//Usuuario
//Registrar
export const registerUser = async (body) => {
    return await axios.post (`http://localhost:4000/user`, body) 
}

//Login
export const logUser = async (body) => {
    return await axios.post (`http://localhost:4000/user/login`, body) 
}

// Perfil: Mostramos los datos del usuario.
export const profileUser = (token) => {
    return axios.get (`http://localhost:4000/user/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
// Perfil: Actualizamos los datos del usuario
export const updateUser = (token, id, body) => {
    return axios.put (`http://localhost:4000/user/${id}`, body, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

// Actualizar la contraseña 
export const updatePassword = (token, body) => {
    return axios.patch (`http://localhost:4000/user/password`, body, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

//Ver todos los usuarios
export const getAllUsers = (token) => {
    return axios.get (`http://localhost:4000/user`, {
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

// Crear appointment
export const createAppointment = async (token, body) => {
    // Conectamos la API a la base de datos
    console.log("El token en la llamada",token)
    return await axios.post('http://localhost:4000/appointment', body, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
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

//Que el usuario pueda recuperar su información
export const profileWorker = async (token) => {
    // Conectamos la API a la base de datos
    return await axios.get (`http://localhost:4000/worker/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}
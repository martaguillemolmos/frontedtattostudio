import axios from "axios";


const hostURL = "http://localhost:4000"
//Usuario
//Registrar
export const registerUser = async (body) => {
    return await axios.post (`${hostURL}/user`, body) 
}

//Login
export const logUser = async (body) => {
    return await axios.post (`${hostURL}/user/login`, body) 
}

// Perfil: Mostramos los datos del usuario.
export const profileUser = (token) => {
    return axios.get (`${hostURL}/user/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
// Perfil: Actualizamos los datos del usuario
export const updateUser = (token, id, body) => {
    return axios.put (`${hostURL}/user/${id}`, body, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

// Actualizar la contraseña 
export const updatePassword = (token, body) => {
    return axios.patch (`${hostURL}/user/password`, body, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

//Ver todos los usuarios
export const getAllUsers = (token) => {
    return axios.get (`${hostURL}/user`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
// Productos
export const getAllproducts = async () => {
    // Conectamos la API a la base de datos
    return await axios.get (`${hostURL}/portfolio`);
}

// Appointments
export const getAppointmentsByUserId = async (token) => {
    // Conectamos la API a la base de datos
    return await axios.get (`${hostURL}/appointment/user`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

// //Usuario, modificar la fecha.
// export const updateAppointmentUser = async (token) => {
//     // Conectamos la API a la base de datos
//     return await axios.put (`${hostURL}/appointment/users`, {
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     });
// }

// Super_Admin: Appointments
export const getAllAppointments = async (token) => {
    // Conectamos la API a la base de datos
    return await axios.get (`${hostURL}/appointment`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

// Worker: Appointments
export const getAppointmentsByWorkerId = async (token) => {
    // Conectamos la API a la base de datos
    return await axios.get (`${hostURL}/appointment/all`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

// Crear appointment
export const createAppointment = async (token, body) => {
    // Conectamos la API a la base de datos
    console.log("El token en la llamada",token)
    return await axios.post(`${hostURL}/appointment`, body, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

// Modificar Status
export const updateAppointmentWorker = async (token, body) => {
    // Conectamos la API a la base de datos
    console.log("El token en la llamada",token)
    return await axios.put(`${hostURL}/appointment/worker`, body, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

//Workers
//Recuperar la información de todos los trabajadores
export const getAllWorkers = async (token) => {
    // Conectamos la API a la base de datos
    return await axios.get (`${hostURL}/worker`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

//Que el usuario pueda recuperar su información
export const profileWorker = async (token) => {
    // Conectamos la API a la base de datos
    return await axios.get (`${hostURL}/worker/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}
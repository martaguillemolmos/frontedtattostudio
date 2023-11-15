import "./Profile.css"
import { useEffect } from "react";

// //Importamos Redux
import {  useSelector } from "react-redux";  
import { userData } from "../userSlice";
import { profileUser } from "../../services/apiCalls";


export const Profile = () => {
    // Instanciamos Redux en lectura
    const rdxToken = useSelector (userData);

    useEffect(() => {
        if (rdxToken) {
            // Realiza la solicitud al servidor con el token almacenado en Redux
            profileUser(rdxToken.credentials.token)
                .then(response => {
                    console.log("Datos del perfil:", response.data.data);

                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [rdxToken]);

    

    return (
        <div className="profileDesign">
        Profile
        </div>
    )
}
import "./Profile.css"
import { useEffect } from "react";

// //Importamos Redux
import {  useSelector } from "react-redux";  
import { userData } from "../userSlice";


export const Profile = () => {
    // Instanciamos Redux en lectura
    const rdxToken = useSelector (userData);

    useEffect(() => {
        // De aquí obtenemos el token.
        console.log(`nos trae`, rdxToken.credentials.token);
    }, [rdxToken]);
    

    return (
        <div className="profileDesign">
        Profile
        </div>
    )
}
import { useSelector } from "react-redux";
import "./AppointmentSuperAdmin.css"
import { userData } from "../../userSlice";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AppointmentSuperAdmin = () => {
    console.log ("1")
    const navigate = useNavigate();

    const rdxToken = useSelector(userData);

   useEffect (() => {
    if(rdxToken !== ""){
        console.log("2")
        const token = rdxToken.credentials.token;
        console.log(token, "3")
        const decoredToken =jwtDecode(token)
        console.log(decoredToken, "4")
        console.log(decoredToken)
        if (decoredToken.role == "super_admin"){
            console.log("eres el jefe")
        } else {
            navigate ("/")
        }
    } else {
        navigate ("/")
    }
   })

    return (
        <div>
            Hola
        </div>
    )
}
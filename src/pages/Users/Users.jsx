import { useSelector } from "react-redux"
import { userData } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const navigate = useNavigate();

    const rdxToken = useSelector(userData);

    useEffect (() => {
        if(rdxToken !== ""){
            const token = rdxToken.credentials.token;
            const decoredToken = jwtDecode(token)
            console.log(decoredToken)
            if (decoredToken.role == "super_admin"){
            console.log("eje")
            } else {
                navigate ("/")
            }
        } else {
            navigate ("/")
        }
       }, [rdxToken, navigate])
    return(
        <>Users</>
    )
}
import { useEffect } from "react";
import "./Register.css"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";


  
export const Register = () => {
    const navigate = useNavigate();
    const rdxCredentials = useSelector(userData);

    
  //Utilizamos este useEffect para que, en el caso que alguien ya se haya logeado, no pueda acceder a esta vista.
  useEffect(()=>{
    //Comprobamos si ya hay un token almacenado en Redux
        if(rdxCredentials?.credentials.token){
          //Si ya contamos con un token, redirigimos al usuario a inicio.
          navigate("/");
        } 
      },[rdxCredentials, navigate]);

    return (
        <div className="registerDesign">
        Register
        </div>
    )
}
import "./Header.css";
import { LinkButton } from "../LinkButton/LinkButton";

//Importamos Redux
import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import { useNavigate } from "react-router-dom";


export const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const rdxCredentials = useSelector(userData);

  const logOutMe = () => {
    dispatch(logout( {credentials :""}))
    navigate("/")
  }

  return (
    <div className="headerDesign">
      <div className="headerText">
        {/* Estas son las vistas públicas que siempre visualizaremos */}
        <LinkButton path={"/"} title={"Inicio"} />
        {/* Estas vistas son las que podremos visualizar, dependiendo de si contamos con token. */}
        
        {!rdxCredentials?.credentials.token ? (
        <> 
        <LinkButton path={"/register"} title={"Registrarte"} />
        <LinkButton path={"/login"} title={"Iniciar sesión"} />

        </>
         ) : (
        <>
        <LinkButton path={"/profile"} title={rdxCredentials.credentials.name} />
        <div onClick={logOutMe}>
            <LinkButton path={"/"} title={"Cerrar sesión"} />  
          </div>
        </>
        )}
      </div>
    </div>
  );
};

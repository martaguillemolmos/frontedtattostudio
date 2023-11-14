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
        <LinkButton path={"/login"} title={"Inicia sesión"} />
        </>
         ) : (
        <>
        <LinkButton path={"/profile"} title={"Perfil"} />
        <div onClick={logOutMe}>
            <LinkButton path={"/"} title={"Perfil"} />  
          </div>
        </>
        )}
      </div>
    </div>
  );
};

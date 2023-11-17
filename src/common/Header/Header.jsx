import "./Header.css";
import { LinkButton } from "../LinkButton/LinkButton";

//Importamos Redux
import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const rdxCredentials = useSelector(userData);

  const token = rdxCredentials.credentials.token;
  //Ahora debemos de decodificar el token para acceder a la información de superAdmin.
  const decodificado = jwtDecode(token);
  //Ahpra lo que hacemos es recuperar el token para poder validar el acceso a las rutas.
  const roleToken = decodificado.role
  
  const logOutMe = () => {
    dispatch(logout( {credentials :""}))
    navigate("/")
  }

  return (
    <div className="headerDesign">
      <div className="headerText">
        {/* Estas son las vistas públicas que siempre visualizaremos */}
        <LinkButton path={"/"} title={"Inicio"} />
        <LinkButton path={"/product"} title={"Productos"} />
  
        {/* Estas vistas son las que podremos visualizar, dependiendo de si contamos con token. */}
        {!rdxCredentials?.credentials.token ? (
          <>
            <LinkButton path={"/register"} title={"Registrarte"} />
            <LinkButton path={"/login"} title={"Iniciar sesión"} />
          </>
        ) : (
          <>
            {!roleToken == "super_admin" ? (
              <>
                <LinkButton path={"/profile"} title={rdxCredentials.credentials.name} />
                <LinkButton path={"/appointment/user"} title={"Citas usuario"} />
              </>
            ) : (
              <>
                <LinkButton path={"/appointment"} title={"Citas"} />
              </>
            )}
          </>
        )}
  
        <div onClick={logOutMe}>
          <LinkButton path={"/"} title={"Cerrar sesión"} />
        </div>
      </div>
    </div>
  );
};

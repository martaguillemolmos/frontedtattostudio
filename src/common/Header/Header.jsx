import "./Header.css";
import { LinkButton } from "../LinkButton/LinkButton";

//Importamos Redux
import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export const Header = () => {
  const navigate = useNavigate();

  const rdxToken = useSelector(userData);

  console.log("que soy?", rdxToken)

  const token = rdxToken?.credentials?.token;
  console.log("soy el token?", token)
  //Ahora debemos de decodificar el token para acceder a la información de superAdmin.
  const decodificado = token ? jwtDecode(token) : 'user';
  //Ahpra lo que hacemos es recuperar el token para poder validar el acceso a las rutas.
  const roleToken = decodificado.role
  console.log("soy el rol del token?", roleToken)

  const dispatch = useDispatch();
  
  
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
        {!rdxToken?.credentials.token ? (
          <>
            <LinkButton path={"/register"} title={"Registrarte"} />
            <LinkButton path={"/login"} title={"Iniciar sesión"} />
          </>
        ) : (
          <>
            { roleToken !== "super_admin" ? (
              <>
                <LinkButton path={"/profile"} title={rdxToken.credentials.name} />
                <LinkButton path={"/appointments"} title={"Citas usuario"} />
              </>
            ) : (
              <>
                <LinkButton path={"/appointment"} title={"Citas"} />
                <LinkButton path={"/worker"} title={"Trabajadores"} />

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

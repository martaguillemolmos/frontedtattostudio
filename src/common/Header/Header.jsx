import "./Header.css";
import { LinkButton } from "../LinkButton/LinkButton";

//Importamos Redux
import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const rdxToken = useSelector(userData);
  // console.log("este token es lo mejor", rdxToken);
  const [decodificadoToken, setDecodificadoToken] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (rdxToken.credentials !== "") {
      try {
        const token = rdxToken?.credentials?.token;
        // console.log("soy el token", token);
        const decodificado = token ? jwtDecode(token) : "user";
        const roleToken = decodificado.role;
        setDecodificadoToken(roleToken);
        // console.log("soy el rol del token?", roleToken);
      } catch (error) {
        console.log("Ay ay ay");
      }
    }
  }, [rdxToken]);

  const logOutMe = () => {
    dispatch(logout({ credentials: "" }));
    navigate("/");
  };

  return (
    <div className="headerDesign">
      <div className="headerText">
        {/* Vistas públicas */}
        <LinkButton path={"/"} title={"Inicio"} />
        <LinkButton path={"/product"} title={"Productos"} />
        {/* Vistas si estás registrado o no*/}
        {/* No estás registrado */}
        {rdxToken.credentials == "" ? (
          <>
            <LinkButton path={"/register"} title={"Registrarte"} />
            <LinkButton path={"/login"} title={"Iniciar sesión"} />
          </>
        ) : (
          <>
            <LinkButton path={"/profile"} title={rdxToken.credentials.name} />
            {/* Si estás registrado pero no eres super_admin */}
            {decodificadoToken !== "super_admin" ? (
              <>
                <LinkButton path={"appointment/user"} title={"Citas usuario"} />
              </>
            ) : (
              <>
                {/* <LinkButton path={"/appointment/user"} title={"Citas"} /> */}
                <LinkButton path={"/worker"} title={"Trabajadores"} />
              </>
            )}
            <div onClick={logOutMe}>
              <LinkButton path={"/"} title={"Cerrar sesión"} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

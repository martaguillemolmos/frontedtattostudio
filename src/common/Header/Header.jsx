import "./Header.css";
import { LinkButton } from "../LinkButton/LinkButton";

export const Header = () => {
  return (
    <div className="headerDesign">
      <div className="headerText">
        <LinkButton path={"/"} title={"Inicio"} />
        <LinkButton path={"/login"} title={"Inicia sesión"} />
        <LinkButton path={"/profile"} title={"Perfil"} />
      </div>
    </div>
  );
};

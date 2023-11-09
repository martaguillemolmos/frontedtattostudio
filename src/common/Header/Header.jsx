import "./Header.css"
import { LinkButton } from "./LinkButton/LinkButton";

export const Header = () => {

    return (
        <div className='headerDesign'>
            <LinkButton
                path={"/"}
                title={"Home"}
            />
              <LinkButton
                path={"/register"}
                title={"Register"}
            />
            <LinkButton
                path={"/login"}
                title={"Login"}
            />
            <LinkButton
                path={"/profile"}
                title={"Profile"}
            />
        </div>
    )
}
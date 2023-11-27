import { LetterAvatars } from "../../Avatar/Avatar";
import "./CardExample.css";

export const CardExample = ({ name, surname, email, phone, role }) => {
  const inicial = name ? name.charAt(0) : "";
  return (
    <div className="card-user">
      <div className="card-user-header">
        <LetterAvatars initial={inicial} />
        <div className="role-box">
          <p className="card-user-description role">{role}</p>
        </div>
      </div>
      <div className="card-user-content">
        <div className="name">
          <p className="card-user-title">
            {name} {surname}
          </p>
        </div>
        <p className="card-user-description">{email}</p>
        <p className="card-use-description">{phone}</p>
      </div>
    </div>
  );
};
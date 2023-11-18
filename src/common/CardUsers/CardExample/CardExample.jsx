import "./CardExample.css"

export const CardExample = ({ name, surname,email, phone, role}) => {
    return (
      <div className="card-artist">
          <p className="card-artist-title">{name}{surname}</p>
          <p className="card-artist-description">{role}</p>
          <p className="card-artist-description">{email}</p>
          <p className="card-artist-description">{phone}</p>
        </div>
    );
  };
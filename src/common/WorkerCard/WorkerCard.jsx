import "./WorkerCard.css"

export const WorkerCard = ({ name, surname, experience, formation, contracted_at}) => {
    return (
      <div className="card-artist">
          <p className="card-artist-title">{name}{surname}</p>
          <p className="card-artist-description">{experience}</p>
          <p className="card-artist-description">{formation}</p>
          <p className="card-artist-description">{contracted_at}</p>
        </div>
    );
  };
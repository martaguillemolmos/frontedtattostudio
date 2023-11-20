import "./WorkerCard.css"

export const WorkerCard = ({ name, surname, experience, formation, contracted_at}) => {
    return (
      <div className="card">
          <p className="card-title">{name}{surname}</p>
          <p className="card-description">{experience}</p>
          <p className="card-description">{formation}</p>
          <p className="card-description">{contracted_at}</p>
        </div>
    );
  };
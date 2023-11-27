import "./WorkerCard.css"

export const WorkerCard = ({ name, surname, experience, formation, contracted_at}) => {
    return (
      <div className="card">
          <div className="headerWorker">
          <p className="card-title">{name} {surname}</p>
          </div>
          <div className="contentWorker">
          <p className="card-description">Experiencia: {experience}</p>
          <p className="card-description">Formación: {formation}</p>
          </div>
          <p className="card-description">{contracted_at}</p>
        </div>
    );
  };
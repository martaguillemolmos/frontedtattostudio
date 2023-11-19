import './CardAppointments.css'; // Asegúrate de tener un archivo CSS asociado

const CardAppointments = ({
  client,
  artist,
  portfolio,
  date,
  status_appointment,
  is_active,
}) => {
  // Lógica para determinar el color según el estado de la cita
  const getStatusColor = () => {
    switch (status_appointment) {
      case 'pending':
        return 'pendingColor';
      case 'approved':
        return 'approvedColor';
      case 'canceled':
        return 'cancelledColor';
      case 'made':
        return 'completedColor';
      default:
        return 'defaColor';
    }
  };

  if (!is_active) {
    return null;
  }
  return (
    <div className={`card ${getStatusColor()}`}>
        <div>
          <div className="cardInfo">
            <span className="infoLabel">Artista:</span>
            <span className="infoValue">{artist}</span>
          </div>
          <div className="cardInfo">
            <span className="infoLabel">Producto:</span>
            <span className="infoValue">{portfolio}</span>
          </div>
        </div>
    
        <div>
          <div className="cardInfo">
            <span className="infoLabel">Cliente:</span>
            <span className="infoValue">{client}</span>
          </div>
        </div>
      
      <div className="cardInfo">
        <span className="infoLabel">Fecha:</span>
        <span className="infoValue">{date}</span>
      </div>
      <div className="cardInfo">
        <span className="infoLabel">Estatus:</span>
        <span className="infoValue">{status_appointment}</span>
      </div>
    </div>
  );
};

export default CardAppointments;
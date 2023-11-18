import "./CardProduct.css";

export const CardProduct = ({  product, type, description,duration, image, price }) => {
  return (
    <div className="card-service-body">
    <div className="card-service">        <p className="card-service-description">{product}</p>

    <p className="card-service-description">{image}</p>
        <p className="card-service-description">{type}</p>
        <p className="card-service-description">{description}</p>
        <p className="card-service-description">{price}</p>
        <p className="card-service-description">{duration}</p>

      </div>
      </div>
  );
};
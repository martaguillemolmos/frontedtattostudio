import "./Products.css";
import { useEffect, useState } from "react";
import { getAllproducts } from "../../services/apiCalls";
import { CardProduct } from "../../common/CardProduct/CardProduct";

export const Products = () => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    if (profile.length === 0) {
      getAllproducts()
        .then((results) => {
          setProfile(results.data);
          const searchData = results.data
          console.log("soy search",searchData)
          })
        
        .catch((error) => console.og(error));
}
  }, [profile]);

  return (
    <div className="productsDesign">
      {profile.length > 0 ? (
        <div className="productsRoster">
          {profile.map((results) => {
            return (
              <CardProduct
                key={results.id}
                image={results.portfolioWorker.image}
                type={results.portfolioWorker.type}
                product={results.portfolioWorker.product}
                description={results.portfolioWorker.description}
                duration={`${results.portfolioWorker.duration} hora`}
                price={results.portfolioWorker.price}
              />
            );
          })}
        </div>
      ) : (
        <div>Esperando los products</div>
      )}
    </div>
  );
};

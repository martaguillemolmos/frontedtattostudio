import "./Products.css";
import { useEffect, useState } from "react";
import { getAllproducts } from "../../services/apiCalls";
import { FeaturesCard } from "../../common/CardProducts/CardProducts";

export const Products = () => {

  const [profile, setProfile] = useState([]);
  const [productId, setProductId] = useState(new Set());

  useEffect(() => {
    if (profile.length === 0) {
      getAllproducts()
        .then((results) => {
          setProfile(results.data);
          const searchData = results.data;
          console.log("soy search", searchData);

          // Filtramos los elementos de la array que hemos obtenido para crear un nuevo array
          //que no tenga los id duplicados.
          const uniqueProduct = results.data.filter(
            (results) => !productId.has(results.portfolioWorker.id)
          );
          setProfile(uniqueProduct);

          const updatedId = new Set([
            ...productId,
            ...uniqueProduct.map((results) => results.portfolioWorker.id),
          ]);
          setProductId(updatedId);
        })
        .catch((error) => console.og(error));
    }
  
  }, [profile, productId]);

  return (
    <div className="productsDesign">
      {profile.length > 0 ? (
        <div className="productsRoster">
          {profile.map((results) => {
            return (
              <FeaturesCard
                key={results.id}
                id={results.portfolioWorker.id}
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

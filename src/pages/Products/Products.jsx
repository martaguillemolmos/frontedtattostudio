import "./Products.css";
import { useEffect, useState } from "react";
import { getAllproducts } from "../../services/apiCalls";
import { FeaturesCard } from "../../common/CardProducts/CardProducts";

export const Products = () => {
  const [allPortfolios, setAllPortfolios] = useState([])
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    if (portfolio.length === 0) {
      getAllproducts()
        .then((results) => {
          setAllPortfolios("soy result.data",results.data);
          const searchData = results.data;
          console.log("soy search", searchData);

          const uniqueIds = {};

            // Filtrar el array para eliminar duplicados basados en "product_id"
          const filteredData = searchData.filter((item) => {
              // Verificar si el ID ya existe en el objeto uniqueIds
              if (!uniqueIds[item.product_id]) {
                // Si no existe, marcarlo como visto y mantenerlo en el array resultante
                uniqueIds[item.product_id] = true;
                return true;
              }
              // Si el ID ya existe, descartar el elemento duplicado
              return false;
            })
            setPortfolio(filteredData);
        })
        .catch((error) => console.og(error));
    }
  
  }, [portfolio]);

  return (
    <div className="productsDesign">
      {portfolio.length > 0 ? (
        <div className="productsRoster">
          {portfolio.map((results) => {
            return (
              <FeaturesCard
                key={results.id}
                productId={results.product_id}
                id={results.portfolioWorker.id}
                image={results.portfolioWorker.image}
                type={results.portfolioWorker.type}
                product={results.portfolioWorker.product}
                description={results.portfolioWorker.description}
                duration={`${results.portfolioWorker.duration} hora`}
                price={results.portfolioWorker.price}
                allProducts={allPortfolios}
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

import "./Products.css";
import { useEffect, useState } from "react";
import { getAllproducts } from "../../services/apiCalls";
import { CardProduct } from "../../common/CardProduct/CardProduct";

export const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (products.length === 0) {
      getAllproducts()
        .then((results) => {
          setProducts(results.data);
          console.log(results.data);
        })
        .catch((error) => console.og(error));
    }
  }, [products]);

  return (
    <div className="productsDesign">
      {products.length > 0 ? (
        <div className="productsRoster">
          {products.map((products) => {
            return (
              <CardProduct
                key={products.id}
                product={products.product}
                type={products.type}
                description={products.description}
                price={products.price}
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

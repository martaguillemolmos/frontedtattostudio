import { useEffect, useState } from "react";
import "./Workers.css";
import { getAllWorkers } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { WorkerCard } from "../../common/WorkerCard/WorkerCard";

export const Workers = () => {
  const navigate = useNavigate();
  // Instanciamos Redux en lectura
  const rdxToken = useSelector(userData);
  //Aquí recuperamos solo el token
  const token = rdxToken.credentials.token;
  //Ahora debemos de decodificar el token para acceder a la información de superAdmin.
  const decodificado = jwtDecode(token);
  console.log("soy el token decodificado", decodificado.role);
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    if (token && decodificado.role == "super_admin") {
      if (workers.length === 0) {
        getAllWorkers(token)
          .then((results) => {
            setWorkers(results.data);
            console.log("soy results", results.data);
          })
          .catch((error) => console.log(error));
      }
    } else {
      //Si no contamos con el rol de superAdmin
      navigate("/");
    }
  }, [workers]);

  return( 
    <div className="workersDesign">
    {workers.length > 0 ? (
      <div className="workerRoster">
        {workers.map((workers) => {
          return (
            <WorkerCard
            key ={workers.id}
            name ={workers.users.name}
            surname={workers.users.surname}
            experience={workers.experience}
            formation={workers.formation}
            contracted_at={workers.contracted_at}
             />
            );
        })}
      </div>
    ) : (
      <div>Esperando las películas por defecto</div>
    )}
  </div>
);
};


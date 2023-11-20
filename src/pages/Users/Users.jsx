import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/apiCalls";
import { CardExample } from "../../common/CardUsers/CardExample/CardExample";

export const Users = () => {
  const navigate = useNavigate();
  const rdxToken = useSelector(userData);
  const [users, setUsers] = useState([]);
  const [msgError, setMsgError] = useState("");

  useEffect(() => {
    if (rdxToken !== "") {
      const token = rdxToken.credentials.token;
      const decoredToken = jwtDecode(token);
      console.log(decoredToken);
      if (decoredToken.role == "super_admin") {
        getAllUsers(token)
          .then((results) => {
            console.log("esto", results.data);
            setUsers(results.data);
          })
          .catch((error) => {
            if (error.response && error.response.data) {
              // Si tenemos un mensaje en response.data, lo mostramos
              setMsgError(error.response.data);
            } else {
              // Si no tenemos un mensaje en response.data
              setMsgError("Hubo un error al cargar las citas.");
            }
          });
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [rdxToken, navigate]);
  return (
    <div className="usersDesign">
      {users.length > 0 ? (
        <div className="usersRoster">
          {users.map((results) => {
            return (
              <CardExample
                key={results.id}
                name={results.name}
                surname={results.surname}
                role={results.role}
                email={results.email}
                phone={results.phone}
              />
            );
          })}
        </div>
      ) : (
        <div>{msgError}</div>
      )}
    </div>
  );
};

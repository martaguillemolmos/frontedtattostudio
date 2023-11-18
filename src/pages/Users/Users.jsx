import { useSelector } from "react-redux"
import { userData } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/apiCalls";

export const Users = () => {
    const navigate = useNavigate();
    const rdxToken = useSelector(userData);
    const [users, setUsers] = useState([]);
    const [msgError, setMsgError] = useState("");



    useEffect (() => {
        if(rdxToken !== ""){
            const token = rdxToken.credentials.token;
            const decoredToken = jwtDecode(token)
            console.log(decoredToken)
            if (decoredToken.role == "super_admin"){
                
                getAllUsers(token)
                .then((results) => {
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
                navigate ("/")
            }
        } else {
            navigate ("/")
        }
       }, [rdxToken, navigate])
    return(
        <div className="usersDesign">
      {users.length > 0 ? (
        <div className="usersRoster">
          {users.map((appointments) => {
            return (
              <CardAppointments
                key={appointments.id}
                client={appointments.client}
                artist={appointments.artist}
                portfolio={appointments.portfolio_id}
                date={appointments.date}
                status_appointment={appointments.status_appointment}
                is_active={appointments.is_active}
              />
            );
          })}
        </div>
      ) : (
        <div>{msgError}</div>
      )}
      </div>
    )
}
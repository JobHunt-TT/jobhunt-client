import React, { useEffect, useState } from "react";
import axios from "axios";

export const CarreraForm = ({
  userCarrera,
  carreraUserId,
  user,
}: {
  userCarrera: any[];
  carreraUserId: any;
  user: any;
}) => {
  const [carreras, setCarreras] = useState<any[]>([]);
  const [carrUsId, setcarrusid] = useState<any>(carreraUserId);
  useEffect(() => {
    setcarrusid(carreraUserId);
    console.log(user);
    console.log("carreras", userCarrera);
    getCarreras();
  }, [userCarrera, carreraUserId]);
  const getCarreras = () => {
    axios
      .post("/consulta_carreras")
      .then((data) => {
        setCarreras(data.data);
        // setCarreras(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const handleSelectCarreer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //aqui manda el id de la carrera
    e.preventDefault();
    setcarrusid(e.target.value);
    console.log(e.target.value);
    console.log(user);
    //window.location.reload();
  };
  return (
    <div>
      <select onChange={handleSelectCarreer} value={carrUsId}>
        {carreras.map((carrera) => {
          return <option value={carrera.id}>{carrera.carreraNombre}</option>;
        })}
      </select>
    </div>
  );
};

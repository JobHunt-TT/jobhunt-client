import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

var valor;
export const CarreraSelectForm = ({
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

    valor = localStorage.getItem("idUser");
    console.log("IDUSER",valor);
    //aqui manda el id de la carrera
    e.preventDefault();
    setcarrusid(e.target.value);
    console.log(e.target.value);
    axios
    .post("/alta_carrera_alumno", {
      id: localStorage.getItem("idUser"),
      id2: e.target.value,
    })
    .then((data) => {
      console.log("VALORES",data);
      MySwal.fire({
        icon: "success",
        title: "Carrera registrado con éxito",
        timer: 3000,
        showConfirmButton: false,
      }).then(() => {
        //window.location.reload();
      });
    })
    .catch((error) => {
      console.log("error", error);

      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al registrar la carrera",
        timer: 3000,
        showConfirmButton: false,
      });
    });
    console.log("id_Carrera",e.target.value);
    console.log("user",userCarrera);
    window.location.reload();
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

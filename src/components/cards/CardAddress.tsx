import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DireccionForm } from "../../forms";
import { useEffect, useState } from "react";
import axios from "axios";

const MySwal = withReactContent(Swal);

interface CardAddressProps {
  type: "alumno" | "empresa" | "oferta";
  direccionID: number;
}

export const CardAddress = ({ type, direccionID }: CardAddressProps) => {
  const [direccion, setDireccion] = useState<any>("--");

  const handleAddDireccion = () => {
    MySwal.fire({
      html: <DireccionForm type={type} />,
      showCancelButton: false,
      showConfirmButton: false,
      preConfirm: () => {
        // const form = document.getElementById('my-form') as HTMLFormElement;
        // if (form) {
        //   return handleSubmit(submit)().then(() => null);
        // }
        return null;
      },
    }).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    axios
      .post(`/consulta_direccion`, { id: direccionID })
      .then((data) => {
        setDireccion(data.data)
      })
      .catch((e) => console.log(e));
  }, [direccionID]);

  return (
    <div className="bg-white rounded-md p-4 mt-6 relative">
      <div className="text-xl text-politectico font-bold">Dirección</div>
      <div className="mt-2">
        {direccion && (direccion.estado || direccion.colonia) ? (
          <div>
            {direccion.estado ? direccion.estado : "Estado no disponible"}{" "}
            {direccion.colonia ? direccion.colonia : "Colonia no disponible"}
          </div>
        ) : (
          <div>Información no disponible</div>
        )}
      </div>
      <FontAwesomeIcon
        icon={faPen}
        onClick={handleAddDireccion}
        className="absolute top-4 right-4 text-politectico/60 text-lg cursor-pointer hover:text-politectico"
      />
    </div>
  );
};

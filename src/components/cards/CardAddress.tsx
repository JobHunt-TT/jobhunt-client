import { faPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DireccionForm } from "../../forms";

const MySwal = withReactContent(Swal);

interface CardAddressProps{
  type: 'alumno' | 'empresa' | 'oferta'
}

export const CardAddress = ({ type }: CardAddressProps) => {

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
    });
  };
  return(
    
    <div className="bg-white rounded-md p-4 mt-6 relative">
    <div className="text-xl text-politectico font-bold">Dirección</div>
    <div className="mt-2">
      <div>Hda de Aragón Mz 2 Lt 1</div>
    </div>
    <FontAwesomeIcon
      icon={faPen}
      onClick={handleAddDireccion}
      className="absolute top-4 right-4 text-politectico/60 text-lg cursor-pointer hover:text-politectico"
    />
  </div>
  )
}
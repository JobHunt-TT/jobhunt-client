import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);

export interface CarreraFormFields {
  Carrera: string; // Ahora este campo será el id de la carrera
}

const defaultValues: CarreraFormFields = {
  Carrera: "",
};

export const useCarreraManagement = () => {
  const schema = yup.object().shape({
<<<<<<< HEAD
    Carrera: yup.string().required("La Carrera es requerida"),
=======
    Carrera: yup.string().required("La carrera es requerida"),
>>>>>>> 73b91fc1026d56f2140d5c4fd135f6283f17689a
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const validForm = async () => {
    const result = await methods.trigger(["Carrera"]);
    return result;
  };

  const submit: SubmitHandler<CarreraFormFields> = async ({ Carrera }) => {
    MySwal.fire({
      title: "Por favor, espere...",
      didOpen: () => {
        MySwal.showLoading();
      },
      allowOutsideClick: false,
    });

    axios
      .post("/alta_carrera_alumno", {
        id: localStorage.getItem("idUser"),
        id2: Carrera, // Usamos el id de la carrera
      })
      .then((data) => {
        MySwal.fire({
          icon: "success",
          title: "Carrera registrada con éxito",
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: "Error",
<<<<<<< HEAD
          text: "Hubo un error al agregar la Carrera",
=======
          text: "Hubo un error al agregar la carrera",
>>>>>>> 73b91fc1026d56f2140d5c4fd135f6283f17689a
          timer: 3000,
          showConfirmButton: false,
        });
      });
  };

  return {
    methods,
    validForm,
    submit,
  };
};

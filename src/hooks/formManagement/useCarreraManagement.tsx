import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);

export interface CarreraFormFields {
  Carrera: string;
}

const defaultValues: CarreraFormFields = {
  Carrera: "",
};

export const useCarreraManagement = () => {
  const schema = yup.object().shape({
    Carrera: yup.string().required("La carrera es requerida"),
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
      .post("/cambio_estudiante_Carrera", {
        id: localStorage.getItem("idUser"),
        Carrera,
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
          text: "Hubo un error al agregar la carrera",
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

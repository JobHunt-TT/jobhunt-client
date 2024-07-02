import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);

export interface CambioResidenciaFormFields {
  cambioResidencia: string;
}

const defaultValues: CambioResidenciaFormFields = {
  cambioResidencia: "",
};

export const useCambioResidenciaManagement = () => {
  const schema = yup.object().shape({
    cambioResidencia: yup
      .string()
      .required("Esta opción es requerida")
      .oneOf(["0", "1"], "Seleccione una opción válida"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const validForm = async () => {
    const result = await methods.trigger(["cambioResidencia"]);
    return result;
  };

  const submit: SubmitHandler<CambioResidenciaFormFields> = async ({ cambioResidencia }) => {
    MySwal.fire({
      title: "Por favor, espere...",
      didOpen: () => {
        MySwal.showLoading();
      },
      allowOutsideClick: false,
    });
    const valor = localStorage.getItem("idUser");
    axios
      .post("/cambio_residencia", {
        id: localStorage.getItem("idUser"),
        id2: cambioResidencia,
      })
      .then((data) => {
        MySwal.fire({
          icon: "success",
          title: "Cambio de residencia registrado con éxito",
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log("error", error);

        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al registrar el cambio de residencia",
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

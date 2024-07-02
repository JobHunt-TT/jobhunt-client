import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);

export interface ModalidadFormFields {
  modalidad: string;
}

const defaultValues: ModalidadFormFields = {
  modalidad: "",
};

export const useModalidadManagement = () => {
  const schema = yup.object().shape({
    modalidad: yup
      .string()
      .required("Esta opción es requerida")
      .oneOf(["Presencial", "Hibrida", "Remoto", "Indistinto"], "Seleccione una opción válida"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const validForm = async () => {
    const result = await methods.trigger(["modalidad"]);
    return result;
  };

  const submit: SubmitHandler<ModalidadFormFields> = async ({ modalidad }) => {
    MySwal.fire({
      title: "Por favor, espere...",
      didOpen: () => {
        MySwal.showLoading();
      },
      allowOutsideClick: false,
    });

    axios
      .post("/cambio_modalidad", {
        id: localStorage.getItem("idUser"),
        descripcion: modalidad,
      })
      .then((data) => {
        MySwal.fire({
          icon: "success",
          title: "Modalidad registrada con éxito",
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
          text: "Hubo un error al registrar la modalidad",
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

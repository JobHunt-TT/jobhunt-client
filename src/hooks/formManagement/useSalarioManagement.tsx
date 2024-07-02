import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);

export interface SalarioFormFields {
  salario: number;
}

const defaultValues: SalarioFormFields = {
  salario: 0,
};

export const useSalarioManagement = () => {
  const schema = yup.object().shape({
    salario: yup
      .number()
      .required("El salario es requerido")
      .min(0, "El salario debe ser un valor positivo"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const validForm = async () => {
    const result = await methods.trigger(["salario"]);
    return result;
  };

  const submit: SubmitHandler<SalarioFormFields> = async ({ salario }) => {
    MySwal.fire({
      title: "Por favor, espere...",
      didOpen: () => {
        MySwal.showLoading();
      },
      allowOutsideClick: false,
    });

    axios
      .post("/cambio_salario", {
        id: localStorage.getItem("idUser"),
        salario,
      })
      .then((data) => {
        MySwal.fire({
          icon: "success",
          title: "Salario registrado con éxito",
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
          text: "Hubo un error al registrar el salario",
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

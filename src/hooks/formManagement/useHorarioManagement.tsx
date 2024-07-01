import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);

export interface HorarioFormFields {
  horario: string;
}

const defaultValues: HorarioFormFields = {
  horario: "",
};

export const useHorarioManagement = () => {
  const schema = yup.object().shape({
    horario: yup.string().required("El horario es requerido"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const validForm = async () => {
    const result = await methods.trigger(["horario"]);
    return result;
  };

  const submit: SubmitHandler<HorarioFormFields> = async ({ horario }) => {
    MySwal.fire({
      title: "Por favor, espere...",
      didOpen: () => {
        MySwal.showLoading();
      },
      allowOutsideClick: false,
    });

    axios
      .post("/cambio_estudiante_horario", {
        id: localStorage.getItem("idUser"),
        horario,
      })
      .then((data) => {
        MySwal.fire({
          icon: "success",
          title: "Horario registrado con éxito",
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
          text: "Hubo un error al agregar el horario",
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

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);

export interface ExperienciaFormFields {
  puesto: string;
  fechaInicio: string;
  fechaFin: string;
  descripcion: string;
}

const defaultValues: ExperienciaFormFields = {
  puesto: "",
  fechaInicio: "",
  fechaFin: "",
  descripcion: "",
};

export const useExperienciaManagement = () => {
  const schema = yup.object().shape({
    puesto: yup.string().required("El nombre del puesto es requerido"),
    fechaInicio: yup.string().required("La fecha de inicio es requerida")
    .matches(/^\b(?!2024-07-(0[7-9]|1[0-2]))\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\b$/),
    fechaFin: yup.string().required("La fecha de termino es requerida"),
    descripcion: yup.string().required("La descripción es requerida"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const validForm = async () => {
    const result = await methods.trigger(["puesto", "fechaInicio", "fechaFin", "descripcion"]);
    return result;
  };

  const submit: SubmitHandler<ExperienciaFormFields> = async (data) => {
    MySwal.fire({
      title: "Por favor, espere...",
      didOpen: () => {
        MySwal.showLoading();
      },
      allowOutsideClick: false,
    });

    axios
      .post("/alta_experiencia", {
        idEst: localStorage.getItem("idUser"),
        nombre: data.puesto,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        descrpcion: data.descripcion,
      })
      .then((response) => {
        console.log(data);
        MySwal.fire({
          icon: "success",
          title: "Experiencia registrada con éxito",
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
          text: "Hubo un error al agregar la experiencia",
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

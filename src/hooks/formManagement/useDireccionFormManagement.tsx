import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);

export interface DireccionFormFields {
  type: string;
  cp: string;
  vialidad: string;
  noExt: string;
  noInt: string;
  colonia: string;
  municipio: string;
  estado: string;
  entreCalles: string;
}

const defaultValues: DireccionFormFields = {
  type: "",
  cp: "",
  vialidad: "",
  noExt: "",
  noInt: "",
  colonia: "",
  municipio: "",
  estado: "",
  entreCalles: "",
};

export const useDireccionFormManagement = () => {
  const schema = yup.object().shape({
    type: yup.string().required(),
    cp: yup
      .string()
      .required("El nombre es requerido")
      .matches(/^[0-9]+$/, "Solo se admiten letras")
      .min(5, "Debes introducir al menos 5 digitos")
      .max(5, "Solo se admiten 5 digitos"),
    vialidad: yup.string().required("La vialidad es requerida"),
    noExt: yup.string().required("El número exterior es requerido"),
    noInt: yup.string().required("El número interior es requerido"),
    colonia: yup.string().required("La colonia es requerida"),
    municipio: yup.string().required("El municipio es requerido"),
    estado: yup.string().required("El estado es requerido"),
    entreCalles: yup.string().required("Las entre calles son requeridas"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const validForm = async () => {
    const result = await methods.trigger([
      "type",
      "cp",
      "vialidad",
      "noExt",
      "noInt",
      "colonia",
      "municipio",
      "estado",
      "entreCalles",
    ]);
    return result;
  };

  const submit: SubmitHandler<DireccionFormFields> = async ({
    type,
    ...direccion
  }) => {
    MySwal.fire({
      title: "Por favor, espere...",
      didOpen: () => {
        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
        MySwal.showLoading();
      },
      allowOutsideClick: false,
    });

    axios
      .post(
        `/${
          type === "alumno"
            ? "cambio_direccion_alumno"
            : type === "empresa"
            ? "cambio_direccion_empresa"
            : "cambio_direccion_oferta"
        }`,
        {
          ide:
            type === "alumno"
              ? localStorage.getItem("idUser")
              : type === "empresa"
              ? localStorage.getItem("idEmpresa")
              : localStorage.getItem("idOferta"),
          ...direccion,
        }
      )
      .then((data) => {
        console.log("success", data);

        MySwal.fire({
          icon: "success",
          title: "Direccion registrada con éxito",
          timer: 3000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.log("error", error);

        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al agregar la Direccion",
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

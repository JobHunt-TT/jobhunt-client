import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);

export interface VacanteFormFields {
  nombreOferta: string;
  vigencia: string;
  duracionContrato: string;
  nombrePuesto: string;
  salario: string;
  tags?: string[]
}

const defaultValues: VacanteFormFields = {
  nombreOferta: "",
  vigencia: "",
  duracionContrato: "",
  nombrePuesto: "",
  salario: "",
  tags: []
};

export const useVacanteFormManagement = () => {
  const schema = yup.object().shape({
    nombreOferta: yup.string().required("El nombre es requerido"),
    vigencia: yup
      .string()
      .required("La fecha es requerido")
      .matches(
        /^\b(?:2024-07-(?:[0-2][0-9]|30|31)|2024-(?:08|09|1[0-2])-(?:[0-2][0-9]|30|31))\b$/,
        "Verifica la vigencia"
      ),
    duracionContrato: yup
      .string()
      .required("La duración del contrato es requerida"),
    nombrePuesto: yup.string().required("El nombre del puesto es requerido")
    .matches(/^[a-zA-ZÀ-ÿÑñ ]+$/, "Sólo se admiten letras en el nombre de puesto"),
    salario: yup.string().required("El salario es requerido"),

    tags: yup.array().of(yup.string().required())
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const validForm = async () => {
    const result = await methods.trigger([
      "nombreOferta",
      "vigencia",
      "duracionContrato",
      "nombrePuesto",
      "salario",
      "tags"
    ]);
    return result;
  };

  const submit: SubmitHandler<VacanteFormFields> = async ({ tags, ...fields }) => {
    console.log(fields);
    let tagsData = "";
    for (let index = 0; index < tags!.length; index++) {
      tagsData += ` ${tags![index].toLowerCase()}`;
    }

    const formatData = {
      ...fields,
      tags: "java"//tagsData.trim()
    }
    console.log(formatData);

    MySwal.fire({
      title: "Por favor, espere...",
      didOpen: () => {
        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
        MySwal.showLoading();
      },
      allowOutsideClick: false,
    });

    axios
      .post("/alta_oferta_trabajo", {
        empresaID: localStorage.getItem("idEmpresa"),
        nombreOferta: formatData.nombreOferta,
        vigencia: formatData.vigencia,
        duracionContrato: formatData.duracionContrato,
        nombrePuesto: formatData.nombrePuesto,
        salario: formatData.salario,
        tags: formatData.tags,
        descripcion: "",
      })
      .then((data) => {

        MySwal.fire({
          icon: "success",
          title: data.data,
          timer: 3000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.log("error", error);

        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al agregar la skill",
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

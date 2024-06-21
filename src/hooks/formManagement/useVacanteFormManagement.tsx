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
}

const defaultValues: VacanteFormFields = {
  nombreOferta: "",
  vigencia: "",
  duracionContrato: "",
  nombrePuesto: "",
  salario: "",
};

export const useVacanteFormManagement = () => {
  const schema = yup.object().shape({
    nombreOferta: yup.string().required("El nombre es requerido"),
    vigencia: yup
      .string()
      .required("La fecha es requerido")
      .matches(
        /^[0-9-]{5}[0-9-]{3}[0-9]{2}$/,
        "La fecha no es valida. Ejemplo: 2000-06-15"
      ),
    duracionContrato: yup
      .string()
      .required("La duración del contrato es requerida"),
    nombrePuesto: yup.string().required("El nombre del puesto es requerido"),
    salario: yup.string().required("El salario es requerido"),
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
    ]);
    return result;
  };

  const submit: SubmitHandler<VacanteFormFields> = async (fields) => {
    console.log(fields);

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
        ...fields,
      })
      .then((data) => {
        console.log("success", data);

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

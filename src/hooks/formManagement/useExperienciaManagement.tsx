import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);

export interface ExperienciaFormFields {
  descripcion: string;
}

const defaultValues: ExperienciaFormFields = {
  descripcion: "",
};

export const useExperienciaManagement = () => {
  const schema = yup.object().shape({
    descripcion: yup
      .string()
      .required("El nombre es requerido")
     // .matches(/^[a-zA-ZÀ-ÿÑñ]+$/, "Solo se admiten letras"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const validForm = async () => {
    const result = await methods.trigger(["descripcion"]);
    return result;
  };

  const submit: SubmitHandler<ExperienciaFormFields> = async ({ descripcion }) => {
    MySwal.fire({
      title: "Por favor, espere...",
      didOpen: () => {
        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
        MySwal.showLoading();
      },
      allowOutsideClick: false,
    });

   /* axios
      .post("/cambio_estudiante_tag", {
        id: localStorage.getItem("idUser"),
        descripcion,
      })
      .then((data) => {
        console.log("success", data);

        if (data.status === 200) {
          axios
            .post("/consulta_estudiante_tag", {
              id: localStorage.getItem("idUser"),
            })
            .then((data) => {
              console.log("success", data);
              console.log(data);
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
*/
      /*  MySwal.fire({
          icon: "success",
          title: "Skill registrada con éxito",
          timer: 3000,
          showConfirmButton: false,
        }).then(()=>{
          window.location.reload();
        });
      })
      .catch((e) => {
        console.log("error", error);

        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al agregar la skill",
          timer: 3000,
          showConfirmButton: false,
        });
      });*/
  };
  return {
    methods,
    validForm,
    submit,
  };
};

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);

export interface EncargadoFormFields {
  userName: string;
  userApellido: string;
  userPhone: string;
  userCargo: string;
  userEmail: string;
  userContrasena: string;
}

const defaultValues: EncargadoFormFields = {
  userName: "",
  userApellido: "",
  userPhone: "",
  userCargo: "",
  userEmail: "",
  userContrasena: "",
};

export const useEncargadoManagement = () => {
  const schema = yup.object().shape({
    userName: yup
      .string()
      .required("El nombre es requerido"),
      userApellido: yup
      .string()
      .required("El Apelido es requerido"),
      userCargo: yup
      .string()
      .required("El cargo es requerido"),
      userContrasena: yup
      .string()
      .required("La contraseña es requerido"),
      userPhone: yup
      .string()
      .required("El telefono es requerido"),
      userEmail: yup
      .string()
      .required("El correo es requerido")
      .email("El correo no es valido"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const validForm = async () => {
    const result = await methods.trigger(["userName", "userApellido", "userCargo", "userContrasena", "userPhone", "userEmail"]);
    return result;
  };

  const submit: SubmitHandler<EncargadoFormFields> = async (data) => {
    MySwal.fire({
      title: "Por favor, espere...",
      didOpen: () => {
        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
        MySwal.showLoading();
      },
      allowOutsideClick: false,
    });

    axios
      .post("/alta_reclutador", {
        empresaId: localStorage.getItem("idEmpresa"),        
        userName: data.userName,
        userApellido: data.userApellido,
        userPhone: data.userPhone,
        userCargo: data.userCargo,
        userEmail: data.userEmail,
        userContrasena: data.userContrasena,
      })
      .then((response) => {
        console.log(data);
        MySwal.fire({
          icon: "success",
          title: "Usuario registrada con éxito",
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

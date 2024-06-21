import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

export interface LoginFormFields {
  email: string;
  password: string;
}

const defaultValues: LoginFormFields = {
  email: "",
  password: "",
};

export const useLoginFormManagement = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("El correo no es valido")
      .required("El correo es requerido"),
    password: yup.string().required("La constraseña es requerida"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const validForm = async () => {
    
    const result = await methods.trigger([
      "email",
      "password",
    ]);
    return result;
  }

  const submit: SubmitHandler<LoginFormFields> = async ({
    email,
    password,
  }) => {
    axios
      .post("/login", {
        userEmail: email,
        userPass: password,
      })
      .then((data) => {
        console.log("success", data);
        if (typeof data.data === "object") {
          localStorage.setItem("idUser", data.data.id);
          if (data.data.empresaId !== 0) {
            localStorage.setItem("idEmpresa", data.data.usuarioEmpresaId);
            navigate("/profileEnterprise");
          } else {
            navigate("/profile");
          }
        } else {
          MySwal.fire({
            icon: "error",
            title: "Error",
            text: data.data,
            timer: 3000,
            showConfirmButton: false,
          });
        }
      })
      .catch((error) => {
        console.log("error", error);

        MySwal.fire({
          icon: "error",
          title: "Error",
          text: 'Hubo un error en al iniciar sesión',
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

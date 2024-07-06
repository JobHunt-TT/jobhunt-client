import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const MySwal = withReactContent(Swal);

export interface RecoverPasswordFormFields {
  email: string;
}

const defaultValues: RecoverPasswordFormFields = {
  email: "",
};

export const useRecoverPasswordManagement = () => {
  // const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("El correo no es valido")
      .required("El correo es requerido"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const validForm = async () => {
    
    const result = await methods.trigger([
      "email",
    ]);
    return result;
  }

  const submit: SubmitHandler<RecoverPasswordFormFields> = async ({
    email
  }) => {
    // axios
    //   .post("http://34.67.212.165:80/login", {
    //     userEmail: email,
    //     userPass: password,
    //   })
    //   .then((data) => {
    //     console.log("success", data);
    //     if (typeof data.data === "object") {
    //       localStorage.setItem("idUser", data.data.id);
    //       navigate("/profile");
    //     } else {
    //       MySwal.fire({
    //         icon: "error",
    //         title: "Error",
    //         text: data.data,
    //         timer: 3000,
    //         showConfirmButton: false,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("error", error);

    //     MySwal.fire({
    //       icon: "error",
    //       title: "Error",
    //       text: 'Hubo un error en al iniciar sesión',
    //       timer: 3000,
    //       showConfirmButton: false,
    //     });
    //   });
  };

  return {
    methods,
    validForm,
    submit,
  };
};

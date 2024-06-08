import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import axios from "axios";

// const MySwal = withReactContent(Swal);

export interface VacanteFormFields {
  nombreVacante: string;
  descripcionVacante: string;
}

const defaultValues: VacanteFormFields = {
  nombreVacante: "",
  descripcionVacante: "",
};

export const useVacanteFormManagement = () => {
  const schema = yup.object().shape({
    nombreVacante: yup
      .string().required("El nombre es requerido"),
    descripcionVacante: yup.string().required("La constraseña es requerida"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const validForm = async () => {
    
    const result = await methods.trigger([
      "nombreVacante",
      "descripcionVacante"
    ]);
    return result;
  }

  const submit: SubmitHandler<VacanteFormFields> = async (fields) => {
    // axios
    //   .post("/login", {
    //     userEmail: email,
    //     userPass: password,
    //   })
    //   .then((data) => {
    //     console.log("success", data);
    //     if (typeof data.data === "object") {
    //       localStorage.setItem("idUser", data.data.id);
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

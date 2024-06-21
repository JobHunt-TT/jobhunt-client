import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const MySwal = withReactContent(Swal);

export interface RestorePasswordFormFields {
  codeUser: string;
  passwordUser: string;
  confirmPasswordUser: string;
}

const defaultValues: RestorePasswordFormFields = {
  codeUser: "",
  passwordUser: "",
  confirmPasswordUser: "",
};

export const useRestorePasswordFormManagement = () => {
  // const navigate = useNavigate();
  const schema = yup.object().shape({
    codeUser: yup.string().required("El código es requerido"),
    passwordUser: yup.string().required("La contraseña es requerida"),
    confirmPasswordUser: yup.string().required("La confirmación de contraseña es requerida"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const validStep1 = async () => {
    const result = await methods.trigger([
      "codeUser",
    ]);
    return result;
  };

  const validStep2 = async () => {
    const result = await methods.trigger([
      "passwordUser",
      "confirmPasswordUser",
    ]);
    return result;
  };

  const submit: SubmitHandler<RestorePasswordFormFields> = async (fields) => {
    // MySwal.fire({
    //   title: "Por favor, espere...",
    //   didOpen: () => {
    //     // `MySwal` is a subclass of `Swal` with all the same instance & static methods
    //     MySwal.showLoading();
    //   },
    //   allowOutsideClick: false,
    // });
    
    // axios
    //   .post("/alta_empresa", {
    //     userName: nameUser,
    //     userApellido: lastNameUser,
    //     userPhone: phoneUser,
    //     userCargo: cargoUser,
    //     userEmail: emailUser,
    //     userContrasena: passwordUser,
    //     userTipoEmpresaId: "1",
    //     empresaNombre: nameEnterprise,
    //     tipoEmpresaId: statusEnterprise,
    //     userRFC: rfcEnterprise,
    //   })
    //   .then((data) => {
    //     console.log("success", data);

    //     MySwal.fire({
    //       icon: "success",
    //       title: data.data,
    //       text: 'Ya puedes ingresar a tu cuenta',
    //       timer: 3000,
    //       showConfirmButton: false,
    //       didClose: () => {
    //         navigate("/login");
    //       }
    //     });
    //   })
    //   .catch((error) => {
    //     console.log("error", error);

    //     MySwal.fire({
    //       icon: "error",
    //       title: "Error",
    //       text: 'Hubo un error en el registro',
    //       timer: 3000,
    //       showConfirmButton: false,
    //     });
    //   });
  };

  return {
    methods,
    validStep1,
    validStep2,
    submit,
  };
};

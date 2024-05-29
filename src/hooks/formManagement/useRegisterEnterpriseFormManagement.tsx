import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

export interface RegisterEnterpriseFormFields {
  nameEnterprise: string;
  statusEnterprise: string;
  rfcEnterprise: string;
  nameUser: string;
  lastNameUser: string;
  phoneUser: string;
  emailUser: string;
  cargoUser: string;
  passwordUser: string;
}

const defaultValues: RegisterEnterpriseFormFields = {
  nameEnterprise: "",
  statusEnterprise: "",
  rfcEnterprise: "",
  nameUser: "",
  lastNameUser: "",
  phoneUser: "",
  emailUser: "",
  cargoUser: "",
  passwordUser: "",
};

export const useRegisterEnterpriseFormManagement = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    nameEnterprise: yup
      .string()
      .required("El nombre de la empresa es requerido")
      .matches(/^[a-zA-ZÀ-ÿÑñ\s]+$/, "Solo se admiten letras para el nombre"),
    statusEnterprise: yup.string().required("El status es requerido"),
    rfcEnterprise: yup
      .string()
      .required("El RFC es requerido")
      .matches(
        /^([A-ZÑ&]{3,4}) ?-?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12][0-9]|3[01])) ?-?([A-Z\d]{2})([A\d])$/,
        "El RFC no es valido"
      ),
    nameUser: yup
      .string()
      .required("El nombre de administrador es requerido")
      .matches(/^[a-zA-ZÀ-ÿÑñ]+$/, "Solo se admiten letras para el nombre"),
    lastNameUser: yup
      .string()
      .required("El apellido es requerido")
      .matches(/^[a-zA-ZÀ-ÿÑñ]+$/, "Solo se admiten letras para el apellido"),
    phoneUser: yup
      .string()
      .required("El teléfono es requerido")
      .matches(/^[0-9]*$/, "Solo se admiten números")
      .min(10, "Debes introducir al menos 10 digitos")
      .max(10, "Solo se admiten 10 digitos"),
    emailUser: yup
      .string()
      .required("El correo es requerido")
      .email("El correo no es valido"),
    cargoUser: yup.string().required("El cargo es requerido"),
    passwordUser: yup.string().required("La contraseña es requerida"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const validStep1 = async () => {
    const result = await methods.trigger([
      "nameEnterprise",
      "statusEnterprise",
      "rfcEnterprise",
    ]);
    return result;
  };

  const validStep2 = async () => {
    const result = await methods.trigger([
      "nameUser",
      "lastNameUser",
      "phoneUser",
      "emailUser",
      "cargoUser",
      "passwordUser",
    ]);
    return result;
  };

  const submit: SubmitHandler<RegisterEnterpriseFormFields> = async ({
    nameEnterprise,
    statusEnterprise,
    rfcEnterprise,
    nameUser,
    lastNameUser,
    phoneUser,
    emailUser,
    cargoUser,
    passwordUser,
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
      .post("/alta_empresa", {
        userName: nameUser,
        userApellido: lastNameUser,
        userPhone: phoneUser,
        userCargo: cargoUser,
        userEmail: emailUser,
        userContrasena: passwordUser,
        userTipoEmpresaId: "1",
        empresaNombre: nameEnterprise,
        tipoEmpresaId: statusEnterprise,
        userRFC: rfcEnterprise,
      })
      .then((data) => {
        console.log("success", data);

        MySwal.fire({
          icon: "success",
          title: data.data,
          text: 'Ya puedes ingresar a tu cuenta',
          timer: 3000,
          showConfirmButton: false,
          didClose: () => {
            navigate("/login");
          }
        });
      })
      .catch((error) => {
        console.log("error", error);

        MySwal.fire({
          icon: "error",
          title: "Error",
          text: 'Hubo un error en el registro',
          timer: 3000,
          showConfirmButton: false,
        });
      });
  };

  return {
    methods,
    validStep1,
    validStep2,
    submit,
  };
};

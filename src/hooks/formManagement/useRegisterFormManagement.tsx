import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

export interface RegisterFormFields {
  name: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  password: string;
  curp: string;
  gender: string;
  status: string;
  identification: string;
}

const defaultValues: RegisterFormFields = {
  name: "",
  lastName: "",
  birthDate: "",
  phoneNumber: "",
  email: "",
  password: "",
  curp: "",
  gender: "",
  status: "",
  identification: "",
};

export const useRegisterFormManagement = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("El nombre es requerido")
      .matches(/^[a-zA-ZÀ-ÿÑñ]+$/, "Solo se admiten letras para el nombre"),
    lastName: yup
      .string()
      .required("El apellido es requerido")
      .matches(/^[a-zA-ZÀ-ÿÑñ]+$/, "Solo se admiten letras para el apellido"),
    birthDate: yup
      .string()
      .required("La fecha de nacimiento es requerida")
      .matches(
        /^[0-9-]{5}[0-9-]{3}[0-9]{2}$/,
        "La fecha no es valida. Ejemplo: 2000-06-15"
      ),
    phoneNumber: yup
      .string()
      .required("El teléfono es requerido")
      .matches(/^[0-9]*$/, "Solo se admiten números")
      .min(10, "Debes introducir al menos 10 digitos")
      .max(10, "Solo se admiten 10 digitos"),
    email: yup
      .string()
      .email("El correo no es valido")
      .required("El correo es requerido"),
    password: yup.string().required("La contraseña es requerida"),
    curp: yup
      .string()
      .required("El CURP es requerido")
      .matches(
        /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[HM]{1}(AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[A-Z]{3}[A-Z\d]{1}\d{1}$/,
        "El CURP no es valido"
      ),
    gender: yup.string().required("El género es requerido"),
    status: yup.string().required("El estatus de carrera es requerido"),
    identification: yup.string().required("La boleta es requerida"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const validForm = async () => {
    const result = await methods.trigger([
      "name",
      "lastName",
      "birthDate",
      "phoneNumber",
      "email",
      "password",
      "curp",
      "gender",
      "status",
      "identification",
    ]);
    return result;
  };

  const submit: SubmitHandler<RegisterFormFields> = async ({
    name,
    lastName,
    birthDate,
    phoneNumber,
    email,
    password,
    curp,
    gender,
    status,
    identification,
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
      .post("/alta_estudiante", {
        userName: name,
        userApellido: lastName,
        userBirthDate: birthDate,
        userPhone: phoneNumber,
        userEmail: email,
        userPass: password,
        userCurp: curp,
        userSexoId: gender,
        userEstatusCarreraId: status,
        userBoleta: identification,
      })
      .then((data) => {
        console.log("success", data);

        MySwal.fire({
          icon: "success",
          title: data.data,
          text: "Ya puedes ingresar a tu cuenta",
          timer: 3000,
          showConfirmButton: false,
          didClose: () => {
            navigate("/login");
          },
        });
      })
      .catch((error) => {
        console.log("error", error);

        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error en el registro",
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

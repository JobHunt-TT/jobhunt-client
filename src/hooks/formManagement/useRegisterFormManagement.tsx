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
  gender: string;
  status: string;
  fechaTermino?: string;
  cedula?: string;
  porcentajeCursado?: string;
  fechaTentativaTermino?: string;
  curp?: string;
  identification?: string;
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
  fechaTermino: "",
  cedula: "",
  porcentajeCursado: "",
  fechaTentativaTermino: ""
};

export const useRegisterFormManagement = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("El nombre es requerido")
      .matches(/^[a-zA-ZÀ-ÿÑñ ]+$/, "Solo se admiten letras para el nombre"),
    lastName: yup
      .string()
      .required("El apellido es requerido")
      .matches(/^[a-zA-ZÀ-ÿÑñ]+$/, "Solo se admiten letras para el apellido"),
    birthDate: yup
      .string()
      .required("La fecha de nacimiento es requerida")
      .matches(
        /^(1950|19[5-9]\d|200[0-6])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        "La fecha no es valida. Ejemplo: 2000-06-15"
      ),
    phoneNumber: yup
      .string()
      .required("El teléfono es requerido")
      .matches(/^[2-9]*$/, "Solo se admiten números")
      .min(10, "Debes introducir al menos 10 digitos")
      .max(10, "Solo se admiten 10 digitos"),
    email: yup
      .string()
      .email("El correo no es valido")
      .required("El correo es requerido")
      .matches(
        /^[a-z]+[0-9]{4}@(alumno\.ipn\.mx|egresado\.ipn\.mx)$/,
        "El formato del correo es incorrecto"
      ),
    password: yup.string().required("La contraseña es requerida"),
    gender: yup.string().required("El género es requerido"),
    status: yup.string().required("El estatus de carrera es requerido"),
    fechaTermino: yup.string().when("status", (status, schema) => {
      return (status as unknown as string) === "1" || (status as unknown as string) === "2"
        ? schema
            .required("La fecha de término es requerida")
            .matches(
              /^(1968|19[7-9]\d|20[01]\d|202[0-4])-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
              "La fecha no es válida. Ejemplo: 2000-06-15"
            )
        : schema.notRequired();
    }),
    cedula: yup.string().when("status", (status, schema) => {
      return (status as unknown as string) === "1"
        ? schema.required("La cédula es requerida")
          // Agregar expresión regular si se quiere validar un formato de cédula
          // .matches(
          //   /^[0-9-]{4}-[0-9]{2}-[0-9]{2}$/,
          //   "La cédula no es válida"
          // )
        : schema.notRequired();
    }),
    porcentajeCursado: yup.string().when("status", (status, schema) => {
      return (status as unknown as string) === "3" || (status as unknown as string) === "4"
        ? schema.required("El porcentaje cursado es requerido")
          .matches(
            /^(?:100|[1-9]\d|\d)$/,
            "Verifica el porcentaje cursado"
          )
        : schema.notRequired();
    }),
    fechaTentativaTermino: yup.string().when("status", (status, schema) => {
      return (status as unknown as string) === "4"
        ? schema
        .required("La fecha tentativa de término es requerida")
        .matches(
          /^202[4-9]|20[3-9]\d-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
          "La fecha no es válida. Ejemplo: 2000-06-15"
        )
        : schema.notRequired();
    }),
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
      "gender",
      "status",
      "fechaTermino",
      "cedula",
      "fechaTentativaTermino",
      "porcentajeCursado"
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
    fechaTermino,
    cedula,
    fechaTentativaTermino,
    porcentajeCursado
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
        userFechaTermino : fechaTermino,
        userFechaTentativaTermino : fechaTentativaTermino,
        userPorcentajeCursado : porcentajeCursado + "%",
        userCedula : cedula
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

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
  const schema = yup.object().shape({
    name: yup.string().required("El nombre es requerido"),
    lastName: yup.string().required("El nombre es requerido"),
    birthDate: yup.string().required("El nombre es requerido"),
    phoneNumber: yup.string().required("El nombre es requerido"),
    email: yup
      .string()
      .email("Formato de email incorrecto")
      .required("El email es requerido"),
    password: yup.string().required("El nombre es requerido"),
    curp: yup.string().required("El nombre es requerido"),
    gender: yup.string().required("El nombre es requerido"),
    status: yup.string().required("El nombre es requerido"),
    identification: yup.string().required("El nombre es requerido"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const submit: SubmitHandler<RegisterFormFields> = async (fields) => {
    console.log(fields);
  };

  return {
    methods,
    submit,
  };
};

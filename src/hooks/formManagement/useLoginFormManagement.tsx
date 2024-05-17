import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export interface LoginFormFields {
  email: string;
  password: string;
}

const defaultValues: LoginFormFields = {
  email: "",
  password: "",
};

export const useLoginFormManagement = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Formato de email incorrecto")
      .required("El email es requerido"),
    password: yup.string().required("El nombre es requerido"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const submit: SubmitHandler<LoginFormFields> = async (fields) => {
    console.log(fields);
  };

  return {
    methods,
    submit,
  };
};

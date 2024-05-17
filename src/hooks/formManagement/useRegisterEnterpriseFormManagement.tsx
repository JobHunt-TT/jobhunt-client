import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export interface RegisterEnterpriseFormFields {
  name: string;
  status: string;
  rfc: string;
}

const defaultValues: RegisterEnterpriseFormFields = {
  name: "",
  status: "",
  rfc: "",
};

export const useRegisterEnterpriseFormManagement = () => {
  const schema = yup.object().shape({
    name: yup.string().required("El nombre es requerido"),
    status: yup.string().required("El nombre es requerido"),
    rfc: yup.string().required("El nombre es requerido"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const submit: SubmitHandler<RegisterEnterpriseFormFields> = async (fields) => {
    console.log(fields);
  };

  return {
    methods,
    submit,
  };
};

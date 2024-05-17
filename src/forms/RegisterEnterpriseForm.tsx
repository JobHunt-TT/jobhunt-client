import { FormProvider } from "react-hook-form";

import { DataSelect, FormInput, FormSelect } from "../components";
import { useRegisterEnterpriseFormManagement } from "../hooks";

export const RegisterEnterpriseForm = () => {
  const dataTipo: DataSelect[] = [
    {
      label: "Tipo 1",
      value: "1",
    },
    {
      label: "Tipo 2",
      value: "2",
    },
    {
      label: "Tipo 3",
      value: "3",
    },
    {
      label: "Tipo 3",
      value: "4",
    },
  ];
  const { methods, submit } = useRegisterEnterpriseFormManagement();

  return (
    <FormProvider {...methods}>
      <div className="text-4xl font-bold">Regístrate</div>
      <form
        className="w-full px-4 my-14 grid grid-rows-2 gap-4 lg:w-1/4 lg:px-0"
        onSubmit={methods.handleSubmit(submit)}
      >
        <FormInput label="Nombre de la Empresa" name="name" />
        <FormSelect label="Estatus" data={dataTipo} name="status" />
        <FormInput label="RFC" name="rfc" />
        <button
          className="bg-black text-white py-3 rounded-md font-semibold"
          type="submit"
        >
          Registrar
        </button>
      </form>
    </FormProvider>
  );
};

import { FormProvider } from "react-hook-form";

import { DataSelect, FormInput, FormSelect } from "../components";
import { useRegisterFormManagement } from "../hooks";

export const RegisterForm = () => {
  const dataEstatus: DataSelect[] = [
    {
      label: "Titulado",
      value: "1",
    },
    {
      label: "Pasante",
      value: "2",
    },
    {
      label: "Carrera Trunca",
      value: "3",
    },
    {
      label: "Activo",
      value: "4",
    },
  ];
  const { methods, submit } = useRegisterFormManagement();

  return (
    <FormProvider {...methods}>
      <div className="text-4xl font-bold">Regístrate</div>
      <form
        className="w-full px-4 my-14 grid grid-rows-2 gap-4 lg:w-1/4 lg:px-0"
        onSubmit={methods.handleSubmit(submit)}
      >
        <FormInput label="Nombre" name="name" />
        <FormInput label="Apellido" name="lastName" />
        <FormInput
          label="Fecha de Nacimiento"
          name="birthDate"
         
        />
        <FormInput
          label="Número de Teléfono"
          name="phoneNumber"
         
        />
        <FormInput label="Correo" name="email" />
        <FormInput label="Contraseña" name="password" />
        <FormInput label="CURP" name="curp" />
        <FormInput label="Sexo" name="gender" />
        <FormSelect
          label="Estatus"
          data={dataEstatus}
          name="status"
         
        />
        <FormInput label="Boleta" name="identification" />
        <button className="bg-black text-white py-3 rounded-md font-semibold" type="submit">
          Registrar
        </button>
      </form>
    </FormProvider>
  );
};

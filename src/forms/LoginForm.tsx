import { FormProvider } from "react-hook-form";

import { FormInput } from "../components";
import { useLoginFormManagement } from "../hooks";

export const LoginForm = () => {
  const { methods, submit } = useLoginFormManagement();
  return (
    <FormProvider {...methods}>
      <div className="text-4xl font-bold">Ingresa tus datos</div>

      <form
        className="w-full px-4 my-14 grid grid-rows-2 gap-4 lg:w-1/4 lg:px-0"
        onSubmit={methods.handleSubmit(submit)}
      >
        <FormInput label="Correo" name="email" />
        <FormInput label="Contraseña" name="password" />
        <button
          className="bg-black text-white py-3 rounded-md font-semibold"
          type="submit"
        >
          Iniciar Sesión
        </button>
      </form>
    </FormProvider>
  );
};

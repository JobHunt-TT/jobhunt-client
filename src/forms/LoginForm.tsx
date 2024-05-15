import { FormInput } from "../components";

export const LoginForm = () => {
  return (
    <>
      <div className="text-4xl font-bold">Ingresa tus datos</div>
      <div className="w-full px-4 my-14 grid grid-rows-2 gap-4 lg:w-1/4 lg:px-0">
        <FormInput label="Correo" />
        <FormInput label="Contraseña" />
        <button className="bg-black text-white py-3 rounded-md font-semibold">
          Iniciar Sesión
        </button>
      </div>
    </>
  );
};

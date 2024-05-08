import { DataSelect, FormInput, FormSelect } from "../components";

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

  return (
    <>
      <div className="text-4xl font-bold">Regístrate</div>
      <div className="w-full px-4 my-14 grid grid-rows-2 gap-4 lg:w-1/4 lg:px-0">
        <FormInput label="Nombre" />
        <FormInput label="Apellido" />
        <FormInput label="Fecha de Nacimiento" />
        <FormInput label="Número de Teléfono" />
        <FormInput label="Correo" />
        <FormInput label="Contraseña" />
        <FormInput label="CURP" />
        <FormInput label="Sexo" />
        <FormSelect label="Estatus" data={dataEstatus} />
        <FormInput label="Boleta" />
        <button className="bg-black text-white py-3 rounded-md font-semibold">
          Registrar
        </button>
      </div>
    </>
  );
};

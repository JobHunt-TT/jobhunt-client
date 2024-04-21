import { DataSelect, FormInput, FormSelect } from "../components";

export const RegisterForm = () => {
  const dataArea: DataSelect[] = [
    {
      label: "Área 1",
      value: "1",
    },
    {
      label: "Área 2",
      value: "2",
    },
    {
      label: "Área 3",
      value: "3",
    },
    {
      label: "Área 4",
      value: "4",
    },
  ];

  const dataCarrera: DataSelect[] = [
    {
      label: "Carrera 1",
      value: "1",
    },
    {
      label: "Carrera 2",
      value: "2",
    },
    {
      label: "Carrera 3",
      value: "3",
    },
    {
      label: "Carrera 4",
      value: "4",
    },
  ];

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
      <div className="w-1/4 my-14 grid grid-rows-2 gap-4">
        <FormInput label="Nombre" />
        <FormInput label="Apellido Paterno" />
        <FormInput label="Apellido Materno" />
        <FormInput label="Correo" />
        <FormInput label="Número de Teléfono" />
        <FormInput label="CURP" />
        <FormInput label="Edad" />
        <FormInput label="Sexo" />
        <FormSelect label="Área de Carrera" data={dataArea} />
        <FormSelect label="Carrera" data={dataCarrera} />
        <FormSelect label="Estatus" data={dataEstatus} />
        <FormInput label="Estado de Residencia" />
        <FormInput label="Cédula" />
        <button className="bg-black text-white py-3 rounded-md font-semibold">
          Registrar
        </button>
      </div>
    </>
  );
};

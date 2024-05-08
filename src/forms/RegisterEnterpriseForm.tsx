import { DataSelect, FormInput, FormSelect } from "../components";

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

  return (
    <>
      <div className="text-4xl font-bold">Regístrate</div>
      <div className="w-full px-4 my-14 grid grid-rows-2 gap-4 lg:w-1/4 lg:px-0">
        <FormInput label="Nombre de la Empresa" />
        <FormSelect label="Estatus" data={dataTipo} />
        <FormInput label="RFC" />
        <button className="bg-black text-white py-3 rounded-md font-semibold">
          Registrar
        </button>
      </div>
    </>
  );
};

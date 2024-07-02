import { FormProvider } from "react-hook-form";
import { AlertNotification, FormSelect } from "../components";
import { useEffect, useState } from "react";
import { useCarreraManagement } from "../hooks/formManagement/useCarreraManagement";

interface Option {
  value: string;
  label: string;
  id: number; // Agregamos el id
}

export const CarreraForm = () => {
  const [errorsForm, setErrorsForm] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [carrerasOptions, setCarrerasOptions] = useState<Option[]>([]);
  const { methods, validForm, submit } = useCarreraManagement();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleShowNotification = () => {
    setShowNotification(true);
  };

  const handleHideNotification = () => {
    setShowNotification(false);
  };

  const setErrors = () => {
    const errorsTemp: string[] = [];

    if (!!errors.Carrera && !!errors.Carrera.message) {
      errorsTemp.push(errors.Carrera.message);
    }

    setErrorsForm(errorsTemp);
  };

  useEffect(setErrors, [errors]);

  useEffect(() => {
    // Cargar carreras desde el localStorage
    const storedCarreras = localStorage.getItem("carreras_select");
    if (storedCarreras) {
      const carrerasArray = JSON.parse(storedCarreras);
      const options = carrerasArray.map((carrera: { id: number; carreraNombre: string }) => ({
        value: carrera.carreraNombre,
        label: carrera.carreraNombre,
        id: carrera.id, // Agregamos el id
      }));
      setCarrerasOptions(options);
    }
  }, []);

  const handleFormSubmit = async (data: any) => {
    const selectedCarrera = carrerasOptions.find(option => option.value === data.Carrera);
    if (selectedCarrera) {
      console.log("Selected carrera", selectedCarrera);

      await submit({ Carrera: selectedCarrera.id.toString() });
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="text-4xl font-bold mt-5">Agregar Carrera</div>
      <form
        className="w-full px-4 mt-8 mb-6 grid grid-rows-2 gap-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <FormSelect
          label="Carrera"
          name="Carrera"
          options={carrerasOptions}
        />
        <button
          className="col-span-2 bg-black text-white py-3 rounded-md font-semibold"
          onClick={async () => {
            setErrorsForm([]);
            const isValid = await validForm();
            if (!isValid) {
              if (!!errors.Carrera) {
                setErrors();
              }
              handleShowNotification();
            }
          }}
        >
          Agregar
        </button>
      </form>

      <AlertNotification
        show={showNotification}
        title="Error"
        message={errorsForm}
        onClose={handleHideNotification}
      />
    </FormProvider>
  );
};

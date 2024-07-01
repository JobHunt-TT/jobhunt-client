import { FormProvider } from "react-hook-form";
import { AlertNotification, FormSelect } from "../components";
import { useEffect, useState } from "react";
import { useCarreraManagement } from "../hooks/formManagement/useCarreraManagement";

export const CarreraForm = () => {
  const [errorsForm, setErrorsForm] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
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

  return (
    <FormProvider {...methods}>
      <div className="text-4xl font-bold mt-5">Agregar Carrera</div>
      <form
        className="w-full px-4 mt-8 mb-6 grid grid-rows-2 gap-4"
        onSubmit={handleSubmit(submit)}
      >
        <FormSelect
          label="Carrera"
          name="Carrera"
          options={[
            { value: "Carrera1", label: "Carrera1" },
            { value: "Carrera2", label: "Carrera2" },
            { value: "Carrera3", label: "Carrera3" },
          ]}
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

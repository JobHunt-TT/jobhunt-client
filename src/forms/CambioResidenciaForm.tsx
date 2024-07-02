import { FormProvider } from "react-hook-form";
import { AlertNotification, FormSelect } from "../components";
import { useEffect, useState } from "react";
import { useCambioResidenciaManagement } from "../hooks/formManagement/useCambioResidenciaManagement";

export const CambioResidenciaForm = () => {
  const [errorsForm, setErrorsForm] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const { methods, validForm, submit } = useCambioResidenciaManagement();
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

    if (!!errors.cambioResidencia && !!errors.cambioResidencia.message) {
      errorsTemp.push(errors.cambioResidencia.message);
    }

    setErrorsForm(errorsTemp);
  };

  useEffect(setErrors, [errors]);

  return (
    <FormProvider {...methods}>
      <div className="text-4xl font-bold mt-5">Cambio de Residencia</div>
      <form
        className="w-full px-4 mt-8 mb-6 grid grid-rows-2 gap-4"
        onSubmit={handleSubmit(submit)}
      >
        <FormSelect
          label="¿Está dispuesto a cambiar de residencia?"
          name="cambioResidencia"
          options={[
            { value: "1", label: "Sí" },
            { value: "0", label: "No" },
          ]}
        />
        <button
          className="col-span-2 bg-black text-white py-3 rounded-md font-semibold"
          onClick={async () => {
            setErrorsForm([]);
            const isValid = await validForm();
            if (!isValid) {
              if (!!errors.cambioResidencia) {
                setErrors();
              }
              handleShowNotification();
            }
          }}
        >
          Enviar
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

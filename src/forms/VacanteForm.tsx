import { FormProvider } from "react-hook-form";
import { AlertNotification, FormInput } from "../components";
import { useEffect, useState } from "react";
import { useVacanteFormManagement } from "../hooks";

export const VacanteForm = () => {
  const [errorsForm, setErrorsForm] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const { methods, validForm, submit } = useVacanteFormManagement();
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

    if (!!errors.nombreVacante && !!errors.nombreVacante.message) {
      errorsTemp.push(errors.nombreVacante.message);
    }

    if (!!errors.descripcionVacante && !!errors.descripcionVacante.message) {
      errorsTemp.push(errors.descripcionVacante.message);
    }

    console.log(errorsTemp);

    setErrorsForm(errorsTemp);
  };

  useEffect(setErrors, [errors]);
  return(
    <FormProvider {...methods}>
      <div className="text-4xl font-bold mt-5">Crear Vacante</div>

      <form
        className="w-full px-4 mt-8 mb-6 grid grid-rows-2 gap-4"
        onSubmit={handleSubmit(submit)}
      >
        <FormInput label="Nombre" name="nombreVacante" />
        <FormInput label="Descripción" name="descripcionVacante" />
        <button
          className="col-span-2 bg-black text-white py-3 rounded-md font-semibold"
          onClick={async () => {
            console.log('Se manda');
            
            setErrorsForm([]);
            const isValid = await validForm();
            if (!isValid) {
              if (!!errors.nombreVacante || !!errors.descripcionVacante) {
                setErrors();
              }
              handleShowNotification();
            }
          }}
        >
          Crear Vacante
        </button>
      </form>

      <AlertNotification
        show={showNotification}
        title="Error"
        message={errorsForm}
        onClose={handleHideNotification}
      />
    </FormProvider>
  )
}
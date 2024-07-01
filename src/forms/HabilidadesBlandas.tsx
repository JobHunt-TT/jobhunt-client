import { FormProvider } from "react-hook-form";
import { AlertNotification, FormInput } from "../components";
import { useEffect, useState } from "react";
import { useHabilidadesBlandasManagement } from "../hooks/formManagement/useHabilidadesBlandasManagement";

export const HabilidadesBlandasForm = () => {
  const [errorsForm, setErrorsForm] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const { methods, validForm, submit } = useHabilidadesBlandasManagement();/*AQUÍ*/
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

    if (!!errors.descripcion && !!errors.descripcion.message) {
      errorsTemp.push(errors.descripcion.message);
    }

    console.log(errorsTemp);

    setErrorsForm(errorsTemp);
  };

  useEffect(setErrors, [errors]);

  return(
    
    <FormProvider {...methods}>
      <div className="text-4xl font-bold mt-5">Agregar</div>
      <div className="text-4xl font-bold mt-5">HabilidadesBlandas </div>
      <form
        className="w-full px-4 mt-8 mb-6 grid grid-rows-2 gap-4"
        onSubmit={handleSubmit(submit)}
      >
        <FormInput label="Nombre de la Habilidad" name="descripcion" />
        <button
          className="col-span-2 bg-black text-white py-3 rounded-md font-semibold"
          onClick={async () => {
            setErrorsForm([]);
            const isValid = await validForm();
            if (!isValid) {
              if (!!errors.descripcion) {
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
  )
}
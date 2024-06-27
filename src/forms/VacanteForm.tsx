import { FormProvider } from "react-hook-form";
import { AlertNotification, FormInput, FormMultiTagInput } from "../components";
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

    if (!!errors.nombreOferta && !!errors.nombreOferta.message) {
      errorsTemp.push(errors.nombreOferta.message);
    }

    if (!!errors.vigencia && !!errors.vigencia.message) {
      errorsTemp.push(errors.vigencia.message);
    }

    if (!!errors.duracionContrato && !!errors.duracionContrato.message) {
      errorsTemp.push(errors.duracionContrato.message);
    }

    if (!!errors.duracionContrato && !!errors.duracionContrato.message) {
      errorsTemp.push(errors.duracionContrato.message);
    }

    if (!!errors.salario && !!errors.salario.message) {
      errorsTemp.push(errors.salario.message);
    }

    if (!!errors.tags && !!errors.tags.message) {
      errorsTemp.push(errors.tags.message);
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
        <FormInput label="Nombre de la Oferta" name="nombreOferta" />
        <FormInput label="Vigencia" name="vigencia" type="date" />
        <FormInput label="Duración de Contrato" name="duracionContrato" />
        <FormInput label="Nombre del Puesto" name="nombrePuesto" />
        <FormInput label="Salario" name="salario" />
        <FormMultiTagInput label="Tags" name="tags" />
        <button
          className="col-span-2 bg-black text-white py-3 rounded-md font-semibold"
          onClick={async () => {
            setErrorsForm([]);
            const isValid = await validForm();
            if (!isValid) {
              if (!!errors.nombreOferta || !!errors.vigencia || !!errors.duracionContrato || !!errors.nombrePuesto || !!errors.salario || !!errors.tags) {
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
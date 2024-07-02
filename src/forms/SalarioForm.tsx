import { FormProvider } from "react-hook-form";
import { AlertNotification, FormSelect } from "../components";
import { useEffect, useState } from "react";
import { useSalarioManagement } from "../hooks/formManagement/useSalarioManagement";

export const SalarioForm = () => {
  const [errorsForm, setErrorsForm] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const { methods, validForm, submit } = useSalarioManagement();
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

    if (!!errors.salario && !!errors.salario.message) {
      errorsTemp.push(errors.salario.message);
    }

    setErrorsForm(errorsTemp);
  };

  useEffect(setErrors, [errors]);

  return (
    <FormProvider {...methods}>
      <div className="text-4xl font-bold mt-5">Salario</div>
      <form
        className="w-full px-4 mt-8 mb-6 grid grid-rows-2 gap-4"
        onSubmit={handleSubmit(submit)}
      >
        <FormSelect
          label="Salario"
          name="salario"
          options={[
            { value: "primero", label: "Menos de $5,000.00 mxn" },
            { value: "segundo", label: "$5,001.00 mxn - $10,000.00 mxn" },
            { value: "tercero", label: "$10,001.00 mxn - $20,000.00 mxn" },
            { value: "cuarto", label: "$20,001.00 mxn - $30,000.00 mxn" },
            { value: "quinto", label: "$30,001.00 mxn - $40,000.00 mxn" },
            { value: "sexto", label: "Más de $40,000.00 mxn" },
          ]}
        />
        <button
          className="col-span-2 bg-black text-white py-3 rounded-md font-semibold"
          onClick={async () => {
            setErrorsForm([]);
            const isValid = await validForm();
            if (!isValid) {
              if (!!errors.salario) {
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

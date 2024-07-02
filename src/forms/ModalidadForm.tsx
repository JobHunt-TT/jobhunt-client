import { FormProvider } from "react-hook-form";
import { AlertNotification, FormSelect } from "../components";
import { useEffect, useState } from "react";
import { useModalidadManagement } from "../hooks/formManagement/useModalidadManagement";

export const ModalidadForm = () => {
  const [errorsForm, setErrorsForm] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const { methods, validForm, submit } = useModalidadManagement();
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

    if (!!errors.modalidad && !!errors.modalidad.message) {
      errorsTemp.push(errors.modalidad.message);
    }

    setErrorsForm(errorsTemp);
  };

  useEffect(setErrors, [errors]);

  return (
    <FormProvider {...methods}>
      <div className="text-4xl font-bold mt-5">Modalidad</div>
      <form
        className="w-full px-4 mt-8 mb-6 grid grid-rows-2 gap-4"
        onSubmit={handleSubmit(submit)}
      >
        <FormSelect
          label="Modalidad"
          name="modalidad"
          options={[
            { value: "Presencial", label: "Presencial" },
            { value: "Hibrida", label: "Híbrida" },
            { value: "Remoto", label: "Remoto" },
            { value: "Indistinto", label: "Indistinto" },
          ]}
        />
        <button
          className="col-span-2 bg-black text-white py-3 rounded-md font-semibold"
          onClick={async () => {
            setErrorsForm([]);
            const isValid = await validForm();
            if (!isValid) {
              if (!!errors.modalidad) {
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

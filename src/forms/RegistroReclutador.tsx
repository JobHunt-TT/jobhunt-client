import { FormProvider } from "react-hook-form";
import { AlertNotification, FormInput } from "../components";
import { useEffect, useState } from "react";
import { useEncargadoManagement } from "../hooks";

export const RegistroReclutador = () => {
  const [errorsForm, setErrorsForm] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const { methods, validForm, submit } = useEncargadoManagement();
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
    if (!!errors.userApellido && !!errors.userApellido.message) {
      errorsTemp.push(errors.userApellido.message);
    }
    if (!!errors.userCargo && !!errors.userCargo.message) {
      errorsTemp.push(errors.userCargo.message);
    }
    if (!!errors.userContrasena && !!errors.userContrasena.message) {
      errorsTemp.push(errors.userContrasena.message);
    }
    if (!!errors.userName && !!errors.userName.message) {
      errorsTemp.push(errors.userName.message);
    }
    if (!!errors.userEmail && !!errors.userEmail.message) {
      errorsTemp.push(errors.userEmail.message);
    }
    setErrorsForm(errorsTemp);
  };

  useEffect(setErrors, [errors]);

  return (
    <FormProvider {...methods}>
      <div className="text-4xl font-bold mt-5">Registro de Reclutador</div>
      <form
        className="w-full px-4 mt-8 mb-6 grid grid-rows-2 gap-4"
        onSubmit={handleSubmit(submit)}
      >
        
        <FormInput label="Nombre" name="userName" />
          <FormInput label="Apellido" name="userApellido" />
          <FormInput label="Teléfono" name="userPhone" />
          <FormInput label="Correo" name="userEmail" />
          <FormInput label="Cargo" name="userCargo" />
          <FormInput label="Contraseña" name="userContrasena" type="password" />
        <button
          className="col-span-2 bg-black text-white py-3 rounded-md font-semibold"
          onClick={async () => {
            setErrorsForm([]);
            const isValid = await validForm();
            if (!isValid) {
              if (!!errors.userApellido || !!errors.userCargo || !!errors.userContrasena || !!errors.userName || !!errors.userPhone || !!errors.userEmail) {
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

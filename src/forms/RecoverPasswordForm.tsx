import { FormProvider } from "react-hook-form";

import { AlertNotification, FormInput } from "../components";
import { useRecoverPasswordManagement } from "../hooks";
import { useEffect, useState } from "react";

export const RecoverPasswordForm = () => {
  const [errorsForm, setErrorsForm] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const { methods, validForm, submit } = useRecoverPasswordManagement();
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

    if (!!errors.email && !!errors.email.message) {
      errorsTemp.push(errors.email.message);
    }

    console.log(errorsTemp);

    setErrorsForm(errorsTemp);
  };

  useEffect(setErrors, [errors]);
  return(
    <FormProvider {...methods}>
      <div className="text-4xl font-bold">Ingresa tus datos</div>

      <form
        className="w-full px-4 my-14 grid grid-rows-2 gap-4 lg:w-1/4 lg:px-0"
        onSubmit={handleSubmit(submit)}
      >
        <FormInput label="Correo" name="email" />
        <button
          className="col-span-2 bg-black text-white py-3 rounded-md font-semibold"
          onClick={async () => {
            setErrorsForm([]);
            const isValid = await validForm();
            if (!isValid) {
              if (!!errors.email) {
                setErrors();
              }
              handleShowNotification();
            }
          }}
        >
          Recuperar Contraseña
        </button>
        {/* <div className="text-center col-span-2 mt-2">
          <div className="h-1 border-t-[1px] border-gray-400"></div>
          <div className="mt-3">
            ¿No tienes cuenta? -&nbsp;
            <Link to="/register" className="font-semibold">
              Regístrate como alumno
            </Link>
          </div>
          <div>o</div>
          <div>
            <Link to="/registerEnterprise" className="font-semibold">
              Regístrate como empresa
            </Link>
          </div>
        </div> */}
        
        {/* <div className="text-center col-span-2">
        <div className="h-1 border-t-[1px] border-gray-400"></div>
        <div className="mt-3">
            ¿Olvidaste tu contraseña? -&nbsp;
            <Link to="/recoverPassword" className="font-semibold">
              Recupera tu contraseña
            </Link>
          </div>
        </div> */}
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
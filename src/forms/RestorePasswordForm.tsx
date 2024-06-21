import axios from "axios";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faLock } from "@fortawesome/free-solid-svg-icons";

import {
  AlertNotification,
  DataSelect,
  FormInput,
  // FormSelect,
} from "../components";
import { useRestorePasswordFormManagement } from "../hooks";

interface TipoEmpresa {
  id: number;
  alias: string;
  descripcion: string;
}

export const RestorePasswordForm = () => {
  // const [dataTipo, setDataTipo] = useState<DataSelect[]>([]);
  const [errorsForm, setErrorsForm] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const { methods, validStep1, validStep2, submit } =
    useRestorePasswordFormManagement();
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

    if (!!errors.codeUser && !!errors.codeUser.message) {
      errorsTemp.push(errors.codeUser.message);
    }

    if (!!errors.passwordUser && !!errors.passwordUser.message) {
      errorsTemp.push(errors.passwordUser.message);
    }

    if (!!errors.confirmPasswordUser && !!errors.confirmPasswordUser.message) {
      errorsTemp.push(errors.confirmPasswordUser.message);
    }

    console.log(errorsTemp);

    setErrorsForm(errorsTemp);
  };

  useEffect(setErrors, [errors]);

  useEffect(() => {
    axios
      .post("/consulta_tipo_empresa")
      .then((data) => {
        const catalogEnterprise: DataSelect[] = [];

        const array = data.data as TipoEmpresa[];

        for (let index = 0; index < array.length; index++) {
          const { id, descripcion } = array[index];
          const tipo: DataSelect = {
            label: descripcion,
            value: id.toString(),
          };
          catalogEnterprise.push(tipo);
        }
        // setDataTipo(catalogEnterprise);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <FormProvider {...methods}>
      <div className="text-4xl font-bold">Restablecer Contraseña</div>
      <div className="flex flex-row justify-center items-center my-10">
        <div className="w-14 h-14 flex justify-center items-center rounded-full border-2 border-politectico">
          <FontAwesomeIcon
            icon={faKey}
            className={`text-2xl text-politectico`}
          />
        </div>
        <div className="w-24 h-[0.18rem] bg-gray-400">
          <div
            className={`bg-politectico h-full transition-width-step duration-500 ease-in-out ${
              step >= 2 ? "w-full" : "w-0"
            }`}
          ></div>
        </div>
        <div
          className={`w-14 h-14 flex justify-center items-center rounded-full border-2 transition-border-step ease-in-out ${
            step >= 2
              ? "delay-500 border-politectico"
              : "duration-100 border-gray-400"
          }`}
        >
          <FontAwesomeIcon
            icon={faLock}
            className={`text-2xl transition-color-step ease-in-out ${
              step >= 2
                ? "delay-500 text-politectico"
                : "duration-100 text-gray-400"
            }`}
          />
        </div>
      </div>
      <form
        className="w-full mb-14 px-4 lg:w-1/4 lg:px-0"
        onSubmit={handleSubmit(submit)}
      >
        <div
          className={`${
            step === 1 ? "block" : "hidden"
          } grid grid-cols-2 gap-4`}
        >
          <FormInput label="Código de Verificación" name="codeUser" />
          <button
            className="col-span-2 bg-black text-white py-3 rounded-md font-semibold"
            onClick={async (e) => {
              e.preventDefault();
              setErrorsForm([]);
              const isValid = await validStep1();
              if (isValid) {
                setStep(step + 1);
              } else {
                if (
                  !!errors.codeUser
                ) {
                  setErrors();
                }
                handleShowNotification();
              }
            }}
          >
            Siguiente
          </button>
        </div>
        <div
          className={`${
            step === 2 ? "block" : "hidden"
          } grid grid-cols-2 gap-4`}
        >
          <FormInput label="Nueva Contraseña" name="passwordUser" type="password" />
          <FormInput label="Confirmar Contraseña" name="confirmPasswordUser" type="password" />
          <button
            className="bg-white text-black border-2 border-black py-3 rounded-md font-semibold"
            onClick={(e) => {
              e.preventDefault();
              setStep(step - 1);
            }}
          >
            Anterior
          </button>
          <button
            className="bg-black text-white py-3 rounded-md font-semibold"
            onClick={async (e) => {
              setErrorsForm([]);
              const isValid = await validStep2();
              if (!isValid) {
                if (
                  !!errors.passwordUser ||
                  !!errors.confirmPasswordUser 
                ) {
                  setErrors();
                }
                handleShowNotification();
              }
            }}
          >
            Restablecer Contraseña
          </button>
        </div>
      </form>

      <AlertNotification
        show={showNotification}
        title="Error"
        message={errorsForm}
        onClose={handleHideNotification}
      />
    </FormProvider>
  );
}
import axios from "axios";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";

import {
  AlertNotification,
  FormInput,
  FormSelect,
} from "../components";
import { useRegisterEnterpriseFormManagement } from "../hooks";
import { DataSelect, TipoEmpresa } from "../types";

export const RegisterEnterpriseForm = () => {
  const [dataTipo, setDataTipo] = useState<DataSelect[]>([]);
  const [errorsForm, setErrorsForm] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const { methods, validStep1, validStep2, submit } =
    useRegisterEnterpriseFormManagement();
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

    if (!!errors.nameEnterprise && !!errors.nameEnterprise.message) {
      errorsTemp.push(errors.nameEnterprise.message);
    }

    if (!!errors.statusEnterprise && !!errors.statusEnterprise.message) {
      errorsTemp.push(errors.statusEnterprise.message);
    }

    if (!!errors.rfcEnterprise && !!errors.rfcEnterprise.message) {
      errorsTemp.push(errors.rfcEnterprise.message);
    }

    if (!!errors.emailEnterprise && !!errors.emailEnterprise.message) {
      errorsTemp.push(errors.emailEnterprise.message);
    }

    if (!!errors.phoneEnterprise && !!errors.phoneEnterprise.message) {
      errorsTemp.push(errors.phoneEnterprise.message);
    }

    if (!!errors.nameUser && !!errors.nameUser.message) {
      errorsTemp.push(errors.nameUser.message);
    }

    if (!!errors.lastNameUser && !!errors.lastNameUser.message) {
      errorsTemp.push(errors.lastNameUser.message);
    }

    if (!!errors.phoneUser && !!errors.phoneUser.message) {
      errorsTemp.push(errors.phoneUser.message);
    }

    if (!!errors.emailUser && !!errors.emailUser.message) {
      errorsTemp.push(errors.emailUser.message);
    }

    if (!!errors.cargoUser && !!errors.cargoUser.message) {
      errorsTemp.push(errors.cargoUser.message);
    }

    if (!!errors.passwordUser && !!errors.passwordUser.message) {
      errorsTemp.push(errors.passwordUser.message);
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
        setDataTipo(catalogEnterprise);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <FormProvider {...methods}>
      <div className="text-4xl font-bold">Regístrate</div>
      <div className="flex flex-row justify-center items-center my-10">
        <div className="w-14 h-14 flex justify-center items-center rounded-full border-2 border-politectico">
          <FontAwesomeIcon
            icon={faBuilding}
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
            icon={faUserTie}
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
          <FormInput label="Nombre de la Empresa" name="nameEnterprise" />
          <FormSelect
            label="Giro Empresarial"
            data={dataTipo}
            name="statusEnterprise"
          />
          <FormInput label="RFC" name="rfcEnterprise" />
          <FormInput label="Correo" name="emailEnterprise" />
          <FormInput label="Teléfono" name="phoneEnterprise" />
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
                  !!errors.nameEnterprise ||
                  !!errors.statusEnterprise ||
                  !!errors.rfcEnterprise ||
                  !!errors.emailEnterprise ||
                  !!errors.phoneEnterprise
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
          <FormInput label="Nombre" name="nameUser" />
          <FormInput label="Apellido" name="lastNameUser" />
          <FormInput label="Teléfono" name="phoneUser" />
          <FormInput label="Correo" name="emailUser" />
          <FormInput label="Cargo" name="cargoUser" />
          <FormInput label="Contraseña" name="passwordUser" type="password" />
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
                  !!errors.nameUser ||
                  !!errors.lastNameUser ||
                  !!errors.phoneUser ||
                  !!errors.emailUser ||
                  !!errors.cargoUser ||
                  !!errors.passwordUser
                ) {
                  setErrors();
                }
                handleShowNotification();
              }
            }}
          >
            Registrar
          </button>
        </div>
        <div className="text-center col-span-2 mt-2">
          <div className="h-1 border-t-[1px] border-gray-400"></div>
          <div className="mt-3">
            Al registrarse en el sistema, usted esta de acuerdo con el&nbsp;
            <a
              href={require("../assets/Aviso de Privacidad.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold"
            >
              Aviso de Privacidad
            </a>
            &nbsp;y&nbsp;
            <a
              href={require("../assets/Términos y condiciones.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold"
            >
              Términos y Condiciones
            </a>
          </div>
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
};

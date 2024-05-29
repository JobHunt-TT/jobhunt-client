import { FormProvider } from "react-hook-form";

import {
  AlertNotification,
  DataSelect,
  FormInput,
  FormSelect,
} from "../components";
import { useRegisterFormManagement } from "../hooks";
import axios from "axios";
import { useEffect, useState } from "react";

interface EstatusCarrera {
  id: number;
  carreraDescripcion: string;
}

interface SexoUser {
  id: number;
  descripcion: string;
}

export const RegisterForm = () => {
  const [dataEstatusCarrera, setDataEstatusCarrera] = useState<DataSelect[]>(
    []
  );
  const [errorsForm, setErrorsForm] = useState<string[]>([]);
  const [dataSexoUser, setDataSexoUser] = useState<DataSelect[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const { methods, validForm, submit } = useRegisterFormManagement();
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

    if (!!errors.name && !!errors.name.message) {
      errorsTemp.push(errors.name.message);
    }

    if (!!errors.lastName && !!errors.lastName.message) {
      errorsTemp.push(errors.lastName.message);
    }

    if (!!errors.birthDate && !!errors.birthDate.message) {
      errorsTemp.push(errors.birthDate.message);
    }

    if (!!errors.phoneNumber && !!errors.phoneNumber.message) {
      errorsTemp.push(errors.phoneNumber.message);
    }

    if (!!errors.email && !!errors.email.message) {
      errorsTemp.push(errors.email.message);
    }

    if (!!errors.password && !!errors.password.message) {
      errorsTemp.push(errors.password.message);
    }

    if (!!errors.curp && !!errors.curp.message) {
      errorsTemp.push(errors.curp.message);
    }

    if (!!errors.gender && !!errors.gender.message) {
      errorsTemp.push(errors.gender.message);
    }

    if (!!errors.status && !!errors.status.message) {
      errorsTemp.push(errors.status.message);
    }

    if (!!errors.identification && !!errors.identification.message) {
      errorsTemp.push(errors.identification.message);
    }

    console.log(errorsTemp);

    setErrorsForm(errorsTemp);
  };

  useEffect(setErrors, [errors]);

  useEffect(() => {
    axios
      .post("/consulta_estatus_carrera")
      .then((data) => {
        const catalogEnterprise: DataSelect[] = [];

        const array = data.data as EstatusCarrera[];

        for (let index = 0; index < array.length; index++) {
          const { id, carreraDescripcion } = array[index];
          const tipo: DataSelect = {
            label: carreraDescripcion,
            value: id.toString(),
          };
          catalogEnterprise.push(tipo);
        }
        setDataEstatusCarrera(catalogEnterprise);
      })
      .catch((error) => {
        console.log("error", error);
      });

    axios
      .post("/consulta_sexo")
      .then((data) => {
        const catalogEnterprise: DataSelect[] = [];

        const array = data.data as SexoUser[];

        for (let index = 0; index < array.length; index++) {
          const { id, descripcion } = array[index];
          const tipo: DataSelect = {
            label: descripcion,
            value: id.toString(),
          };
          catalogEnterprise.push(tipo);
        }
        setDataSexoUser(catalogEnterprise);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <FormProvider {...methods}>
      <div className="text-4xl font-bold">Regístrate</div>
      <form
        className="w-full px-4 my-14 grid grid-rows-2 gap-4 lg:w-1/4 lg:px-0"
        onSubmit={handleSubmit(submit)}
      >
        <FormInput label="Nombre" name="name" />
        <FormInput label="Apellido" name="lastName" />
        <FormInput label="Fecha de Nacimiento" name="birthDate" />
        <FormInput label="Teléfono" name="phoneNumber" />
        <FormInput label="Correo" name="email" />
        <FormInput label="Contraseña" name="password" type="password" />
        <FormInput label="CURP" name="curp" />
        <FormSelect label="Género" data={dataSexoUser} name="gender" />
        <FormSelect label="Estatus" data={dataEstatusCarrera} name="status" />
        <FormInput label="Boleta" name="identification" />
        <button
          className="col-span-2 bg-black text-white py-3 rounded-md font-semibold"
          onClick={async () => {
            setErrorsForm([]);
            const isValid = await validForm();
            if (!isValid) {
              if (
                !!errors.name ||
                !!errors.lastName ||
                !!errors.birthDate ||
                !!errors.phoneNumber ||
                !!errors.email ||
                !!errors.password ||
                !!errors.curp ||
                !!errors.gender ||
                !!errors.status ||
                !!errors.identification
              ) {
                setErrors();
              }
              handleShowNotification();
            }
          }}
        >
          Registrar
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

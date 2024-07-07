import { FormProvider } from "react-hook-form";
import { AlertNotification, FormInput, FormSelect } from "../components";
import { useEffect, useState } from "react";
import { DireccionFormFields, useDireccionFormManagement } from "../hooks";
import axios from "axios";
import { Estados } from "../types";

interface DireccionFormProps {
  type: "alumno" | "empresa" | "oferta";
}

export const DireccionForm = ({ type }: DireccionFormProps) => {
  const [errorsForm, setErrorsForm] = useState<string[]>([]);
  const [dataCPSelect, setDataCPSelect] = useState<any[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const { methods, validForm, submit } = useDireccionFormManagement();
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

  const handleColoniaChange = (selectedColonia: string) => {
    const selectedData = dataCPSelect.find(
      (item) => item.value === selectedColonia
    );
    if (selectedData) {
      methods.setValue("municipio", selectedData.municipio);
      methods.setValue("estado", selectedData.estado);
    }
  };

  const setErrors = () => {
    const errorsTemp: string[] = [];

    if (!!errors.cp && !!errors.cp.message) {
      errorsTemp.push(errors.cp.message);
    }

    if (!!errors.vialidad && !!errors.vialidad.message) {
      errorsTemp.push(errors.vialidad.message);
    }

    if (!!errors.noExt && !!errors.noExt.message) {
      errorsTemp.push(errors.noExt.message);
    }

    if (!!errors.noInt && !!errors.noInt.message) {
      errorsTemp.push(errors.noInt.message);
    }

    if (!!errors.colonia && !!errors.colonia.message) {
      errorsTemp.push(errors.colonia.message);
    }

    if (!!errors.municipio && !!errors.municipio.message) {
      errorsTemp.push(errors.municipio.message);
    }

    if (!!errors.estado && !!errors.estado.message) {
      errorsTemp.push(errors.estado.message);
    }

    if (!!errors.entreCalles && !!errors.entreCalles.message) {
      errorsTemp.push(errors.entreCalles.message);
    }

    console.log(errorsTemp);

    setErrorsForm(errorsTemp);
  };

  useEffect(setErrors, [errors]);

  useEffect(() => {
    methods.setValue("type", type);
  }, [type, methods]);

  return (
    <FormProvider {...methods}>
      <div className="text-4xl font-bold mt-5">Agregar Dirección</div>

      <form
        className="w-full px-4 mt-8 mb-6 grid grid-rows-2 gap-4"
        onSubmit={handleSubmit(submit)}
      >
        <FormInput label="CP" name="cp" />
        <FormInput label="Calle" name="vialidad" />
        <FormInput label="No. Ext." name="noExt" />
        <FormInput label="No. Int." name="noInt" />
        <FormInput label="Colonia" name="colonia" />
        <FormInput label="Municipio" name="municipio" />
        <FormSelect
          label="Estado"
          data={Estados}
          name="estado"
        />
        <FormInput label="Entre Calles" name="entreCalles" />
        <button
          className="col-span-2 bg-black text-white py-3 rounded-md font-semibold"
          onClick={async () => {
            setErrorsForm([]);
            const isValid = await validForm();
            if (!isValid) {
              if (
                !!errors.cp ||
                !!errors.vialidad ||
                !!errors.noExt ||
                !!errors.noInt ||
                !!errors.colonia ||
                !!errors.municipio ||
                !!errors.estado ||
                !!errors.entreCalles
              ) {
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
  );
};

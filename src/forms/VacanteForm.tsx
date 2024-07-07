import { FormProvider } from "react-hook-form";
import {
  AlertNotification,
  FormInput,
  FormMultiTagInput,
  FormSelect,
} from "../components";
import { useEffect, useState } from "react";
import { useVacanteFormManagement } from "../hooks";
import axios from "axios";
import { DataSelect, Estados, EstatusCarrera } from "../types";

export const VacanteForm = () => {
  const [errorsForm, setErrorsForm] = useState<string[]>([]);
  const [dataEstatusCarrera, setDataEstatusCarrera] = useState<DataSelect[]>(
    []
  );
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
  }, []);

  return (
    <FormProvider {...methods}>
      <div className="text-4xl font-bold mt-5">Crear Vacante</div>

      <form
        className="w-full px-4 mt-8 mb-6 grid grid-rows-2 gap-4"
        onSubmit={handleSubmit(submit)}
      >
        <FormInput label="Nombre de la Oferta" name="nombreOferta" />
        <FormInput label="Nombre del Puesto" name="nombrePuesto" />

        <FormInput label="Vigencia" name="vigencia" type="date" />
        <FormInput label="Duración de Contrato" name="duracionContrato" />
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
        <FormSelect
          label="Horario"
          name="horario"
          options={[
            { value: "Medio Turno Matutino", label: "Medio Turno Matutino" },
            {
              value: "Medio Turno Vespertino",
              label: "Medio Turno Vespertino",
            },
            { value: "Tiempo Completo", label: "Tiempo Completo" },
          ]}
        />
        <FormSelect
          label="Modalidad"
          name="modalidad"
          options={[
            { value: "presencial", label: "Presencial" },
            { value: "hibrida", label: "Híbrida" },
            { value: "remoto", label: "Remoto" },
            { value: "indistinto", label: "Indistinto" },
          ]}
        />
        <FormSelect
          label="Estado"
          data={Estados}
          name="estado"
        />
        <FormSelect
          label="Estatus del Alumno"
          data={dataEstatusCarrera}
          name="estatus"
        />
        <FormMultiTagInput label="Habilidades" name="habilidades" />
        <FormMultiTagInput label="Idiomas" name="idiomas" />
        <div className="font-bold text-center">Experiencia Laboral</div>
        <FormInput label="Puesto Deseable" name="puestoDeseable" />
        <FormInput label="Tiempo" name="tiempo" />
        <button
          className="col-span-2 bg-black text-white py-3 rounded-md font-semibold"
          onClick={async () => {
            setErrorsForm([]);
            const isValid = await validForm();
            if (!isValid) {
              if (
                !!errors.nombreOferta ||
                !!errors.vigencia ||
                !!errors.duracionContrato ||
                !!errors.nombrePuesto ||
                !!errors.salario ||
                !!errors.tags
              ) {
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
  );
};

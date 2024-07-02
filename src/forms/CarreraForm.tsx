import { FormProvider } from "react-hook-form";
import { AlertNotification, FormSelect } from "../components";
import { CarreraSelectForm } from "../components/form-inputs/CarreraSelect";
import { useEffect, useState } from "react";
import { DataUser, SkillUser } from "../types";
import { useCarreraManagement } from "../hooks/formManagement/useCarreraManagement";
import axios from "axios";

const INITIAL_STATE: DataUser = {
  cedula_Profesional: "",
  direccion: "",
  direccionId: 0,
  estatusCarrera: "",
  fechaEgreso: "",
  id: 0,
  porcentaje_Cursado: "",
  sexo: "",
  userApellido: "",
  userBirthDate: "",
  userBoleta: null,
  userCurp: "",
  userEmail: null,
  userEstatusCarreraId: 0,
  userName: "",
  userPass: "",
  userPhone: "",
  userSexoId: 0,
};

export const CarreraForm = () => {
  const [errorsForm, setErrorsForm] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [user, setUser] = useState(INITIAL_STATE);
  const [userCarrera, setuserCarrera] = useState<any>(null);
  const { methods, validForm, submit } = useCarreraManagement();
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

    if (!!errors.Carrera && !!errors.Carrera.message) {
      errorsTemp.push(errors.Carrera.message);
    }

    setErrorsForm(errorsTemp);
  };

  
  useEffect(() => {
    axios
      .post("/consulta_estudiante", {
        id: localStorage.getItem("idUser"),
      })
      .then((data) => {
        setUser(data.data);
        console.log("Estudiante",data);
      })
      .catch((error) => {
        console.log("error", error);
      });

    axios
      .post("/consulta_carreras", {
        id: localStorage.getItem("idUser"),
      })
      .then((data) => {
        setuserCarrera(data.data[0]);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);


  useEffect(setErrors, [errors]);

  return (
    <FormProvider {...methods}>
      <div className="text-4xl font-bold mt-5">Agregar Carrera</div>
      <form
        className="w-full px-4 mt-8 mb-6 grid grid-rows-2 gap-4"
        onSubmit={handleSubmit(submit)}
      >
         <pre className="text-center">
                <CarreraSelectForm
                  userCarrera={userCarrera}
                  carreraUserId={user.id}
                  user
                />
              </pre>
        <button
          className="col-span-2 bg-black text-white py-3 rounded-md font-semibold"
          onClick={async () => {
            setErrorsForm([]);
            const isValid = await validForm();
            if (!isValid) {
              if (!!errors.Carrera) {
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

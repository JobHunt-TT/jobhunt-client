import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ActividadesExtracurricularesForm } from "../forms/Actividades";
import { ContentLayout } from "../layouts";
import { ExperienciaLaboralForm } from "../forms/ExperienciaLaboral";
import { HorarioForm } from "../forms/HorarioForm";
import { CambioResidenciaForm } from "../forms/CambioResidenciaForm";
import { ModalidadForm } from "../forms/ModalidadForm";
import { SkillForm } from "../forms";
import { CarreraForm } from "../forms/CarreraForm";
import {
  faInstagram,
  faSquareFacebook,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { DataUser, SkillUser } from "../types";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { CardAddress, CardUserInfo } from "../components";
import { string } from "yup";

const MySwal = withReactContent(Swal);
var Residencia = "";
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

export const ProfilePage = () => {
  const [user, setUser] = useState(INITIAL_STATE);
  const [skillsUser, setSkillsUser] = useState<SkillUser[]>([]);
  const [cambioResidencia, setCambio] = useState<any>(null);
  const [horario, setHorario] = useState<any>(null);
  const [modalidad, setModalidad] = useState<any>(null);
  const [experienciaDes, setExperienciaDes] = useState<any>(null);
  const [experienciaFI, setExperienciaFI] = useState<any>(null);
  const [experienciaFF, setExperienciaFF] = useState<any>(null);
  const [experienciaNom, setExperienciaNom] = useState<any>(null);
  const [userCarrera, setUserCarrera] = useState<any>(null);

  useEffect(() => {
    axios
      .post("/consulta_estudiante", {
        id: localStorage.getItem("idUser"),
      })
      .then((data) => {
        setUser(data.data);
        setCambio(data.data.cambioResidencia);
        setHorario(data.data.jornada);
        setModalidad(data.data.modalidad);
        console.log("Estudiante",data);
      })
      .catch((error) => {
        console.log("error", error);
      });

      axios
      .post("/consulta_carrreras_alumno", {
        id: localStorage.getItem("idUser"),
      })
      .then((data) => {
        setUserCarrera(data.data[0].descripcion);
        console.log("carreraaaaa",data.data[0].descripcion);
      })
      .catch((error) => {
        console.log("error", error);
      });

      axios
      .post("/consulta_experiencia", {
        id: localStorage.getItem("idUser"),
      })
      .then((data) => {
        console.log("Experiencia",data);
        setExperienciaDes(data.data[0].descripcion);
        setExperienciaFI(data.data[0].fechaInicio);
        setExperienciaFF(data.data[0].fechaFin);
        setExperienciaNom(data.data[0].nombre);
      })
      .catch((error) => {
        console.log("error", error);
      });

    axios
      .post("/consulta_estudiante_tag", {
        id: localStorage.getItem("idUser"),
      })
      .then((data) => {
        setSkillsUser(data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });

  }, []);

  if(cambioResidencia == 1)
    Residencia = "Con disponibilidad de reubicación"
  else  
    Residencia = "Sin disponibilidad de reubicación"

  return (
    <ContentLayout>
      <div className="w-4/5 mx-auto py-16 grid-2">
        <div className="flex grid grid-cols-3  gap-6">
          <div className="col-span-1">
            <div className="bg-white rounded-md p-4">
              <img
                src="./img/Burrito.jpg"
                alt="Profile"
                width="200"
                height="200"
                className="block mx-auto my-5 rounded-full"
              />
              <div className="text-xl font-bold text-center">
                {user.userName} {user.userApellido}
              </div>

            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">Contacto</div>
              <div className="flex items-center mt-2">
                <FontAwesomeIcon icon={faEnvelope} className="text-lg mr-2" />
                <div>{user.userEmail}</div>
              </div>
              <div className="flex items-center mt-2">
                <FontAwesomeIcon icon={faPhone} className="text-lg mr-2" />
                <div>{user.userPhone}</div>
              </div>
              <div className="flex justify-center mt-2">
                <FontAwesomeIcon
                  icon={faSquareFacebook}
                  className="text-3xl text-facebook mx-2"
                />
                <FontAwesomeIcon
                  icon={faXTwitter}
                  className="text-3xl text-x-twitter mx-2"
                />
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-3xl text-instagram mx-2"
                />
              </div>
            </div>
            <CardAddress type="alumno" direccionID={user.direccionId} />
          </div>
        <div className="col-span-2 flex flex-col gap">
          <CardUserInfo
            titulo="Habilidades "
            data={skillsUser}
            formCreate={<SkillForm />}
            keyName="descripcion"
          />
          <div className="bg-white rounded-md p-4 mt-6">
            <CardUserInfo
              titulo="Experiencia Laboral"
              data={[]}
              datos={experienciaNom}
              datos2={experienciaFI} 
              datos3={experienciaFF}
              datos4={experienciaDes}
              formCreate={<ExperienciaLaboralForm />}
              keyName="descripcion"
            />
          </div>
          <div className="bg-white rounded-md p-4 mt-6">
            <CardUserInfo
              titulo="Horario"
              data={[]}
              datos={horario}
              formCreate={<HorarioForm />}
              keyName="descripcion"
            />
          </div>
          <div className="bg-white rounded-md p-4 mt-6">
            <CardUserInfo
              titulo="Cambio de Residencia"
              data={[]}
              datos= {Residencia}
              formCreate={<CambioResidenciaForm />}
              keyName="descripcion"
            />
          </div>
          <div className="bg-white rounded-md p-4 mt-6">
            <CardUserInfo
              titulo="Modalidad"
              data={[]}
              datos={modalidad}
              formCreate={<ModalidadForm />}
              keyName="descripcion"
            />
          </div>

          <div className="bg-white rounded-md p-4 mt-6">
            <CardUserInfo
              titulo="Carrera"
              data={[]}
              datos={userCarrera}
              formCreate={<CarreraForm/>}
              keyName="descripcion"
            />
          </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default ProfilePage;

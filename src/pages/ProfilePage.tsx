import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faSearch,
  faChevronLeft,
  faChevronRight,
  faBackwardStep,
  faForwardStep,
  faPen,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
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
import { Oferta } from "../types";
import {
  faInstagram,
  faSquareFacebook,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { DataUser, SkillUser, DataHeadTable } from "../types";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { CardAddress, CardUserInfo } from "../components";

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
  estatusId: 0,
  jornada: "",
};

const INITIAL_STATEOFER: Oferta = {
  ofertaId: 0,
  nombreOferta: "",
  empresaID: 0,
  nombreEmpresa: "",
  vigencia: "",
  duracionContrato: "",
  rangoEdad: 0,
  rangoExperiencia: 0,
  jornadaID: 0,
  jornadaString: 0,
  direccionId: 0,
  estatusId: 0,
  visibilidad: 0,
  nombrePuesto: "",
  salario: "",
  descripcion: "",
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
  const [isFocused3, setIsFocused3] = useState(false);
  const [dataAplicantes, setAplicantes] = useState<any>(null);
  const [dataVacante, setVacante] = useState<any>(null);
  const [dataVacante2, setVacante2] = useState(INITIAL_STATEOFER);

  const dataHeadPostulacion: DataHeadTable[] = [
    {
      key: "vacante",
      nombre: "Vacante",
    },
    {
      key: "fechaPostulacion",
      nombre: "Fecha de Postulación",
      isDate: true,
    },
    {
      key: "status",
      nombre: "Estatus",
    },
    {
      key: "empresa",
      nombre: "Empresa",
    },
  ];

  useEffect(() => {
    axios
      .post("/consulta_estudiante", {
        id: localStorage.getItem("idUser"),
      })
      .then((data) => {
        console.log("Student data", data.data);
        localStorage.setItem("userDirectionId", data.data.direccionId);
        setUser(data.data);
        setCambio(data.data.cambioResidencia);
        setHorario(data.data.jornada);
        setModalidad(data.data.modalidad);
        console.log("Estudiante", data);
      })
      .catch((error) => {
        console.log("error", error);
      });

      axios
      .post("/aplicaciones_estudiante", {
        id:  localStorage.getItem("idUser"),
      })
      .then((data) => {
        console.log("Usuarios", data);
        setAplicantes(data.data);
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
        console.log("carreraaaaa", data.data[0].descripcion);
      })
      .catch((error) => {
        console.log("error", error);
      });

    axios
      .post("/consulta_experiencia", {
        id: localStorage.getItem("idUser"),
      })
      .then((data) => {
        console.log("Experiencia", data);
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
        console.log("Student skills", data.data);
        setSkillsUser(data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  if (cambioResidencia == 1) Residencia = "Con disponibilidad de reubicación";
  else Residencia = "Sin disponibilidad de reubicación";

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
              <div>
                {userCarrera}
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
              titulo="Habilidades"
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
                datos={Residencia}
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
                formCreate={<CarreraForm />}
                keyName="descripcion"
              />
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="flex justify-between items-start">
              <div className="bg-white rounded-md p-4">
              <div className="flex justify-between items-start">
                <div className="text-xl text-politectico font-bold">
                  Postulaciones
                </div>
              </div>
              <div className="grid grid-cols-8 gap-2 my-4">
                <div className="col-span-3 relative">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-full py-2 px-5 border-[3px] text-base transition-all duration-300 ease-in-out border-gray-300 rounded-full outline-none focus:border-politectico"
                    onFocus={() => setIsFocused3(true)}
                    onBlur={() => setIsFocused3(false)}
                  />
                  <FontAwesomeIcon
                    icon={faSearch}
                    className={`absolute right-4 top-3.5 text-lg transition-colors ${isFocused3 ? "text-politectico" : "text-gray-300"
                      }`}
                  />
                </div>
                <div className="col-span-5 flex justify-end gap-6">
                  <div className="flex items-center h-full gap-2">
                    <div className="text-gray-600">Filas por página</div>
                    <select className="bg-white border-[3px] border-gray-300 pl-2 py-1 rounded-md">
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                  <div className="flex h-full items-center ">
                    <div className="text-gray-600 mr-4">1 - 10 de 200</div>
                    <div className="grid grid-cols-4 gap-4">
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="col-span-1 text-gray-400 text-2xl"
                      />
                      <FontAwesomeIcon
                        icon={faBackwardStep}
                        className="col-span-1 text-gray-400 text-2xl"
                      />
                      <FontAwesomeIcon
                        icon={faForwardStep}
                        className="col-span-1 text-gray-400 text-2xl"
                      />
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="col-span-1 text-gray-400 text-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {dataAplicantes && dataAplicantes.length > 0  ? (
                
                <table className="w-full mt-3 border-b-[3px] border-politectico">
                  <tr className="bg-politectico text-white font-semibold">
                    <th className="px-4 py-3 rounded-tr-md text-left">Vacante</th>
                    <th className="px-4 py-3 text-left">Fecha de Postulación</th>
                    <th className="px-4 py-3 text-left">Estatus</th>
                    <th className="px-4 py-3 text-left">Empresa</th>
                    <th className="px-4 py-3 rounded-tr-md text-center">Acciones</th>
                  </tr>

                  <tbody>
                    {dataAplicantes.map((aplicante: any, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? '' : 'bg-gray-200'}>
                        <td className="px-4 py-3">{aplicante.nombreOferta}</td>
                        <td className="px-4 py-3">
                          {new Date(aplicante.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                        </td>
                        <td className="px-4 py-3">
                          {aplicante.estatusId === 1 && (
                            <div className="inline px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
                              Validado
                            </div>
                          )}
                          {aplicante.estatusId === 2 && (
                            <div className="inline px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                              En Validación
                            </div>
                          )}
                          {aplicante.estatusId === 3 && (
                            <div className="inline px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
                              Rechazada
                            </div>
                          )}
                        </td>

                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3 text-center">
                          <FontAwesomeIcon
                            icon={faPen}
                            className="fa-solid fa-pen mx-1 text-yellow-500"
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="fa-solid fa-trash mx-1 text-red-500"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No Hay datos</p>
              )}
            </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default ProfilePage;

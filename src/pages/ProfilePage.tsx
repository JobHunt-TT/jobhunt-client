import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faSearch, faChevronLeft, faChevronRight, faBackwardStep, faForwardStep } from "@fortawesome/free-solid-svg-icons";
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
import { SalarioForm } from "../forms/SalarioForm";
import {
  faInstagram, faSquareFacebook, faXTwitter
} from "@fortawesome/free-brands-svg-icons";
import { DataUser, SkillUser, DataHeadTable } from "../types";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { CardAddress, CardUserInfo, TableComponent } from "../components";

const MySwal = withReactContent(Swal); // eslint-disable-line @typescript-eslint/no-unused-vars

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
  const [userCarrera, setuserCarrera] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [isFocused3, setIsFocused3] = useState(false);

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
        setUser(data.data);
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

  return (
    <ContentLayout>
      <div className="w-4/5 mx-auto py-16 grid-2">
        <div className="flex grid grid-cols-3 gap-6">
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
              titulo="Habilidades"
              data={skillsUser}
              formCreate={<SkillForm />}
              keyName="descripcion"
            />
            <div className="bg-white rounded-md p-4 mt-6">
              <CardUserInfo
                titulo="Experiencia Laboral"
                data={skillsUser}
                formCreate={<ExperienciaLaboralForm />}
                keyName="descripcion"
              />
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <CardUserInfo
                titulo="Actividades Extracurrículares"
                data={skillsUser}
                formCreate={<ActividadesExtracurricularesForm />}
                keyName="descripcion"
              />
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <CardUserInfo
                titulo="Horario"
                data={skillsUser}
                formCreate={<HorarioForm />}
                keyName="descripcion"
              />
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <CardUserInfo
                titulo="Cambio de Residencia"
                data={skillsUser}
                formCreate={<CambioResidenciaForm />}
                keyName="descripcion"
              />
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <CardUserInfo
                titulo="Modalidad"
                data={skillsUser}
                formCreate={<ModalidadForm />}
                keyName="descripcion"
              />
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <CardUserInfo
                titulo="Carrera"
                data={skillsUser}
                formCreate={<CarreraForm />}
                keyName="descripcion"
              />
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <CardUserInfo
                titulo="Salario Deseado"
                data={skillsUser}
                formCreate={<SalarioForm />}
                keyName="descripcion"
              />
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
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
                    className={`absolute right-4 top-3.5 text-lg transition-colors ${
                      isFocused3 ? "text-politectico" : "text-gray-300"
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
              <table className="w-full mt-3 border-b-[3px] border-politectico">
                <thead>
                  <tr className="bg-politectico text-white font-semibold">
                    <td className="px-4 py-3 rounded-tl-md">Vacante</td>
                    <td className="px-4 py-3">Fecha de Postulación</td>
                    <td className="px-4 py-3">Estatus</td>
                    <td className="px-4 py-3">Empresa</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3">Desarrollador BackEnd</td>
                    <td className="px-4 py-3">5 Jun. 2024</td>
                    <td className="px-4 py-3">
                      <div className="inline px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                        En Proceso
                      </div>
                    </td>
                    <td className="px-4 py-3">Microsoft</td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-3">Desarrollador BackEnd</td>
                    <td className="px-4 py-3">5 Jun. 2024</td>
                    <td className="px-4 py-3">
                      <div className="inline px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
                        Aceptado
                      </div>
                    </td>
                    <td className="px-4 py-3">Microsoft</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Desarrollador BackEnd</td>
                    <td className="px-4 py-3">5 Jun. 2024</td>
                    <td className="px-4 py-3">
                      <div className="inline px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
                        Rechazado
                      </div>
                    </td>
                    <td className="px-4 py-3">Microsoft</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default ProfilePage;

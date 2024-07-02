// src/pages/ViewProfilePage.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { ContentLayout } from "../layouts";
import { DataUser, SkillUser } from "../types";

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

export const ViewPostulante = () => {
  const [user, setUser] = useState(INITIAL_STATE);
  const [skillsUser, setSkillsUser] = useState<SkillUser[]>([]);
  const [userCarrera, setUserCarrera] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const estudianteResponse = await axios.post("/consulta_estudiante", {
          id: localStorage.getItem("idUser"),
        });
        setUser(estudianteResponse.data);

        const skillsResponse = await axios.post("/consulta_estudiante_tag", {
          id: localStorage.getItem("idUser"),
        });
        setSkillsUser(skillsResponse.data);

        const carreraResponse = await axios.post("/consulta_carreras", {
          id: localStorage.getItem("idUser"),
        });
        setUserCarrera(carreraResponse.data[0]);

        const direccionResponse = await axios.post("/consulta_direccion", {
          id: localStorage.getItem("direccionID"),
        });
        const direccionCompleta = `${direccionResponse.data.estado}, ${direccionResponse.data.municipio}, ${direccionResponse.data.calle}, ${direccionResponse.data.numero}`;
        setUser((prevUser) => ({ ...prevUser, direccion: direccionCompleta }));
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
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
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">Dirección</div>
              <div>{user.direccion}</div>
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap">
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">Habilidades</div>
              <ul>
                {skillsUser.map((skill, index) => (
                  <li key={index}>{skill.descripcion}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">Experiencia Laboral</div>
              <ul>
                {skillsUser.map((skill, index) => (
                  <li key={index}>{skill.descripcion}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">Actividades Extracurriculares</div>
              <ul>
                {skillsUser.map((skill, index) => (
                  <li key={index}>{skill.descripcion}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">Horario</div>
              <ul>
                {skillsUser.map((skill, index) => (
                  <li key={index}>{skill.descripcion}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">Cambio de Residencia</div>
              <ul>
                {skillsUser.map((skill, index) => (
                  <li key={index}>{skill.descripcion}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">Modalidad</div>
              <ul>
                {skillsUser.map((skill, index) => (
                  <li key={index}>{skill.descripcion}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">Carrera</div>
              <div>{userCarrera ? userCarrera.descripcion : "No disponible"}</div>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};



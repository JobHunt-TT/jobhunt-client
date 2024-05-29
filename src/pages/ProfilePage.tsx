import { useEffect, useState } from "react";
import axios from "axios";

interface DataUser {
  cedula_Profesional: string;
  direccion: string;
  direccionID: number;
  estatusCarrera: string;
  fechaEgreso: string;
  id: number;
  porcentaje_Cursado: string;
  sexo: string;
  userApellido: string;
  userBirthDate: string;
  userBoleta: null;
  userCurp: string;
  userEmail: null;
  userEstatusCarreraId: number;
  userName: string;
  userPass: string;
  userPhone: string;
  userSexoId: number;
}

const INITIAL_STATE: DataUser = {
  cedula_Profesional: "",
  direccion: "",
  direccionID: 0,
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

  useEffect(() => {
    axios
      .post("/consulta_estudiante", {
        id: localStorage.getItem("idUser"),
      })
      .then((data) => {
        console.log("success", data);
        setUser(data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <div className="bg-gray-300">
      <div className="bg-politectico">
        <div className="w-4/5 m-auto flex justify-between items-center text-white">
          <a href="./principal.html" className="font-bold text-2xl py-1">
            JobHunt
          </a>
          <div className="flex">
            <a
              href="./profileAlumno.html"
              className="py-4 px-5 hover:bg-white/30"
            >
              Perfil
            </a>
            <a href="./index.html" className="py-4 px-5 hover:bg-white/30">
              Salir
            </a>
          </div>
        </div>
      </div>
      <div className="w-4/5 mx-auto my-16">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <div className="bg-white rounded-md p-4">
              <img
                src="./img/Homer.jpg"
                alt="Profile"
                width="200"
                height="200"
                className="block mx-auto my-5 rounded-full"
              />
              <div className="text-xl font-bold text-center">
                {user.userName} {user.userApellido}
              </div>
              <div className="text-center">Ingeniería en Sistemas</div>
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">Contacto</div>
              <div className="flex items-center mt-2">
                <i className="fa-regular fa-envelope text-lg mr-2"></i>
                <div>{user.userPhone}</div>
              </div>
              <div className="flex items-center mt-2">
                <i className="fa-solid fa-phone text-lg mr-2"></i>
                <div>+52 55 1234 5678</div>
              </div>
              <div className="flex justify-center mt-2">
                <i className="fa-brands fa-square-facebook text-3xl text-facebook mx-2"></i>
                <i className="fa-brands fa-x-twitter text-3xl text-x-twitter mx-2"></i>
                <i className="fa-brands fa-instagram text-3xl text-instagram mx-2"></i>
              </div>
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">Idiomas</div>
              <div className="mt-2">
                <div>Español</div>
                <div>Inglés</div>
                <div>Alemán</div>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="bg-white rounded-md p-4">
              <div className="text-xl text-politectico font-bold">Skills</div>
              <div className="mt-1">
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Habilidad 1
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Habilidad 2
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Habilidad 3
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Habilidad 4
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Habilidad 5
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">
                Extra Skills
              </div>
              <div className="mt-1">
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Habilidad 1
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Habilidad 2
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Habilidad 3
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Habilidad 4
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Habilidad 5
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">
                Certificaciones
              </div>
              <div className="mt-1">
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Certificación 1
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Certificación 2
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">
                Expreriencia Laboral
              </div>
              <div className="mt-1">
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Empleo 1
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Empleo 2
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">
                Proyectos Destacados
              </div>
              <div className="mt-1">
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Proyecto 1
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Proyecto 2
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Proyecto 3
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

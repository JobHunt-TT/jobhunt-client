import {
  faInstagram,
  faSquareFacebook,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "react-select/dist/declarations/src/theme";

export const LandingPage = () => {
  const navigate = useNavigate();

  const checkLogin = () => {
    const idUser = localStorage.getItem("idUser");
    const idEmpresa = localStorage.getItem("idEmpresa");
    
    if (idUser !== null) {
      if (idEmpresa !== null) {
        navigate('/profileEnterprise');
      } else {
        navigate('/profile');
      }
    }
  };

  useEffect(checkLogin, [navigate])

  return (
    <div className="h-full">
      <div className="h-screen flex justify-center items-center bg-politectico text-white">
        <div className="md:w-1/3 md:mx-40 w-10/12 mx-auto bg-white rounded-full p-14">
              <div className="font-bold text-5xl text-center md:text-center sm:text-6xl text-black">
                ¡Encuentra a tu burrito!
              </div>
              <div className="text-2xl text-center text-black">
                <br/>
                <i>Bolsa de Trabajo Institucional</i>
              </div>
        </div>
        <div className="md:w-1/2 md:mx-36 w-10/12 mx-auto">      
          <div className="font-bold m-0 text-5xl text-center md:text-left sm:text-6xl ">
            ¡Bienvenidos!
          </div>
          <div className="text-center my-16 md:text-lg ">
            Conectamos empresas y estudiantes para potenciar oportunidades
            profesionales. 
            Descubre ofertas laborales, realiza búsquedas
            perzonalizadas y encuentra tu próximo paso profesional.
            <br/><br/>
            ¡Inicia sesión para comenzar tu búsqueda!
            </div>
          <div className="text-center">
            <Link
              to="/login"
              className="bg-white text-politectico font-semibold py-2 px-3 rounded-md block sm:inline"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
      <div className="h-screen flex justify-between flex-col p-10 md:p-28">
        <div className="flex items-center flex-col">
          <div className="text-politectico text-3xl font-bold md:text-4xl">
            Registrate
          </div>
          <div className="text-politectico text-base font-semibold mt-4 text-center md:text-lg">
            ¡No te quedes ahí parado con las manos en <br />
            los bolsillos!
            <br />
            Es hora de, bueno, ponerlas a mejor uso
            <br />
            haciendo clic en el botón de abajo.
          </div>
          <div className="mt-6 w-full sm:w-auto">
            <Link
              to="/register"
              className="bg-politectico text-white font-semibold py-2 px-3 rounded-md block mb-3 text-center sm:mx-1 sm:mb-0 sm:inline-block"
            >
              Estudiantes
            </Link>
            <Link
              to="/registerEnterprise"
              className="bg-black text-white font-semibold py-2 px-3 rounded-md block text-center sm:mx-1 sm:inline-block"
            >
              Empresas
            </Link>
          </div>
        </div>
        <div className="w-10/12 2xl:w-1/4">
          <div className="text-politectico text-3xl font-bold md:text-4xl">
            <br/><br/>
            ¿Por qué elegirnos?
          </div>
          <div className="text-xl font-semibold mt-2 md:text-2xl">
            Simplificamos tu búsqueda de talento para impulsar oportunidades
            profesionales exitosas.
            <br />
            ¡Únete y potencia tu camino laboral hoy!
          </div>
        </div>
      </div>
      <div className="h-screen bg-frase bg-no-repeat bg-cover bg-center"></div>
      <div className="h-screen p-10 md:p-28">
        <div>
          <div className="grid grid-cols-1 gap-y-4 my-6 gap-x-10 sm:grid-cols-2 sm:gap-y-14 sm:gap-x-24 sm:my-14">
            <div>
                <div className="text-politectico text-3xl font-bold md:text-4xl">
                 Nuestro Objetivo Contigo
                </div>
                <div className="text-base font-bold md:text-lg"><br/>Como Empresa.</div>
                  <div className="text-sm md:text-base text-justify">
                    <br/><i>
                    ¡Impulsa tu proceso de reclutamiento con el Sistema de Recomendación de Candidatos del IPN!
                    <br/></i>
                    Encuentra a los candidatos ideales para tus vacantes en cuestión de segundos, reduce el tiempo y esfuerzo dedicado a la búsqueda manual de candidatos.
                    Accede a un pool de talento altamente calificado identifica a los candidatos con mayor compatibilidad con las ofertas laborales. Destaca como una empresa que valora el potencial de los estudiantes del IPN.
                  </div>
                  <div className="text-base font-bold md:text-lg"><br/>Como Alumno.</div>
                  <div className="text-sm md:text-base text-justify">
                    <br/><i>
                    ¡Potencia tu futuro profesional!
                    <br/></i>
                    Accesa a un sinfín de ofertas de trabajo personalizadas para tu perfil y visibilidad destacada de las vacantes más relevantes para tu carrera.
                    Demuestra a las empresas tu potencial y tus habilidades a través de un perfil completo, aumenta tus posibilidades de conseguir el trabajo de tus sueños. Conecta con empresas líderes en diversos sectores y potenciales empleadores.
                  </div>
            </div>
            <div>
              <div className="text-politectico text-3xl font-bold md:text-4xl">
                  Nosotros
                  </div>
                    <div className="text-sm md:text-base text-justify">
                      <br/><br/>
                      Somos estudiantes comprometidos con el desarrollo profesional de nuestros compañeros, por ello se desarrolla este proyecto, 
                      para que los alumnos de Instituo Politécnico Nacional y sus egresados, puedan acceder a vacantes que se adapten a su perfil, 
                      de acuerdo con sus habilidades desarrolladas durante la carrera.
                    </div>
                    <div>
                      <div className=" flex text-center items-center justify-start  m-3">
                        <img
                          src="./img/Homer.jpg"
                          alt="Profile"
                          width="100"
                          height="100"
                          className="my-2 rounded-full justify-start items-center"
                        />
                        <div className="block m-3">
                          <p className="font-bold">Efraín Chávez Hernández</p>
                          <br/>
                          <p>ESCOM - Ingeniería en Sistemas Computacionales</p>
                        </div>
                      </div>
                      <div className=" flex text-center items-center justify-start m-3">
                        <img
                          src="./img/Homer.jpg"
                          alt="Profile"
                          width="100"
                          height="100"
                          className="my-2 rounded-full justify-start items-center "
                        />
                        <div className="block m-3">
                          <p className="font-bold">Karolina Cedillo Sanchez</p>
                          <br/>
                          <p>ESCOM - Ingeniería en Sistemas Computacionales</p>
                        </div>
                      </div>
                      <div className=" flex text-center items-center justify-start m-3">
                        <img
                          src="./img/Homer.jpg"
                          alt="Profile"
                          width="100"
                          height="100"
                          className="my-2 rounded-full justify-start items-center"
                        />
                        <div className="block m-3">
                          <p className="font-bold">Ernesto Sepúlveda Vázquez</p>
                          <br/>
                          <p>ESCOM - Ingeniería en Sistemas Computacionales</p>
                        </div>
                      </div>


                    </div>
            </div>
          </div>
        </div>
        <div className="flex items-center flex-col mt-28 mb-8 lg:mb-0">
          <div>
            <FontAwesomeIcon
              icon={faSquareFacebook}
              className="text-2xl text-politectico mx-1 md:text-3xl"
            />
            <FontAwesomeIcon
              icon={faXTwitter}
              className="text-2xl text-politectico mx-1 md:text-3xl"
            />
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-2xl text-politectico mx-1 md:text-3xl"
            />
          </div>
          <div className="text-politectico font-semibold mt-6 text-sm md:text-base">
            &copy; 2023
          </div>
        </div>
      </div>
    </div>
  );
};

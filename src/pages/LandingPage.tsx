import {
  faInstagram,
  faSquareFacebook,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();

  const checkLogin = () => {
    const idUser = localStorage.getItem("idUser");
    const idEmpresa = localStorage.getItem("idEmpresa");
    
    if (idUser !== null) {
      if (idEmpresa !== null) {
        navigate('/profile');
      } else {
        navigate('/profileEnterprise');
      }
    }
  };

  useEffect(checkLogin, [navigate])

  return (
    <div className="h-full">
      <div className="h-screen flex justify-start items-center bg-politectico text-white">
        <div className="md:w-1/4 md:mx-36 w-10/12 mx-auto">
          <div className="font-bold text-5xl text-center md:text-left sm:text-6xl ">
            ¡Bienvenidos!
          </div>
          <div className="text-base my-16 md:text-lg ">
            Conectamos empresas y estudiantes para potenciar oportunidades
            profesionales. Descubre ofertas laborales, realiza búsquedas
            perzonalizadas y encuentra tu próximo paso profesional.
            <br />
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
          <div className="text-politectico text-3xl font-bold md:text-4xl">
            Nuestros casos de éxito
          </div>
          <div className="grid grid-cols-1 gap-y-4 my-6 gap-x-10 sm:grid-cols-2 sm:gap-y-14 sm:gap-x-24 sm:my-14">
            <div>
              <div className="text-base font-bold md:text-lg">Juan Pérez</div>
              <div className="text-sm md:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
                dolorum nihil tempora excepturi ratione voluptatum officiis
                animi, praesentium eligendi iusto facere magnam doloremque, eius
                explicabo consequatur cum, quae commodi neque numquam aperiam
                quis dicta magni! Tenetur aperiam consequuntur atque laboriosam!
              </div>
            </div>
            <div>
              <div className="text-base font-bold md:text-lg">Juan Pérez</div>
              <div className="text-sm md:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
                dolorum nihil tempora excepturi ratione voluptatum officiis
                animi, praesentium eligendi iusto facere magnam doloremque, eius
                explicabo consequatur cum, quae commodi neque numquam aperiam
                quis dicta magni! Tenetur aperiam consequuntur atque laboriosam!
              </div>
            </div>
            <div>
              <div className="text-base font-bold md:text-lg">Juan Pérez</div>
              <div className="text-sm md:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
                dolorum nihil tempora excepturi ratione voluptatum officiis
                animi, praesentium eligendi iusto facere magnam doloremque, eius
                explicabo consequatur cum, quae commodi neque numquam aperiam
                quis dicta magni! Tenetur aperiam consequuntur atque laboriosam!
              </div>
            </div>
            <div>
              <div className="text-base font-bold md:text-lg">Juan Pérez</div>
              <div className="text-sm md:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
                dolorum nihil tempora excepturi ratione voluptatum officiis
                animi, praesentium eligendi iusto facere magnam doloremque, eius
                explicabo consequatur cum, quae commodi neque numquam aperiam
                quis dicta magni! Tenetur aperiam consequuntur atque laboriosam!
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

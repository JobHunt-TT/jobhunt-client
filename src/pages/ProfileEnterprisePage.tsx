import {
  faInstagram,
  faSquareFacebook,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPen, faPhone, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { VacanteForm } from "../forms";
const MySwal = withReactContent(Swal);

export const ProfileEnterprisePage = () => {
  const handleOpenModal = () => {
    MySwal.fire({
      html: <VacanteForm />,
      showCancelButton: false,
      showConfirmButton: false,
      preConfirm: () => {
        // const form = document.getElementById('my-form') as HTMLFormElement;
        // if (form) {
        //   return handleSubmit(submit)().then(() => null);
        // }
        return null;
      },
    });
  };
  return (
    <div>
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
                src="./img/Microsift.png"
                alt="Profile"
                width="350"
                className="block mx-auto my-5"
              />
              <div className="text-xl font-bold text-center">Microsoft</div>
              <div className="text-center">Desarrollo de Software</div>
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">Contacto</div>
              <div className="flex items-center mt-2">
                <FontAwesomeIcon icon={faEnvelope} className="text-lg mr-2" />
                <div>contacto@microsoft.com</div>
              </div>
              <div className="flex items-center mt-2">
                <FontAwesomeIcon icon={faPhone} className="text-lg mr-2" />
                <div>+52 55 1234 5678</div>
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
          </div>
          <div className="col-span-2">
            <div className="bg-white rounded-md p-4 mb-6">
              <div className="flex justify-between items-start">
                <div className="text-xl text-politectico font-bold">
                  Administradores
                </div>
                <button className="bg-politectico text-white px-6 py-2 font-semibold rounded-full">
                  Crear Administrador
                </button>
              </div>
              <table className="w-full mt-3 border-b-[3px] border-politectico">
                <tr className="bg-politectico text-white font-semibold">
                  <td className="px-4 py-3 rounded-tl-md">Nombre</td>
                  <td className="px-4 py-3">Cargo</td>
                  <td className="px-4 py-3">Correo</td>
                  <td className="px-4 py-3">Teléfono</td>
                  <td className="px-4 py-3 rounded-tr-md text-center">
                    Acciones
                  </td>
                </tr>
                <tbody>
                  <tr>
                    <td className="px-4 py-3">Juanito Pérez</td>
                    <td className="px-4 py-3">Administrador</td>
                    <td className="px-4 py-3">juan.perez@microsoft.com</td>
                    <td className="px-4 py-3">+52 55 1234 5678</td>
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
                  <tr className="bg-gray-200">
                    <td className="px-4 py-3">Pedrito Fernandez</td>
                    <td className="px-4 py-3">Reclutador</td>
                    <td className="px-4 py-3">pedro.fernandez@microsoft.com</td>
                    <td className="px-4 py-3">+52 55 1234 5678</td>
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
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-md p-4">
              <div className="flex justify-between items-start">
                <div className="text-xl text-politectico font-bold">
                  Vacantes
                </div>
                <button
                  className="bg-politectico text-white px-6 py-2 font-semibold rounded-full"
                  onClick={handleOpenModal}
                >
                  Crear Vacante
                </button>
              </div>
              <table className="w-full mt-3 border-b-[3px] border-politectico">
                <tr className="bg-politectico text-white font-semibold">
                  <th className="px-4 py-3 rounded-tl-md">Nombre</th>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Estatus</th>
                  <th className="px-4 py-3">Creador</th>
                  <th className="px-4 py-3 rounded-tr-md text-center">
                    Acciones
                  </th>
                </tr>
                <tbody>
                  <tr>
                    <td className="px-4 py-3">Desarrollador BackEnd</td>
                    <td className="px-4 py-3">5 Jun. 2024</td>
                    <td className="px-4 py-3">
                      <div className="inline px-3 py-1 bg-blue-200 text-blue-500 rounded-full text-sm font-semibold">
                        En Validación
                      </div>
                    </td>
                    <td className="px-4 py-3">Juanito Pérez</td>
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
                  <tr className="bg-gray-200">
                    <td className="px-4 py-3">Desarrollador BackEnd</td>
                    <td className="px-4 py-3">5 Jun. 2024</td>
                    <td className="px-4 py-3">
                      <div className="inline px-3 py-1 bg-green-200 text-green-500 rounded-full text-sm font-semibold">
                        Validado
                      </div>
                    </td>
                    <td className="px-4 py-3">Juanito Pérez</td>
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
                  <tr>
                    <td className="px-4 py-3">Desarrollador BackEnd</td>
                    <td className="px-4 py-3">5 Jun. 2024</td>
                    <td className="px-4 py-3">
                      <div className="inline px-3 py-1 bg-red-200 text-red-500 rounded-full text-sm font-semibold">
                        Bloqueada
                      </div>
                    </td>
                    <td className="px-4 py-3">Juanito Pérez</td>
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

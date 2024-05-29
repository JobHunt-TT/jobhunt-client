import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AdminPage = () => {
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
      <div className="w-4/5 mx-auto py-16">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <div className="bg-white rounded-md px-4 pt-2 pb-4">
              <div className="text-politectico font-bold text-3xl">Empresas</div>
              <table className="w-full mt-3 border-b-[3px] border-politectico">
                <tr className="bg-politectico text-white font-semibold">
                  <td className="px-4 py-3 rounded-tl-md">Empresa</td>
                  <td className="px-4 py-3">Giro</td>
                  <td className="px-4 py-3">Administrador</td>
                  <td className="px-4 py-3">Correo</td>
                  <td className="px-4 py-3">Teléfono</td>
                  <td className="px-4 py-3 rounded-tr-md text-center">
                    Acciones
                  </td>
                </tr>
                <tbody>
                  <tr>
                    <td className="px-4 py-3">Microsoft</td>
                    <td className="px-4 py-3">Computación</td>
                    <td className="px-4 py-3">Juanito Pérez</td>
                    <td className="px-4 py-3">juan.perez@microsoft.com</td>
                    <td className="px-4 py-3">+52 55 1234 5678</td>
                    <td className="px-4 py-3 text-center">
                      <FontAwesomeIcon icon={faPen} className="fa-solid fa-pen mx-1 text-yellow-500" />
                      <FontAwesomeIcon icon={faTrash} className="fa-solid fa-trash mx-1 text-red-500" />
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-3">Microsoft</td>
                    <td className="px-4 py-3">Computación</td>
                    <td className="px-4 py-3">Juanito Pérez</td>
                    <td className="px-4 py-3">juan.perez@microsoft.com</td>
                    <td className="px-4 py-3">+52 55 1234 5678</td>
                    <td className="px-4 py-3 text-center">
                      <FontAwesomeIcon icon={faPen} className="fa-solid fa-pen mx-1 text-yellow-500" />
                      <FontAwesomeIcon icon={faTrash} className="fa-solid fa-trash mx-1 text-red-500" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Microsoft</td>
                    <td className="px-4 py-3">Computación</td>
                    <td className="px-4 py-3">Juanito Pérez</td>
                    <td className="px-4 py-3">juan.perez@microsoft.com</td>
                    <td className="px-4 py-3">+52 55 1234 5678</td>
                    <td className="px-4 py-3 text-center">
                      <FontAwesomeIcon icon={faPen} className="fa-solid fa-pen mx-1 text-yellow-500" />
                      <FontAwesomeIcon icon={faTrash} className="fa-solid fa-trash mx-1 text-red-500" />
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-3">Microsoft</td>
                    <td className="px-4 py-3">Computación</td>
                    <td className="px-4 py-3">Juanito Pérez</td>
                    <td className="px-4 py-3">juan.perez@microsoft.com</td>
                    <td className="px-4 py-3">+52 55 1234 5678</td>
                    <td className="px-4 py-3 text-center">
                      <FontAwesomeIcon icon={faPen} className="fa-solid fa-pen mx-1 text-yellow-500" />
                      <FontAwesomeIcon icon={faTrash} className="fa-solid fa-trash mx-1 text-red-500" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Microsoft</td>
                    <td className="px-4 py-3">Computación</td>
                    <td className="px-4 py-3">Juanito Pérez</td>
                    <td className="px-4 py-3">juan.perez@microsoft.com</td>
                    <td className="px-4 py-3">+52 55 1234 5678</td>
                    <td className="px-4 py-3 text-center">
                      <FontAwesomeIcon icon={faPen} className="fa-solid fa-pen mx-1 text-yellow-500" />
                      <FontAwesomeIcon icon={faTrash} className="fa-solid fa-trash mx-1 text-red-500" />
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-3">Microsoft</td>
                    <td className="px-4 py-3">Computación</td>
                    <td className="px-4 py-3">Juanito Pérez</td>
                    <td className="px-4 py-3">juan.perez@microsoft.com</td>
                    <td className="px-4 py-3">+52 55 1234 5678</td>
                    <td className="px-4 py-3 text-center">
                      <FontAwesomeIcon icon={faPen} className="fa-solid fa-pen mx-1 text-yellow-500" />
                      <FontAwesomeIcon icon={faTrash} className="fa-solid fa-trash mx-1 text-red-500" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="col-span-2">
            <div className="bg-white rounded-md px-4 pt-2 pb-4">
              <div className="text-politectico font-bold text-3xl">Alumnos</div>
              <table className="w-full mt-3 border-b-[3px] border-politectico">
                <tr className="bg-politectico text-white font-semibold">
                  <td className="px-4 py-3 rounded-tl-md">Nombre</td>
                  <td className="px-4 py-3">Boleta</td>
                  <td className="px-4 py-3">Correo</td>
                  <td className="px-4 py-3">Teléfono</td>
                  <td className="px-4 py-3 rounded-tr-md text-center">
                    Acciones
                  </td>
                </tr>
                <tbody>
                  <tr>
                    <td className="px-4 py-3">Juanito Pérez</td>
                    <td className="px-4 py-3">2020630371</td>
                    <td className="px-4 py-3">juan.perez@microsoft.com</td>
                    <td className="px-4 py-3">+52 55 1234 5678</td>
                    <td className="px-4 py-3 text-center">
                      <FontAwesomeIcon icon={faPen} className="fa-solid fa-pen mx-1 text-yellow-500" />
                      <FontAwesomeIcon icon={faTrash} className="fa-solid fa-trash mx-1 text-red-500" />
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-3">Juanito Pérez</td>
                    <td className="px-4 py-3">2020630371</td>
                    <td className="px-4 py-3">juan.perez@microsoft.com</td>
                    <td className="px-4 py-3">+52 55 1234 5678</td>
                    <td className="px-4 py-3 text-center">
                      <FontAwesomeIcon icon={faPen} className="fa-solid fa-pen mx-1 text-yellow-500" />
                      <FontAwesomeIcon icon={faTrash} className="fa-solid fa-trash mx-1 text-red-500" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Juanito Pérez</td>
                    <td className="px-4 py-3">2020630371</td>
                    <td className="px-4 py-3">juan.perez@microsoft.com</td>
                    <td className="px-4 py-3">+52 55 1234 5678</td>
                    <td className="px-4 py-3 text-center">
                      <FontAwesomeIcon icon={faPen} className="fa-solid fa-pen mx-1 text-yellow-500" />
                      <FontAwesomeIcon icon={faTrash} className="fa-solid fa-trash mx-1 text-red-500" />
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-3">Juanito Pérez</td>
                    <td className="px-4 py-3">2020630371</td>
                    <td className="px-4 py-3">juan.perez@microsoft.com</td>
                    <td className="px-4 py-3">+52 55 1234 5678</td>
                    <td className="px-4 py-3 text-center">
                      <FontAwesomeIcon icon={faPen} className="fa-solid fa-pen mx-1 text-yellow-500" />
                      <FontAwesomeIcon icon={faTrash} className="fa-solid fa-trash mx-1 text-red-500" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Juanito Pérez</td>
                    <td className="px-4 py-3">2020630371</td>
                    <td className="px-4 py-3">juan.perez@microsoft.com</td>
                    <td className="px-4 py-3">+52 55 1234 5678</td>
                    <td className="px-4 py-3 text-center">
                      <FontAwesomeIcon icon={faPen} className="fa-solid fa-pen mx-1 text-yellow-500" />
                      <FontAwesomeIcon icon={faTrash} className="fa-solid fa-trash mx-1 text-red-500" />
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-3">Juanito Pérez</td>
                    <td className="px-4 py-3">2020630371</td>
                    <td className="px-4 py-3">juan.perez@microsoft.com</td>
                    <td className="px-4 py-3">+52 55 1234 5678</td>
                    <td className="px-4 py-3 text-center">
                      <FontAwesomeIcon icon={faPen} className="fa-solid fa-pen mx-1 text-yellow-500" />
                      <FontAwesomeIcon icon={faTrash} className="fa-solid fa-trash mx-1 text-red-500" />
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

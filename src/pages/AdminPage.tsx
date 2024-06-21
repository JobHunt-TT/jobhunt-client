import {
  faBackwardStep,
  faChevronLeft,
  faChevronRight,
  faForwardStep,
  faPen,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";

interface DataEnterprise {
  empresaNombre: string;
  empresaId: number;
  tipoEmpresaId: number;
  tipoEmpresa: string;
  userRFC: string;
}

interface TipoEmpresa {
  id: number;
  alias: string;
  descripcion: string;
}

export const AdminPage = () => {
  const [enterprises, setEnterprises] = useState<DataEnterprise[]>([]);
  const [tipoEmpresa, setTipoEmpresa] = useState<TipoEmpresa[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  const getTipoEmpresa = (id: number): string => {
    const tipo = tipoEmpresa.find((tipo) => tipo.id === id);
    return tipo !== undefined ? tipo.descripcion : "No hay tipo";
  };

  useEffect(() => {
    axios
      .post("/consulta_empresa")
      .then((data) => {
        console.log("success", data);
        setEnterprises(data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });

    axios
      .post("/consulta_tipo_empresa")
      .then((data) => {
        console.log("success", data);
        setTipoEmpresa(data.data);
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
      <div className="w-4/5 mx-auto py-16">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <div className="bg-white rounded-md px-4 pt-2 pb-4">
              <div className="text-politectico font-bold text-3xl">
                Empresas
              </div>
              <div className="grid grid-cols-8 gap-2 my-4">
                <div className="col-span-2 relative">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-full py-2 px-5 border-[3px] text-base transition-all duration-300 ease-in-out border-gray-300 rounded-full outline-none focus:border-politectico"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                  <FontAwesomeIcon
                    icon={faSearch}
                    className={`absolute right-4 top-3.5 text-lg transition-colors ${
                      isFocused ? "text-politectico" : "text-gray-300"
                    }`}
                  />
                </div>
                <div className="col-span-3"></div>
                <div className="col-span-3 flex justify-end gap-6">
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
              <table className="w-full border-b-[3px] border-politectico">
                <tr className="bg-politectico text-white font-semibold">
                  <td className="px-4 py-3 rounded-tl-md">Empresa</td>
                  <td className="px-4 py-3">RFC</td>
                  <td className="px-4 py-3">Giro</td>
                  <td className="px-4 py-3 rounded-tr-md text-center">
                    Acciones
                  </td>
                </tr>
                <tbody>
                  {enterprises.map(
                    (
                      { empresaId, empresaNombre, userRFC, tipoEmpresaId },
                      index
                    ) => (
                      <tr
                        className={`${index % 2 === 1 && "bg-gray-200"}`}
                        key={index}
                      >
                        <td className="px-4 py-3">{empresaNombre}</td>
                        <td className="px-4 py-3">{userRFC}</td>
                        <td className="px-4 py-3">
                          {getTipoEmpresa(empresaId)}
                        </td>
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
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-span-2">
            <div className="bg-white rounded-md px-4 pt-2 pb-4">
              <div className="text-politectico font-bold text-3xl">Alumnos</div>
              <div className="grid grid-cols-8 gap-2 my-4">
                <div className="col-span-2 relative">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-full py-2 px-5 border-[3px] text-base transition-all duration-300 ease-in-out border-gray-300 rounded-full outline-none focus:border-politectico"
                    onFocus={() => setIsFocused2(true)}
                    onBlur={() => setIsFocused2(false)}
                  />
                  <FontAwesomeIcon
                    icon={faSearch}
                    className={`absolute right-4 top-3.5 text-lg transition-colors ${
                      isFocused2 ? "text-politectico" : "text-gray-300"
                    }`}
                  />
                </div>
                <div className="col-span-3"></div>
                <div className="col-span-3 flex justify-end gap-6">
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
                    <td className="px-4 py-3">Juanito Pérez</td>
                    <td className="px-4 py-3">2020630371</td>
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
                  <tr>
                    <td className="px-4 py-3">Juanito Pérez</td>
                    <td className="px-4 py-3">2020630371</td>
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
                    <td className="px-4 py-3">Juanito Pérez</td>
                    <td className="px-4 py-3">2020630371</td>
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
                  <tr>
                    <td className="px-4 py-3">Juanito Pérez</td>
                    <td className="px-4 py-3">2020630371</td>
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
                    <td className="px-4 py-3">Juanito Pérez</td>
                    <td className="px-4 py-3">2020630371</td>
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

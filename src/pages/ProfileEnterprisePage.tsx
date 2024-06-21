import {
  faInstagram,
  faSquareFacebook,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faBackwardStep,
  faChevronLeft,
  faChevronRight,
  faForwardStep,
  faPen,
  faPhone,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { VacanteForm } from "../forms";
import { useEffect, useState } from "react";
import axios from "axios";
import { ContentLayout } from "../layouts";
const MySwal = withReactContent(Swal);

interface AdminEmpresa {
  id: number;
  userName: string;
  userApellido: string;
  userBirthDate: string;
  userPhone: string;
  userEmail: string;
  userPass: string;
  userCurp: string;
  userSexoId: number;
  userEstatusCarreraId: number;
  userBoleta: string;
  usuarioEmpresaId: number;
  userCargo: string;
  sexo: string;
  direccionID: number;
  direccion: string;
  estatusCarrera: string;
  cedula_Profesional: string;
  fechaEgreso: string;
  porcentaje_Cursado: string;
}

export const ProfileEnterprisePage = () => {
  const [adminEmpresa, setAdminEmpresa] = useState<AdminEmpresa[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);

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

  // const handleDeleteAdminModal = (id: number, userName: string) => {
  //   MySwal.fire({
  //     icon: "warning",
  //     title: "Advertencia",
  //     text: `¿Estás seguro de querer borrar a ${userName}?`,
  //     showCancelButton: true,
  //     confirmButtonText: "Si, borrar",
  //     cancelButtonText: "No, cancelar",
  //     confirmButtonColor: "#16A34A",
  //     cancelButtonColor: "#DC2626",
  //   }).then(({ isConfirmed }) => {
  //     if (isConfirmed) {
  //     }
  //   });
  // };

  useEffect(() => {
    axios
      .post("/consulta_admin_x_empresa", {
        id: localStorage.getItem("idEmpresa"),
      })
      .then((data) => {
        console.log("success", data);
        setAdminEmpresa(data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <ContentLayout>
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
              <div className="grid grid-cols-8 gap-2 my-4">
                <div className="col-span-3 relative">
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
                <tr className="bg-politectico text-white font-semibold">
                  <td className="px-4 py-3 rounded-tl-md">Nombre</td>
                  <td className="px-4 py-3">Cargo</td>
                  <td className="px-4 py-3">Correo</td>
                  <td className="px-4 py-3">Teléfono</td>
                </tr>
                <tbody>
                  {adminEmpresa.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-3 text-center">
                        No hay administradores
                      </td>
                    </tr>
                  ) : (
                    <>
                      {adminEmpresa.map(
                        (
                          { userName, userApellido, userEmail, userPhone, id },
                          index
                        ) => (
                          <tr key={index}>
                            <td className="px-4 py-3">{userName}</td>
                            <td className="px-4 py-3">{userApellido}</td>
                            <td className="px-4 py-3">{userEmail}</td>
                            <td className="px-4 py-3">{userPhone}</td>
                          </tr>
                        )
                      )}
                    </>
                  )}
                  {/* <tr>
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
                  </tr> */}
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-md p-4 mb-6">
              <div className="flex justify-between items-start">
                <div className="text-xl text-politectico font-bold">
                  Ofertas
                </div>
                <button
                  className="bg-politectico text-white px-6 py-2 font-semibold rounded-full"
                  onClick={handleOpenModal}
                >
                  Crear Oferta
                </button>
              </div>
              <div className="grid grid-cols-8 gap-2 my-4">
                <div className="col-span-3 relative">
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
                <tr className="bg-politectico text-white font-semibold">
                  <td className="px-4 py-3 rounded-tl-md">Nombre</td>
                  <td className="px-4 py-3">Fecha</td>
                  <td className="px-4 py-3">Estatus</td>
                  <td className="px-4 py-3">Creador</td>
                  <td className="px-4 py-3 rounded-tr-md text-center">
                    Acciones
                  </td>
                </tr>
                <tbody>
                  <tr>
                    <td className="px-4 py-3">Desarrollador BackEnd</td>
                    <td className="px-4 py-3">5 Jun. 2024</td>
                    <td className="px-4 py-3">
                      <div className="inline px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm font-semibold">
                        En Espera
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
                      <div className="inline px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
                        Aprobada
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
                      <div className="inline px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
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
                <tr className="bg-politectico text-white font-semibold">
                  <td className="px-4 py-3 rounded-tl-md">Nombre</td>
                  <td className="px-4 py-3">Fecha</td>
                  <td className="px-4 py-3">Estatus</td>
                  <td className="px-4 py-3">Aspirante</td>
                  <td className="px-4 py-3 rounded-tr-md text-center">
                    Acciones
                  </td>
                </tr>
                <tbody>
                  <tr>
                    <td className="px-4 py-3">Desarrollador BackEnd</td>
                    <td className="px-4 py-3">5 Jun. 2024</td>
                    <td className="px-4 py-3">
                      <div className="inline px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
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
                      <div className="inline px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
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
                      <div className="inline px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
                        Rechazada
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
    </ContentLayout>
  );
};

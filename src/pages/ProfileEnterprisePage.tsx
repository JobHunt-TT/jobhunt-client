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
import { AdminEmpresa, DataHeadTable, Oferta } from "../types";
import { TableComponent } from "../components";

const MySwal = withReactContent(Swal);



export const ProfileEnterprisePage = () => {
  const user = null;
  const handleChangeStatusOferta = (id: string, idStatus: string) => {
    console.log("Endpoint para cambiar status", id, idStatus);
    axios
      .post("/cambio_status_oferta", {
        id,
        id2: idStatus,
      })
      .then((data) => {
        console.log("success", data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const dataHeadPersonal: DataHeadTable[] = [
    {
      key: "userName",
      nombre: "Nombre",
    },
    {
      key: "userCargo",
      nombre: "Cargo",
    },
    {
      key: "userEmail",
      nombre: "Correo",
    },
    {
      key: "userPhone",
      nombre: "Teléfono",
    },
  ];

  const dataHeadOferta: DataHeadTable[] = [
    {
      key: "nombreOferta",
      nombre: "Nombre",
    },
    {
      key: "vigencia",
      nombre: "Fecha",
      isDate: true,
    },
    {
      keyId: "ofertaId",
      key: "estatusId",
      nombre: "Estatus",
      isSelectColor: true,
      configSelectColor: [
        {
          label: "En Espera",
          value: 1,
          color: "waring",
        },
        {
          label: "Aprobada",
          value: 2,
          color: "success",
        },
        {
          label: "Bloqueada",
          value: 3,
          color: "error",
        },
      ],
      onChange: handleChangeStatusOferta,
    },
    {
      key: "nombrePuesto",
      nombre: "Creador",
    },
  ];

  const [adminEmpresa, setAdminEmpresa] = useState<AdminEmpresa[]>([]);
  const [ofertaEmpresa, setOfertaEmpresa] = useState<Oferta[]>([]);
  const [isFocused3, setIsFocused3] = useState(false);
  const [dataEmpresa, setDataEmpresa] = useState<any>(null);

  const handleDeletePersonal = () => {
    MySwal.fire({
      title: "Por favor, espere...",
      didOpen: () => {
        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
        MySwal.showLoading();
      },
      allowOutsideClick: false,
    });

    setTimeout(() => {
      MySwal.fire({
        icon: "success",
        title: "Eliminado",
        text: "Registro eliminado correctamente",
        timer: 3000,
        showConfirmButton: false,
      });
    }, 2000);
  };

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

    axios
      .post("/oferta_x_empresa", {
        ofertaId: localStorage.getItem("idEmpresa"),
      })
      .then((data) => {
        console.log("success", data);
        setOfertaEmpresa(data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });

    axios
      .post("/consulta_empresa", {
        id: localStorage.getItem("idEmpresa"),
      })
      .then((data) => {
        console.log("ConsultaEmpresa", data);
        setDataEmpresa(data.data);
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
                src="./img/empresa.jpg"
                alt="Profile"
                width="200"
                className="block mx-auto my-5 rounded-full"
              />
              <div className="text-xl font-bold text-center">
                {dataEmpresa !== null ? dataEmpresa.empresaNombre : "--"}
              </div>
              <div className="text-center">
                {dataEmpresa !== null ? dataEmpresa.tipoEmpresa : "--"}HOLA
              </div>
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold flex justify-center">Datos</div>
              <div className="flex items-center mt-2">
                <div> <b>Estatus: </b> Activo</div>
              </div>
              <div className="flex items-center mt-2">
                <div><b>RFC:</b> 234567</div>
              </div>
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
          
          <div className="col-span-2 flex flex-col gap-6">
            {localStorage.getItem("tipoUsuarioEmpresa") === "1" && (
              <TableComponent
                titulo="Personal"
                dataHead={dataHeadPersonal}
                data={adminEmpresa}
                showButtonCreate={false}
                textButtonCreate="Crear Reclutador"
                formCreate={<VacanteForm />}
                handleForm={handleDeletePersonal}
                showActions={false}
                width="md"
              />
            )}
            <TableComponent
              titulo="Ofertas"
              dataHead={dataHeadOferta}
              data={ofertaEmpresa}
              showButtonCreate={false}
              textButtonCreate="Crear Oferta"
              formCreate={<VacanteForm />}
              handleForm={handleDeletePersonal}
              enabledChangeSelect={
                localStorage.getItem("tipoUsuarioEmpresa") === "1"
              }
              showActions={false}
              width="md"
            />

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

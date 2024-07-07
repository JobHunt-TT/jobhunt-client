import {
  faInstagram,
  faSquareFacebook,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { VacanteForm } from "../forms";
import { useEffect, useState } from "react";
import axios from "axios";
import { ContentLayout } from "../layouts";
import { AdminEmpresa, Aplicante, DataHeadTable, Oferta } from "../types";
import { TableComponent } from "../components";
import { RegistroReclutador } from "../forms/RegistroReclutador";

const MySwal = withReactContent(Swal);

export const ProfileEncargadoPage = () => {

  const [adminEmpresa, setAdminEmpresa] = useState<AdminEmpresa[]>([]);
  const [ofertaEmpresa, setOfertaEmpresa] = useState<Oferta[]>([]);
  const [aplicantes, setAplicantes] = useState<Aplicante[]>([]);
  const [dataEmpresa, setDataEmpresa] = useState<any>(null);

  const consultaAplicantes = () => {
    axios
      .post("/consulta_aplicantes", {
        id: localStorage.getItem("idEmpresa"),
      })
      .then((data) => {
        console.log("aplicantes", data);
        setAplicantes(data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const consultaAdmins = () => {
    axios
      .post("/consulta_admin_x_empresa", {
        id: localStorage.getItem("idEmpresa"),
      })
      .then((data) => {
        console.log("AdminEmpresa", data);
        setAdminEmpresa(data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const consultaOfertas = () => {
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
  };

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

  const handleChangeStatusPostulacion = (id: string, idStatus: string) => {
    console.log("Endpoint para cambiar status", id, idStatus);
    axios
      .post("/cambio_status_aplicacion", {
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

  const dataHeadPostulaciones: DataHeadTable[] = [
    {
      key: "nombreOferta",
      nombre: "Nombre",
    },
    {
      key: "fecha",
      nombre: "Fecha",
      isDate: true,
    },
    {
      keyId: "id",
      key: "estatusId",
      nombre: "Estatus",
      isSelectColor: true,
      configSelectColor: [
        {
          label: "Validado",
          value: 1,
          color: "success",
        },
        {
          label: "En Validación",
          value: 2,
          color: "info",
        },
        {
          label: "Rechazado",
          value: 3,
          color: "error",
        },
      ],
      onChange: handleChangeStatusPostulacion,
    },
    {
      key: "nombre",
      nombre: "Aspirante",
    },
  ];
  const handleDeletePersonal = (id: string) => {
    MySwal.fire({
      title: "Por favor, espere...",
      didOpen: () => {
        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
        MySwal.showLoading();
      },
      allowOutsideClick: false,
    });

    axios
      .post("/baja_admin", {
        id,
      })
      .then((data) => {
        consultaAdmins();
        MySwal.fire({
          icon: "success",
          title: "Eliminado",
          text: "Registro eliminado correctamente",
          timer: 3000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.log("error", error);

        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error en al iniciar sesión",
          timer: 3000,
          showConfirmButton: false,
        });
      });
  };

  useEffect(() => {
    consultaAplicantes();
    consultaAdmins();
    consultaOfertas();

    axios
      .post("/consulta_empresa", {
        id: localStorage.getItem("idEmpresa"),
      })
      .then((data) => {
        console.log("success", data);
        setDataEmpresa(data.data.empresaNombre);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  //adminEmpresas
  var administradorEmpresa;

  for (let num of adminEmpresa) {
    if (num.usuarioEmpresaId === 1) {
      administradorEmpresa = num;
      console.log("EMPRESA", num);
    }
  }

  return (
    <ContentLayout>
      <div className="w-4/5 mx-auto my-16">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <div className="bg-white rounded-md p-4">
              <div className="text-3xl font-bold text-center">Encargado</div>
              <img
                src="./img/Encargado.jpg"
                alt="Profile"
                width="250"
                className="block mx-auto my-5 rounded-full"
              />
              <div className="text-xl font-bold text-center">
                {administradorEmpresa?.userName}{" "}
                {administradorEmpresa?.userApellido}
              </div>
              <div className="text-center">
                {administradorEmpresa?.userCargo}
              </div>
              <div className="text-l font-bold text-center">{dataEmpresa}</div>
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">Contacto</div>
              <div className="flex items-center mt-2">
                <FontAwesomeIcon icon={faEnvelope} className="text-lg mr-2" />
                <div>{administradorEmpresa?.userEmail}</div>
              </div>
              <div className="flex items-center mt-2">
                <FontAwesomeIcon icon={faPhone} className="text-lg mr-2" />
                <div>{administradorEmpresa?.userPhone}</div>
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
                showButtonCreate={true}
                textButtonCreate="Crear Reclutador"
                formCreate={<RegistroReclutador />}
                showActions={false}
                handleForm={handleDeletePersonal}
                keyId="id"
                width="md"
              />
            )}
            <TableComponent
              titulo="Ofertas"
              dataHead={dataHeadOferta}
              data={ofertaEmpresa}
              showButtonCreate={true}
              textButtonCreate="Crear Oferta"
              formCreate={<VacanteForm />}
              handleForm={handleDeletePersonal}
              enabledChangeSelect={
                localStorage.getItem("tipoUsuarioEmpresa") === "1"
              }
              showActions={false}
              width="md"
            />

            <TableComponent
              titulo="Postulaciones"
              dataHead={dataHeadPostulaciones}
              data={aplicantes}
              showActions={false}
              width="md"
            />
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

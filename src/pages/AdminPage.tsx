import axios from "axios";
import { useEffect, useState } from "react";
import { ContentLayout } from "../layouts";
import { DataEnterprise, DataHeadTable, DataUser, Oferta, TipoEmpresa } from "../types";
import { TableComponent } from "../components";

export const AdminPage = () => {
  const [enterprises, setEnterprises] = useState<DataEnterprise[]>([]);
  const [estudiantes, setEstudiantes] = useState<DataUser[]>([]);
  const [postulaciones, setPostulaciones] = useState<Oferta[]>([]);
  const [formatEnterprises, setFormatEnterprises] = useState<DataEnterprise[]>(
    []
  );
  const [tipoEmpresa, setTipoEmpresa] = useState<TipoEmpresa[]>([]);

  const getTipoEmpresa = (id: number): string => {
    const tipo = tipoEmpresa.find((tipo) => tipo.id === id);
    return tipo !== undefined ? tipo.descripcion : "No hay tipo";
  };

  const loadDataEmpresas = () => {
    axios
      .post("/consulta_empresas")
      .then((data) => {
        console.log("success", data);
        setEnterprises(data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const loadDataEstudiantes = () => {
    axios
      .post("/consulta_estudiantes")
      .then((data) => {
        console.log("success", data);
        setEstudiantes(data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // const loadDataPostulaciones = () => {
  //   axios
  //     .post("/consulta_estudiantes")
  //     .then((data) => {
  //       console.log("success", data);
  //       setPostulaciones(data.data);
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  // };

  const handleChangeStatus = (id: string, idStatus: string) => {
    console.log("Endpoint para cambiar status", id, idStatus);
    axios
      .post("/cambio_status_empresa", {
        id,
        id2: idStatus,
      })
      .then((data) => {
        console.log("success", data);
        loadDataEmpresas();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleChangeStatusEstudiante = (id: string, idStatus: string) => {
    console.log("Endpoint para cambiar status", id, idStatus);
    axios
      .post("/cambio_status_estudiante", {
        id,
        id2: idStatus,
      })
      .then((data) => {
        console.log("success", data);
        loadDataEstudiantes();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleChangeStatusPostulacion = (id: string, idStatus: string) => {
    console.log("Endpoint para cambiar status", id, idStatus);
    axios
      .post("/cambio_status_oferta", {
        id,
        id2: idStatus,
      })
      .then((data) => {
        console.log("success", data);
        // loadDataPostulaciones();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const dataHeadEmpresa: DataHeadTable[] = [
    {
      key: "empresaNombre",
      nombre: "Empresa",
    },
    {
      key: "userRFC",
      nombre: "RFC",
    },
    {
      key: "empresaGiro",
      nombre: "Giro",
    },
    {
      keyId: "empresaId",
      key: "statusId",
      nombre: "Estatus",
      isSelectColor: true,
      configSelectColor: [
        {
          label: "Pendiente",
          value: 0,
          color: "waring",
        },
        {
          label: "Aprobada",
          value: 1,
          color: "success",
        },
        {
          label: "Rechazada",
          value: 2,
          color: "error",
        },
      ],
      onChange: handleChangeStatus,
    },
  ];

  const dataHeadPostulacion: DataHeadTable[] = [
    {
      key: "nombreOferta",
      nombre: "Oferta",
    },
    {
      key: "nombre",
      nombre: "Nombre del Estudiante",
    },
    {
      key: "apellido",
      nombre: "Apellido del Estudiante",
    },
    {
      key: "fecha",
      nombre: "Fecha",
      isDate: true
    },
    {
      keyId: "id",
      key: "statusId",
      nombre: "Estatus",
      isSelectColor: true,
      configSelectColor: [
        {
          label: "En Validación",
          value: 1,
          color: "info",
        },
        {
          label: "Validado",
          value: 2,
          color: "success",
        },
        {
          label: "Rechazado",
          value: 3,
          color: "error",
        },
      ],
      onChange: handleChangeStatusPostulacion,
    },
  ];

  const dataHeadEstudiante: DataHeadTable[] = [
    {
      key: "userName",
      nombre: "Nombre",
    },
    {
      key: "userApellido",
      nombre: "Apellido",
    },
    {
      key: "userEmail",
      nombre: "Correo",
    },
    {
      keyId: "id",
      key: "estatusId",
      nombre: "Estatus",
      isSelectColor: true,
      configSelectColor: [
        {
          label: "Inactivo",
          value: 0,
          color: "waring",
        },
        {
          label: "Aprobado",
          value: 1,
          color: "success",
        },
        {
          label: "Bloqueado",
          value: 2,
          color: "error",
        },
      ],
      onChange: handleChangeStatusEstudiante,
    },
  ];

  useEffect(() => {
    const newEnterprises = enterprises.map((enterprise) => {
      return {
        ...enterprise,
        empresaGiro: getTipoEmpresa(enterprise.tipoEmpresaId),
      };
    });
    setFormatEnterprises(newEnterprises);
  }, [enterprises]);

  useEffect(() => {
    loadDataEmpresas();
    loadDataEstudiantes();
    // loadDataPostulaciones();
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
    <ContentLayout>
      <div className="w-4/5 mx-auto py-16">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <TableComponent
              titulo="Empresas"
              dataHead={dataHeadEmpresa}
              data={formatEnterprises}
              showActions={false}
              enabledTableCount
              keyIdByCount="statusId"
            />
          </div>
          <div className="col-span-2">
            <TableComponent
              titulo="Estudiantes"
              dataHead={dataHeadEstudiante}
              data={estudiantes}
              showActions={false}
              enabledTableCount
              keyIdByCount="estatusId"
            />
          </div>
        
          {/* <div className="col-span-2">
            <TableComponent
              titulo="Postulaciones"
              dataHead={dataHeadPostulacion}
              data={postulaciones}
              showActions={false}
              enabledTableCount
              keyIdByCount="estatusId"
            />
          </div> */}
        </div>
      </div>
    </ContentLayout>
  );
};

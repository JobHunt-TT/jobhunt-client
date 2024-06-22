import axios from "axios";
import { useEffect, useState } from "react";
import { ContentLayout } from "../layouts";
import { DataEnterprise, DataHeadTable, TipoEmpresa } from "../types";
import { TableComponent } from "../components";

const dataHead: DataHeadTable[] = [
  {
    key: "empresaNombre",
    nombre: "Empresa"
  },
  {
    key: "userRFC",
    nombre: "RFC"
  },
  {
    key: "empresaGiro",
    nombre: "Giro"
  }
] 

export const AdminPage = () => {
  const [enterprises, setEnterprises] = useState<DataEnterprise[]>([]);
  const [formatEnterprises, setFormatEnterprises] = useState<DataEnterprise[]>([]);
  const [tipoEmpresa, setTipoEmpresa] = useState<TipoEmpresa[]>([]);

  const getTipoEmpresa = (id: number): string => {
    const tipo = tipoEmpresa.find((tipo) => tipo.id === id);
    return tipo !== undefined ? tipo.descripcion : "No hay tipo";
  };

  useEffect(() => {
    const newEnterprises = enterprises.map(enterprise => {
      return {...enterprise, empresaGiro: getTipoEmpresa(enterprise.tipoEmpresaId)}
    });
    setFormatEnterprises(newEnterprises);
  }, [enterprises])
  

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
    <ContentLayout>
      <div className="w-4/5 mx-auto py-16">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
           <TableComponent titulo="Empresas" dataHead={dataHead} data={formatEnterprises} />
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

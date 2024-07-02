import axios from "axios";
import { useEffect, useState } from "react";
import { ContentLayout } from "../layouts";
import { DataEnterprise, DataUser, Oferta } from "../types";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

export const AdminStatsPage = () => {
  const [enterprises, setEnterprises] = useState<DataEnterprise[]>([]);
  const [estudiantes, setEstudiantes] = useState<DataUser[]>([]);
  const [ofertas, setOfertas] = useState<Oferta[]>([]);

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

  const loadDataOfertas = () => {
    axios
      .post("/consulta_ofertas")
      .then((data) => {
        console.log("success", data);
        setOfertas(data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Gráfica de Empresas",
      },
    },
  };

  const optionsEstudiantes = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Gráfica de Estudiantes",
      },
    },
  };

  const optionsOfertas = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Gráfica de Ofertas",
      },
    },
  };

  useEffect(() => {
    loadDataEmpresas();
    loadDataEstudiantes();
    loadDataOfertas();
  }, []);

  return (
    <ContentLayout>
      <div className="w-4/5 mx-auto py-16">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-1">
            <div className="bg-white w-full h-96 rounded-md p-4">
              <Pie
                data={{
                  labels: ["Pendiente", "Aprobada", "Rechazada"],
                  datasets: [
                    {
                      label: "# de Empresas",
                      data: [
                        enterprises.filter((filter) => filter.statusId === 0)
                          .length,
                        enterprises.filter((filter) => filter.statusId === 1)
                          .length,
                        enterprises.filter((filter) => filter.statusId === 2)
                          .length,
                      ],
                      backgroundColor: ["#ca8a0433", "#16a34a33", "#dc262633"],
                      borderColor: ["#ca8a04", "#16a34a", "#dc2626"],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={options}
              />
            </div>
          </div>
          
          <div className="col-span-1">
            <div className="bg-white w-full h-96 rounded-md p-4">
              <Pie
                data={{
                  labels: ["Inactivo", "Aprobado", "Bloqueado"],
                  datasets: [
                    {
                      label: "# de Estudiantes",
                      data: [
                        estudiantes.filter((filter) => filter.estatusId === 2)
                          .length,
                        estudiantes.filter((filter) => filter.estatusId === 1)
                          .length,
                        estudiantes.filter((filter) => filter.estatusId === 3)
                          .length,
                      ],
                      backgroundColor: ["#2563eb33", "#16a34a33", "#dc262633"],
                      borderColor: ["#2563eb", "#16a34a", "#dc2626"],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={optionsEstudiantes}
              />
            </div>
          </div>

          <div className="col-span-1">
            <div className="bg-white w-full h-96 rounded-md p-4">
              <Pie
                data={{
                  labels: ["En Espera", "Aprobada", "Rechazada"],
                  datasets: [
                    {
                      label: "# de Ofertas",
                      data: [
                        ofertas.filter((filter) => filter.estatusId === 1)
                          .length,
                        ofertas.filter((filter) => filter.estatusId === 2)
                          .length,
                        ofertas.filter((filter) => filter.estatusId === 3)
                          .length,
                      ],
                      backgroundColor: ["#ca8a0433", "#16a34a33", "#dc262633"],
                      borderColor: ["#ca8a04", "#16a34a", "#dc2626"],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={optionsOfertas}
              />
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

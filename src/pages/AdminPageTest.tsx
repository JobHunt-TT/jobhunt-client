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
import { ContentLayout } from "../layouts";

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

export const AdminPageTest = () => {
  const [enterprises, setEnterprises] = useState<DataEnterprise[]>([]);
  const [tipoEmpresa, setTipoEmpresa] = useState<TipoEmpresa[]>([]);
  const [filters, setFilters] = useState({
    empresaNombre: "",
    userRFC: "",
    tipoEmpresa: "",
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFocused, setIsFocused] = useState({
    empresaNombre: false,
    userRFC: false,
    tipoEmpresa: false,
  });

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocusChange = (name: keyof typeof isFocused, focusState: boolean) => {
    setIsFocused((prevState) => ({
      ...prevState,
      [name]: focusState,
    }));
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  const filteredEnterprises = enterprises.filter((enterprise) => {
    return (
      enterprise.empresaNombre.toLowerCase().includes(filters.empresaNombre.toLowerCase()) &&
      enterprise.userRFC.toLowerCase().includes(filters.userRFC.toLowerCase()) &&
      getTipoEmpresa(enterprise.tipoEmpresaId).toLowerCase().includes(filters.tipoEmpresa.toLowerCase())
    );
  });

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedEnterprises = filteredEnterprises.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredEnterprises.length / rowsPerPage);

  return (
    <ContentLayout>
      <div className="w-4/5 mx-auto py-16">
        <div className="bg-white rounded-md px-4 pt-2 pb-4">
          <div className="text-politectico font-bold text-3xl">Empresas</div>
          <div className="flex justify-end gap-6 my-4">
            <div className="flex items-center h-full gap-2">
              <div className="text-gray-600">Filas por página</div>
              <select
                className="bg-white border-[3px] border-gray-300 pl-2 py-1 rounded-md"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="flex h-full items-center ">
              <div className="text-gray-600 mr-4">
                {startIndex + 1} - {Math.min(endIndex, filteredEnterprises.length)} de{" "}
                {filteredEnterprises.length}
              </div>
              <div className="grid grid-cols-4 gap-4">
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className={`col-span-1 text-2xl ${
                    currentPage === 1 ? "text-gray-400" : "cursor-pointer text-black"
                  }`}
                  onClick={() => setCurrentPage(1)}
                />
                <FontAwesomeIcon
                  icon={faBackwardStep}
                  className={`col-span-1 text-2xl ${
                    currentPage === 1 ? "text-gray-400" : "cursor-pointer text-black"
                  }`}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                />
                <FontAwesomeIcon
                  icon={faForwardStep}
                  className={`col-span-1 text-2xl ${
                    currentPage === totalPages ? "text-gray-400" : "cursor-pointer text-black"
                  }`}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                />
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className={`col-span-1 text-2xl ${
                    currentPage === totalPages ? "text-gray-400" : "cursor-pointer text-black"
                  }`}
                  onClick={() => setCurrentPage(totalPages)}
                />
              </div>
            </div>
          </div>
          <table className="w-full border-b-[3px] border-politectico">
            <thead>
              <tr className="bg-politectico text-white font-semibold">
                <th className="px-4 py-3 rounded-tl-md">Empresa</th>
                <th className="px-4 py-3">RFC</th>
                <th className="px-4 py-3">Giro</th>
                <th className="px-4 py-3 rounded-tr-md text-center">Acciones</th>
              </tr>
              <tr className="bg-gray-200">
                {Object.keys(filters).map((key) => (
                  <th key={key} className="px-4 py-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={`Buscar por ${key.charAt(0).toUpperCase() + key.slice(1)}...`}
                        name={key}
                        className="w-full py-2 px-5 border-[3px] text-base transition-all duration-300 ease-in-out border-gray-300 rounded-full outline-none focus:border-politectico"
                        onFocus={() => handleFocusChange(key as keyof typeof isFocused, true)}
                        onBlur={() => handleFocusChange(key as keyof typeof isFocused, false)}
                        onChange={handleFilterChange}
                      />
                      <FontAwesomeIcon
                        icon={faSearch}
                        className={`absolute right-4 top-3.5 text-lg transition-colors ${
                          isFocused[key as keyof typeof isFocused] ? "text-politectico" : "text-gray-300"
                        }`}
                      />
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedEnterprises.map(
                ({ empresaId, empresaNombre, userRFC, tipoEmpresaId }, index) => (
                  <tr className={`${index % 2 === 1 && "bg-gray-200"}`} key={index}>
                    <td className="px-4 py-3">{empresaNombre}</td>
                    <td className="px-4 py-3">{userRFC}</td>
                    <td className="px-4 py-3">{getTipoEmpresa(tipoEmpresaId)}</td>
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
    </ContentLayout>
  );
};

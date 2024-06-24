import {
  faBackwardStep,
  faChevronLeft,
  faChevronRight,
  faFilter,
  faForwardStep,
  faSearch,
  faSquareCheck,
  faSquareMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { TableCell, TableFilterCheck, TableRow } from "./";
import { DataHeadTable, WidthTable } from "../../types";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface TableComponentProps<T> {
  titulo: string;
  dataHead: DataHeadTable[];
  data: T[];
  width?: WidthTable;
  showActions?: boolean;
  showButtonCreate?: boolean;
  textButtonCreate?: string;
  formCreate?: JSX.Element;
  keyId?: string;
  handleForm?: () => void;
}

export const TableComponent = <T,>({
  titulo,
  dataHead,
  data,
  width = "xl",
  showActions = true,
  showButtonCreate = false,
  textButtonCreate,
  formCreate,
  handleForm,
}: TableComponentProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataFilteed, setDataFilteed] = useState<T[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>(
    dataHead.map((field) => field.key)
  );

  const handleFilterAllChange = () => {
    if (selectedFields.length !== 0) {
      setSelectedFields([]);
    } else {
      setSelectedFields(dataHead.map((field) => field.key));
    }
  };

  const handleFilterChange = (key?: string) => {
    setSelectedFields((prev) =>
      prev.includes(key || "")
        ? prev.filter((item) => item !== key || "")
        : [...prev, key || ""]
    );
  };

  const handleDeleteModal = () => {
    MySwal.fire({
      icon: "warning",
      title: "Advertencia",
      text: `¿Estás seguro de querer borrar este registro?`,
      showCancelButton: true,
      confirmButtonText: "Si, borrar",
      cancelButtonText: "No, cancelar",
      confirmButtonColor: "#16A34A",
      cancelButtonColor: "#DC2626",
    }).then(({ isConfirmed }) => {
      isConfirmed && !!handleForm && handleForm();
    });
  };

  const handleOpenModal = () => {
    MySwal.fire({
      html: formCreate,
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

  const filterData = () => {
    console.log("Se filtra por:", selectedFields);

    const filteredData =
      selectedFields.length === 0
        ? data
        : data.filter((item) =>
            selectedFields.some((key) =>
              String(item[key as keyof T])
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
          );
    console.log(filteredData);

    setDataFilteed(filteredData);
  };

  useEffect(filterData, [data, selectedFields, searchTerm]);

  useEffect(() => {
    setDataFilteed(data);
  }, [data]);

  return (
    <div className="bg-white rounded-md p-4">
      <div className="flex justify-between">
        <div
          className={`text-politectico font-bold ${
            width === "xl" ? "text-3xl" : "text-2xl"
          } `}
        >
          {titulo}
        </div>
        {showButtonCreate && (
          <button
            className="bg-politectico text-white px-6 py-2 font-semibold rounded-full"
            onClick={handleOpenModal}
          >
            {textButtonCreate}
          </button>
        )}
      </div>
      <div className="grid grid-cols-8 gap-2 my-4">
        <div
          className={`flex items-center ${
            width === "xl" ? "col-span-3" : "col-span-3"
          }`}
        >
          <div className="relative flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                className="w-full py-2 px-5 border-[3px] text-base transition-all duration-300 ease-in-out border-gray-300 rounded-full outline-none focus:border-politectico"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className={`absolute right-4 top-3.5 text-lg transition-colors ${
                  isFocused ? "text-politectico" : "text-gray-300"
                }`}
              />
            </div>
            <FontAwesomeIcon
              icon={faFilter}
              onClick={() => setShowFilter(!showFilter)}
              className="ml-4 text-2xl text-gray-400 cursor-pointer transition-colors duration-150 hover:text-politectico"
            />
            <div
              className={`absolute left-0 top-14 w-full flex-col gap-2 bg-white p-4 rounded-md shadow-float transition-all duration-300 ease-in-out ${
                showFilter
                  ? "opacity-100 translate-y-0 pointer-events-auto visible"
                  : "opacity-0 translate-y-[-10px] pointer-events-none invisible"
              }`}
            >
              <TableFilterCheck
                icon={
                  selectedFields.length === dataHead.length
                    ? faSquareCheck
                    : selectedFields.length < dataHead.length &&
                      selectedFields.length !== 0
                    ? faSquareMinus
                    : faSquare
                }
                isDefault
                onClick={handleFilterAllChange}
              />
              {dataHead.map((head, index) => (
                <div key={index}>
                  {!head.isSelectColor && (
                    <TableFilterCheck
                      itemHead={head}
                      icon={
                        selectedFields.includes(head.key)
                          ? faSquareCheck
                          : faSquare
                      }
                      onClick={handleFilterChange}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`flex justify-end gap-6 ${
            width === "xl" ? "col-span-5" : "col-span-5"
          }`}
        >
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
          {dataHead.map((head, index) => (
            <TableCell dataHead={head} key={index} />
          ))}
          {showActions && (
            <TableCell
              dataHead={{ key: "actions", nombre: "Acciones", center: true }}
            />
          )}
        </tr>
        <tbody>
          {dataFilteed.length === 0 ? (
            <tr>
              <td
                colSpan={dataHead.length + 1}
                className={`px-4 py-3 text-center`}
              >
                No hay información
              </td>
            </tr>
          ) : (
            <>
              {dataFilteed.map((item, index) => (
                <TableRow
                  dataHead={dataHead}
                  item={item}
                  index={index}
                  key={index}
                  showActions={showActions}
                  onClickIcon={handleDeleteModal}
                />
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

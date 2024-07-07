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
import { useEffect, useRef, useState } from "react";
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
  keyId?: string;
  width?: WidthTable;
  enabledChangeSelect?: boolean;
  showActions?: boolean;
  showButtonCreate?: boolean;
  textButtonCreate?: string;
  formCreate?: JSX.Element;
  keyIdByCount?: string;
  enabledTableCount?: boolean;
  handleForm?: (id: string) => void;
}

export const TableComponent = <T,>({
  titulo,
  dataHead,
  data,
  keyId,
  width = "xl",
  enabledChangeSelect = true,
  showActions = true,
  showButtonCreate = false,
  textButtonCreate,
  formCreate,
  keyIdByCount,
  enabledTableCount = false,
  handleForm,
}: TableComponentProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSelect, setFilterSelect] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFilteed, setDataFilteed] = useState<T[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>(
    dataHead.map((field) => field.key)
  );
  const [extraSelectedFields, setExtraSelectedFields] = useState<string[]>(
    dataHead.filter((field) => field.isSelectColor).length !== 0
      ? dataHead
          .filter((field) => field.isSelectColor)[0]
          .configSelectColor?.map((config) => config.value.toString()) || []
      : []
  );
  const filterRef = useRef<HTMLDivElement>(null);

  const handleFilterAllChange = () => {
    if (selectedFields.length !== 0) {
      setSelectedFields([]);
      setExtraSelectedFields([]);
    } else {
      setSelectedFields(dataHead.map((field) => field.key));
      setExtraSelectedFields(
        dataHead
          .filter((field) => field.isSelectColor)[0]
          .configSelectColor?.map((config) => config.value.toString()) || []
      );
    }
  };

  const handleFilterChange = (key?: string) => {
    const head = dataHead.filter((field) => field.key === key);
    if (head[0].isSelectColor) {
      if (extraSelectedFields.length !== 0) {
        setExtraSelectedFields([]);
      } else {
        setExtraSelectedFields(
          dataHead
            .filter((field) => field.isSelectColor)[0]
            .configSelectColor?.map((config) => config.value.toString()) || []
        );
      }
    }

    setSelectedFields((prev) =>
      prev.includes(key || "")
        ? prev.filter((item) => item !== key || "")
        : [...prev, key || ""]
    );
  };

  const handleExtraFilterChange = (key?: string) => {
    const newSelectedFields = selectedFields;
    const keyParent = dataHead.filter((field) => field.isSelectColor)[0].key;
    const index = selectedFields.indexOf(keyParent);
    if (extraSelectedFields.length === 0) {
      newSelectedFields.push(keyParent);
    } else {
      if (index !== -1) {
        newSelectedFields.splice(index, 1);
      }
    }

    setSelectedFields(newSelectedFields);
    console.log(extraSelectedFields);
    setExtraSelectedFields((prev) =>
      prev.includes(key || "")
        ? prev.filter((item) => item !== key || "")
        : [...prev, key || ""]
    );
  };

  const handleDeleteModal = (id: string) => {
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
      isConfirmed && !!handleForm && handleForm(id);
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

    if (dataHead.filter((field) => field.isSelectColor).length !== 0) {
      const keyParent = dataHead.filter((field) => field.isSelectColor)[0].key;
      const newFilteredData =
        extraSelectedFields.length === 0
          ? filteredData
          : filteredData.filter((item) =>
              extraSelectedFields.includes(String(item[keyParent as keyof T]))
            );

      console.log(newFilteredData);
      setDataFilteed(newFilteredData);
    } else {
      setDataFilteed(filteredData);
    }
  };

  const startIndex = (currentPage - 1) * filterSelect;
  const endIndex = startIndex + filterSelect;
  // const paginatedEnterprises = data.slice(startIndex, endIndex);
  // const totalPages = Math.ceil(data.length / filterSelect);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef]);

  useEffect(filterData, [
    data,
    selectedFields,
    extraSelectedFields,
    searchTerm,
    dataHead,
  ]);

  useEffect(() => {
    setDataFilteed(data.slice(startIndex, endIndex))
  }, [data, startIndex, endIndex])
  

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
              onClick={() => {
                !showFilter && setShowFilter(!showFilter);
              }}
              className="ml-4 text-2xl text-gray-400 cursor-pointer transition-colors duration-150 hover:text-politectico"
            />
            <div
              ref={filterRef}
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
                  {!head.isSelectColor ? (
                    <TableFilterCheck
                      itemHead={head}
                      icon={
                        selectedFields.includes(head.key)
                          ? faSquareCheck
                          : faSquare
                      }
                      onClick={handleFilterChange}
                    />
                  ) : (
                    <div>
                      <TableFilterCheck
                        itemHead={head}
                        icon={
                          extraSelectedFields.length ===
                          dataHead[index].configSelectColor!.length
                            ? faSquareCheck
                            : extraSelectedFields.length <
                                dataHead[index].configSelectColor!.length &&
                              extraSelectedFields.length !== 0
                            ? faSquareMinus
                            : faSquare
                        }
                        onClick={handleFilterChange}
                      />
                      <div className="ml-6">
                        {head.configSelectColor?.map(
                          ({ value, label }, index) => (
                            <TableFilterCheck
                              key={index}
                              itemHead={{
                                nombre: label,
                                key: value.toString(),
                              }}
                              icon={
                                extraSelectedFields.includes(value.toString())
                                  ? faSquareCheck
                                  : faSquare
                              }
                              onClick={handleExtraFilterChange}
                            />
                          )
                        )}
                      </div>
                    </div>
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
            <select
              className="bg-white border-[3px] border-gray-300 pl-2 py-1 rounded-md"
              value={filterSelect}
              onChange={(e) => setFilterSelect(parseInt(e.target.value))}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div className="flex h-full items-center ">
            <div className="text-gray-600 mr-4">{startIndex + 1} - {Math.min(endIndex, data.length)} de {data.length}</div>
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
      {enabledTableCount &&
        dataHead.filter((filter) => filter.key === keyIdByCount).length !==
          0 && (
          <table className="w-full border-b-[3px] border-politectico my-4">
            <tr className="bg-politectico text-white font-semibold">
              <TableCell
                dataHead={{
                  key: "noCounter",
                  nombre: `No. ${titulo}`,
                  center: true,
                }}
              />
              {dataHead
                .filter((filter) => filter.key === keyIdByCount)[0]
                .configSelectColor?.map(({ label, value }, index) => (
                  <TableCell
                    dataHead={{
                      key: `${value}${label}`,
                      nombre: `${label}s`,
                      center: true,
                    }}
                    key={index}
                  />
                ))}
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
                <tr>
                  <TableCell
                    dataHead={{
                      key: "noCounter",
                      nombre: `${dataFilteed.length}`,
                      center: true,
                    }}
                  />
                  {/* {dataHead
                  .filter((filter) => filter.key === keyIdByCount)[0]
                  .configSelectColor?.map(({ label, value }, index) => (
                    <TableCell
                      dataHead={{
                        key: `${value}${label}`,
                        nombre: `${label}s`,
                      }}
                      key={index}
                    />
                  ))} */}
                  {dataHead
                    .filter((filter) => filter.key === keyIdByCount)[0]
                    .configSelectColor?.map(({ label, value }, index) => {
                      const count = dataFilteed.filter(
                        (filter) =>
                          String(filter[keyIdByCount as keyof T]) ===
                          value.toString()
                      );
                      return (
                        <TableCell
                          dataHead={{
                            key: `${value}${label}`,
                            nombre: `${count.length}`,
                            center: true,
                          }}
                          key={index}
                        />
                      );
                    })}
                </tr>
              )}
            </tbody>
          </table>
        )}
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
                  enabledChangeSelect={enabledChangeSelect}
                  showActions={showActions}
                  onClickIcon={() => handleDeleteModal(String(item[keyId as keyof T]))}
                />
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

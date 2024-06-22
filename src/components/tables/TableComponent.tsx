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
import { DataHeadTable } from "../../types";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

interface TableComponentProps<T> {
  titulo: string;
  dataHead: DataHeadTable[];
  data: T[];
}

export const TableComponent = <T,>({
  titulo,
  dataHead,
  data,
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
    <div className="bg-white rounded-md px-4 pt-2 pb-4">
      <div className="text-politectico font-bold text-3xl">{titulo}</div>
      <div className="grid grid-cols-8 gap-2 my-4">
        <div className="col-span-2 relative">
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
        <div className="col-span-2 flex items-center relative">
          <FontAwesomeIcon
            icon={faFilter}
            onClick={() => setShowFilter(!showFilter)}
            className="ml-4 text-2xl text-gray-400 cursor-pointer transition-colors duration-150 hover:text-politectico"
          />
          <div
            className={`absolute left-14 top-0 w-full flex flex-col gap-2 bg-white p-4 rounded-md shadow-float transition-all duration-300 ease-in-out ${
              showFilter
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[-10px]"
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
              <TableFilterCheck
                itemHead={head}
                icon={
                  selectedFields.includes(head.key) ? faSquareCheck : faSquare
                }
                onClick={handleFilterChange}
                key={index}
              />
            ))}
          </div>
        </div>
        <div className="col-span-1"></div>
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
          {dataHead.map((head, index) => (
            <TableCell dataHead={head} key={index} />
          ))}
          <td className="px-4 py-3 rounded-tr-md text-center">Acciones</td>
        </tr>
        <tbody>
          {dataFilteed.map((item, index) => (
            <TableRow
              dataHead={dataHead}
              item={item}
              index={index}
              key={index}
            />
            // <tr className={`${index % 2 === 1 && "bg-gray-200"}`} key={index}>
            //   {dataHead.map(({ key, center }, index) => (
            //     <td
            //       className={`px-4 py-3 ${center && "text-center"}`}
            //       key={index}
            //     >
            //       {String(item[key as keyof T])}
            //     </td>
            //   ))}
            //   <td className="px-4 py-3 text-center">
            //     <FontAwesomeIcon
            //       icon={faPen}
            //       className="fa-solid fa-pen mx-1 text-yellow-500"
            //     />
            //     <FontAwesomeIcon
            //       icon={faTrash}
            //       className="fa-solid fa-trash mx-1 text-red-500"
            //     />
            //   </td>
            // </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataHeadTable } from "../../types";
import { TableCell } from "./TableCell";

interface TableRowProps<T> {
  item: T;
  dataHead: DataHeadTable[],
  index: number;
}

export const TableRow = <T,>({ dataHead, index, item }: TableRowProps<T>) => {
  return (
    <tr className={`${index % 2 === 1 && "bg-gray-200"}`}>
      {dataHead.map((data, index) => {
        const dataCell: DataHeadTable = {
          ...data,
          nombre: String(item[data.key as keyof T])
        }
        return <TableCell dataHead={dataCell} key={index} />
      })}
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
  );
};

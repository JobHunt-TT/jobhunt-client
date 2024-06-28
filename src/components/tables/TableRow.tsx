import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataHeadTable } from "../../types";
import { TableCell, TableCellSelect } from "./";
import { formatDate } from "../../utils";

interface TableRowProps<T> {
  item: T;
  dataHead: DataHeadTable[];
  index: number;
  enabledChangeSelect: boolean;
  showActions: boolean;
  onClickIcon: () => void
}

export const TableRow = <T,>({
  dataHead,
  index,
  item,
  enabledChangeSelect,
  showActions,
  onClickIcon
}: TableRowProps<T>) => {
  return (
    <tr className={`${index % 2 === 1 && "bg-gray-200"}`}>
      {dataHead.map((data, index) => {
        const dataCell: DataHeadTable = {
          ...data,
          nombre: data.isDate ? formatDate(String(item[data.key as keyof T])) : String(item[data.key as keyof T]),
          id: String(item[data.keyId as keyof T])
        };
        return data.isSelectColor ? (
          <TableCellSelect item={dataCell} key={index} enabledChangeSelect={enabledChangeSelect} />
        ) : (
          <TableCell dataHead={dataCell} key={index} />
        );
      })}

      {showActions && (
        <td className="px-4 py-3 text-center">
          <FontAwesomeIcon
            icon={faTrash}
            className="fa-solid fa-trash mx-1 text-red-500 cursor-pointer"
            onClick={() => onClickIcon()}
          />
        </td>
      )}
    </tr>
  );
};

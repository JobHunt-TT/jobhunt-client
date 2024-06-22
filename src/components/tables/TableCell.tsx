import { DataHeadTable } from "../../types";

interface TableCellProps{
  dataHead: DataHeadTable
}

export const TableCell = ({ dataHead }: TableCellProps) => {
  return <td className={`px-4 py-3 ${dataHead.center && "text-center"}`}>{dataHead.nombre}</td>;
};

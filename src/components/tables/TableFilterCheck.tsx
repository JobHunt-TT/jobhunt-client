import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataHeadTable } from "../../types";

interface TableFilterCheckProps {
  itemHead?: DataHeadTable;
  icon: IconDefinition;
  isDefault?: boolean;
  onClick: (key?: string) => void;
}

export const TableFilterCheck = ({
  itemHead,
  isDefault,
  icon,
  onClick,
}: TableFilterCheckProps) => {
  return (
    <div className="flex items-center">
      <button
        className="flex items-center text-politectico"
        onClick={() => onClick(itemHead?.key)}
      >
        <FontAwesomeIcon icon={icon} className="text-lg inline-block" />
        <div className="ml-2 font-semibold inline-block">
          {isDefault ? "Seleccionar Todo" : itemHead?.nombre}
        </div>
      </button>
    </div>
  );
};

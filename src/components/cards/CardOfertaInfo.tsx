import { Link, useNavigate } from "react-router-dom";
import { Oferta } from "../../types";

interface CardOfertaInfoProps {
  item: Oferta;
}

export const CardOfertaInfo = ({ item }: CardOfertaInfoProps) => {
  const navigate = useNavigate();

  const handleClickOferta = () => {
    console.log("Oferta", item);

    localStorage.setItem("idOferta", item.ofertaId.toString());
    navigate("/oferta");
  };

  return (
    <div className="bg-white rounded-md p-3" onClick={handleClickOferta}>
      <div className="font-bold text-xl text-politectico mb-2">
        {item.nombreOferta}
      </div>
      <div>
        <div className="font-bold">Vigencia</div>
        <div>{item.vigencia}</div>
      </div>
      <div>
        <div className="font-bold">Nombre del Puesto</div>
        <div>{item.nombrePuesto}</div>
      </div>
    </div>
  );
};

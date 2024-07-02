import { ContentLayout } from "../layouts";
import { useEffect, useState } from "react";
import axios from "axios";
import { Oferta } from "../types";
import { CardOfertaInfo } from "../components";

export const OfertasPage = () => {
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const initialData: any = {
    keywords: "",
    location: "",
    salary: "10,000 - 20,000",
    modality: "Presencial",
  };
  const [keywords, setKeywords] = useState(initialData.keywords);
  const [location, setLocation] = useState(initialData.location);
  const [salary, setSalary] = useState(initialData.salary);
  const [modality, setModality] = useState(initialData.modality);
  const [searchTerm, setSearchTerm] = useState("");

  const getSkills = () => {
    axios
      .post("/consulta_estudiante_tags", {
        id: localStorage.getItem("idUser"),
      })
      .then((data) => {
        console.log("success", data);
        let keywords = "";
        data.data.map((e: any) => {
          keywords += "" + e.descripcion + " ";
        });
        setKeywords(keywords);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const getLocation = () => {
    axios
      .post("/consulta_direccion", {
        id: localStorage.getItem("userDirectionId"),
      })
      .then((data) => {

        let location = data.data.estado + ", " + data.data.municipio;
        setLocation(location);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const fetchOfertas = () => {
    axios
      .post("/consulta_oferta_estudiante", {
        id: localStorage.getItem("idUser"),
      })
      .then((data) => {
        setOfertas(data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const searchOfertas = (descripcion: string) => {
    axios
      .post("/consulta_oferta_nombre", {
        descripcion: descripcion,
      })
      .then((data) => {
        setOfertas(data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    localStorage.removeItem("idOferta");
    getLocation();
    getSkills();
    fetchOfertas();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    searchOfertas(value);
  };

  return (
    <ContentLayout>
      <div className="w-4/5 mx-auto my-16">
        <div className="bg-white rounded-md grid grid-cols-5 gap-4 p-3">
          <div className="col-span-2">
            <div className="text-2xl font-bold mb-2 text-politectico">
              Buscar
            </div>
            <div className="bg-gray-200 rounded-md flex items-center">
              <input
                type="text"
                className="bg-transparent w-full py-3 px-4 outline-none"
                name=""
                id=""
                placeholder="Buscar vacante..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <i className="fa-solid fa-magnifying-glass mr-4 text-xl text-politectico"></i>
            </div>
          </div>
          <div className="col-span-3">
            <div className="text-2xl font-bold mb-2 text-politectico">
              Búsqueda avanzada
            </div>
            <div className="grid grid-cols-4">
              <div>
                <div className="font-bold">Palabras Clave</div>
                <div>{keywords}</div>
              </div>
              <div>
                <div className="font-bold">Ubicación</div>
                <div>{location}</div>
              </div>
              <div>
                <div className="font-bold">Rango Salarial</div>
                <div>{salary}</div>
              </div>
              <div>
                <div className="font-bold">Modalidad</div>
                <div>{modality}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-8 gap-4">
          {ofertas.map((oferta, index) => (
            <CardOfertaInfo item={oferta} key={index} />
          ))}
        </div>
      </div>
    </ContentLayout>
  );
};

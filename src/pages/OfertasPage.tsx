import { Link } from "react-router-dom";
import { ContentLayout } from "../layouts";

export const OfertasPage = () => {
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
              />
              <i className="fa-solid fa-magnifying-glass mr-4 text-xl text-politectico"></i>
            </div>
          </div>
          <div className="col-span-3">
            <div className="text-2xl font-bold mb-2 text-politectico">
              Filtros
            </div>
            <div className="grid grid-cols-4">
              <div>
                <div className="font-bold">Palabras Clave</div>
                <div>Java, SQL, Python, C</div>
              </div>
              <div>
                <div className="font-bold">Ubicación</div>
                <div>México</div>
              </div>
              <div>
                <div className="font-bold">Rango Salarial</div>
                <div>10,000 - 20,000</div>
              </div>
              <div>
                <div className="font-bold">Modalidad</div>
                <div>Remota</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-8 gap-4">
          <Link to={'/oferta'} className="bg-white rounded-md p-3">
            <div className="font-bold text-xl text-politectico mb-2">
              Desarrollador Backend
            </div>
            <div>
              <div className="font-bold">Ubicación</div>
              <div>Ciudad de México</div>
            </div>
            <div>
              <div className="font-bold">Modalidad</div>
              <div>Remota</div>
            </div>
          </Link>
          <Link to={'/oferta'} className="bg-white rounded-md p-3">
            <div className="font-bold text-xl text-politectico mb-2">
              Java Developer
            </div>
            <div>
              <div className="font-bold">Ubicación</div>
              <div>Ciudad de México</div>
            </div>
            <div>
              <div className="font-bold">Modalidad</div>
              <div>Remota</div>
            </div>
          </Link>
          <Link to={'/oferta'} className="bg-white rounded-md p-3">
            <div className="font-bold text-xl text-politectico mb-2">
              Desarrollador FrontEnd
            </div>
            <div>
              <div className="font-bold">Ubicación</div>
              <div>Ciudad de México</div>
            </div>
            <div>
              <div className="font-bold">Modalidad</div>
              <div>Remota</div>
            </div>
          </Link>
          <Link to={'/oferta'} className="bg-white rounded-md p-3">
            <div className="font-bold text-xl text-politectico mb-2">DBA</div>
            <div>
              <div className="font-bold">Ubicación</div>
              <div>Ciudad de México</div>
            </div>
            <div>
              <div className="font-bold">Modalidad</div>
              <div>Remota</div>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-3 mt-16">
          <div>
            <div className="text-politectico text-lg font-semibold">
              Company
            </div>
            <div className="mt-1">About</div>
            <div className="mt-1">Career</div>
            <div className="mt-1">Press</div>
          </div>
          <div>
            <div className="text-politectico text-lg font-semibold">
              Community
            </div>
            <div className="mt-1">Blog</div>
            <div className="mt-1">Forum</div>
            <div className="mt-1">Support</div>
          </div>
          <div>
            <div className="text-politectico text-lg font-semibold">Policy</div>
            <div className="mt-1">Privacy</div>
            <div className="mt-1">Terms</div>
            <div className="mt-1">Help</div>
          </div>
        </div>
        <div className="flex items-center flex-col mt-28">
          <div>
            <i className="fa-brands fa-square-facebook text-3xl text-politectico mx-1"></i>
            <i className="fa-brands fa-x-twitter text-3xl text-politectico mx-1"></i>
            <i className="fa-brands fa-instagram text-3xl text-politectico mx-1"></i>
          </div>
          <div className="text-politectico font-semibold mt-6">&copy; 2023</div>
        </div>
      </div>
    </ContentLayout>
  );
};

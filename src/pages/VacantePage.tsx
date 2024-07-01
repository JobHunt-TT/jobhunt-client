import axios from "axios";
import { useEffect, useState } from "react";
import { Oferta } from "../types";
import { ContentLayout } from "../layouts";
import { formatDate } from "../utils";

const INITIAL_STATE: Oferta = {
  ofertaId: 0,
  nombreOferta: "",
  empresaID: 0,
  nombreEmpresa: "",
  vigencia: "",
  duracionContrato: "",
  rangoEdad: 0,
  rangoExperiencia: 0,
  jornadaID: 0,
  jornadaString: 0,
  direccionId: 0,
  estatusId: 0,
  visibilidad: 0,
  nombrePuesto: "",
  salario: "",
};

export const VacantePage = () => {
  const [oferta, setOferta] = useState<Oferta>(INITIAL_STATE);

  useEffect(() => {
    axios
      .post("/consulta_oferta", {
        ofertaId: localStorage.getItem("idOferta"),
      })
      .then((data) => {
        console.log("success", data);
        setOferta(data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });

    // return () => {
    //     localStorage.removeItem("idOferta")
    // }
  }, []);
  return (
    <ContentLayout>
      <div className="w-4/5 mx-auto my-16">
        <div className="bg-white rounded-md p-3">
          <div className="m-9">
            <div className="text-3xl text-politectico font-bold text-center m-10">
              {oferta.nombreOferta}
            </div>
            <div className="mt-4 grid grid-cols-3">
              <div className="item pl-4 pr-4">
                <div className="font-semibold flex justify-center">Nombre del puesto: </div>
                <div className="font-bold text-xl/10 flex justify-center">{oferta.nombrePuesto}</div>
              </div>
              <div className="item pl-4 pr-4">
                <div className="font-semibold flex justify-center">Nombre de la empresa: </div>
                <div className="font-bold flex justify-center text-xl/10">Empresa</div> {/*Colocar empresa */}
              </div>
              <div className="item mr-6 pl-4 pr-4">
                <div className="font-semibold flex justify-center">Vigencia:</div>
                <div className="flex justify-center text-xl/10 font-bold">{formatDate(oferta.vigencia)}</div>
              </div>
            </div>
            <div className="mt-8">
              <div className="font-bold text-xl">Descripción: </div>
              <div className="text-justify m-4 mr-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
                praesentium veritatis quis dignissimos dolore id numquam
                voluptates corrupti. Soluta tenetur veniam, natus error aliquam
                consectetur a atque architecto fuga ipsum tempore quia voluptate
                debitis accusantium excepturi doloremque aut neque maiores.
                Voluptas fuga nobis repellendus consectetur dignissimos
                voluptates tenetur id commodi.
              </div> 
            </div>
            <div>
              <hr/>
              <div className="font-bold text-xl mt-3 text-center">Detalles: </div>
            </div>
            <div className="mt-4 grid grid-cols-4 mb-4">
              <div className="item pl-4 pr-4">
                <div className="font-semibold flex justify-center">Duración</div>
                <div className="flex justify-center">{oferta.duracionContrato}</div>
              </div>
              <div className="item pl-4 pr-4">
                <div className="font-semibold flex justify-center">Salario</div>
                <div className="flex justify-center">${oferta.salario}.00 mxn</div>
              </div>
              <div className="item pl-4 pr-4">
                <div className="font-semibold flex justify-center">Horario</div>
                <div className="flex justify-center">10:00 - 11:00</div>{/*Llenar*/}
              </div>
              <div className="item pl-4 pr-4">
                <div className="font-semibold flex justify-center">Modalidad</div>
                <div className="flex justify-center">Híbrida</div>{/*Llenar*/}
              </div>
            </div>
            <div>
              <hr/>
              <div className="font-bold text-xl mt-3 text-center">Requisitos: </div>
            </div>
            <div className="mt-4 grid grid-cols-2 mb-4">
              <div className="item pl-4 pr-4">
                <div className="font-semibold flex justify-center">Estatus del Alumno</div>
                <div className="flex justify-center">Pasante</div>{/*Llenar*/}
              </div>
              <div className="item pl-4 pr-4">
                <div className="font-semibold flex justify-center">Estado de Residencia</div>
                <div className="flex justify-center">Ciudad de México</div>{/*Llenar*/}
              </div>
            </div>
            <hr/>
            <div className="mt-8">
              <div className="font-bold text-xl">Habilidades:</div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{"- "}
                  Habilidad 1
                </div>
            </div>
            <div className="mt-8">
              <div className="font-bold text-xl">Idiomas:</div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{"- "}
                  Idioma 1
                </div>
            </div>
            <div className="mt-8">
              <div className="font-bold text-xl text-center">Experiencia Laboral:</div>
                <div className="mt-4 grid grid-cols-2 mb-4">
                  <div className="item pl-4 pr-4">
                    <div className="font-semibold flex justify-center">Puesto Deseable</div>
                    <div className="flex justify-center">Programador</div>{/*Llenar*/}
                  </div>
                  <div className="item pl-4 pr-4">
                    <div className="font-semibold flex justify-center">Tiempo</div>
                    <div className="flex justify-center">2 años</div>{/*Llenar*/}
                  </div>
              </div>
            </div>
            <div className="mt-24 grid grid-cols-3 mb-4 flex justify-center ">
              <div className="item flex justify-center">
                <button className="col-span-2 bg-black text-white py-3 rounded-md font-semibold p-4">
                  Aplicar
                </button>
              </div>
              <div className="item flex justify-center">
                <button className="col-span-2 bg-black text-white py-3 rounded-md font-semibold p-4">
                  Editar
                </button>
              </div>
              <div className="item flex justify-center">
                <button className="col-span-2 bg-black text-white py-3 rounded-md font-semibold p-4">
                  Cancelar
                </button>
              </div>
            </div>
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
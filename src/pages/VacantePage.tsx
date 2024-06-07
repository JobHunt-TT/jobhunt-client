export const VacantePage = () => {
  return (
    <div>
      <div className="bg-politectico">
        <div className="w-4/5 m-auto flex justify-between items-center text-white">
          <a href="./principal.html" className="font-bold text-2xl py-1">
            JobHunt
          </a>
          <div className="flex">
            <a
              href="./profileAlumno.html"
              className="py-4 px-5 hover:bg-white/30"
            >
              Perfil
            </a>
            <a href="./index.html" className="py-4 px-5 hover:bg-white/30">
              Salir
            </a>
          </div>
        </div>
      </div>
      <div className="w-4/5 mx-auto my-16">
        <div className="bg-white rounded-md p-3">
          <div className="w-1/2">
            <div className="text-3xl text-politectico font-bold">
              Desarrollador Backend
            </div>
            <div className="mt-4">
              <div className="font-semibold">Acerca del Empleo</div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
                praesentium veritatis quis dignissimos dolore id numquam
                voluptates corrupti. Soluta tenetur veniam, natus error aliquam
                consectetur a atque architecto fuga ipsum tempore quia voluptate
                debitis accusantium excepturi doloremque aut neque maiores.
                Voluptas fuga nobis repellendus consectetur dignissimos
                voluptates tenetur id commodi.
              </div>
            </div>
            <div className="mt-4">
              <div className="font-semibold">Requisitos</div>
              <div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Habilidad 1
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Habilidad 2
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Habilidad 3
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Habilidad 4
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Habilidad 5
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="font-semibold">Conocimientos</div>
              <div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Conocimiento 1
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Conocimiento 2
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Conocimiento 3
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Conocimiento 4
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Conocimiento 5
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
                praesentium veritatis quis dignissimos dolore id numquam
                voluptates corrupti. Soluta tenetur veniam, natus error aliquam
                consectetur a atque architecto fuga ipsum tempore quia voluptate
                debitis accusantium excepturi doloremque aut neque maiores.
                Voluptas fuga nobis repellendus consectetur dignissimos
                voluptates tenetur id commodi.
              </div>
            </div>
          </div>
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
    </div>
  );
};

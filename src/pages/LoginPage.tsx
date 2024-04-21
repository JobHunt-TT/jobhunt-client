import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export const LoginPage = () => {
  return (
    <div className="h-full">
      <div className="h-screen flex justify-center items-center flex-col bg-politectico text-white">
        {/* <img src="./img/Lupa.png" alt="Lupa" width="200" /> */}
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-9xl" />
        <div className="font-bold text-center text-9xl mt-6">
          Inicia Sesión!
        </div>
      </div>
      <div className="flex items-center flex-col my-20">
        <div className="text-4xl font-bold">Ingresa tus datos</div>
        <div className="w-1/4 my-14 grid grid-rows-2 gap-4">
          <div className="bg-gray-200 rounded-md">
            <input
              type="text"
              className="bg-transparent w-full py-3 px-4 outline-none"
              name=""
              id=""
              placeholder="Correo"
            />
          </div>
          <div className="bg-gray-200 rounded-md">
            <input
              type="text"
              className="bg-transparent w-full py-3 px-4 outline-none"
              name=""
              id=""
              placeholder="Contraseña"
            />
          </div>
          <button className="bg-black text-white py-3 rounded-md font-semibold">
            Iniciar Sesión
          </button>
        </div>
        <div className="flex items-center flex-col">
          <div className="text-politectico text-3xl font-bold mb-10">
            Estás a un clic del talento que necesitas
          </div>
          <div className="mb-4">
            <i className="fa-brands fa-square-facebook text-3xl text-politectico mx-1"></i>
            <i className="fa-brands fa-x-twitter text-3xl text-politectico mx-1"></i>
            <i className="fa-brands fa-instagram text-3xl text-politectico mx-1"></i>
          </div>
          <div className="text-politectico font-semibold">&copy; 2023</div>
        </div>
      </div>
    </div>
  );
};

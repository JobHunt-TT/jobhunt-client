import { RestorePasswordForm } from "../forms";

export const RestorePasswordPage = () => {
  return (
    <div className="bg-white h-screen">
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
      <div className="h-screen-menu flex justify-center items-center flex-col">
          <RestorePasswordForm />
      </div>
    </div>
  );
};

import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

interface ContentLayoutProps {
  children: JSX.Element;
}
const idEmpresa = localStorage.getItem("idEmpresa");

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    MySwal.fire({
      icon: "warning",
      title: "Cerrar Sesión",
      text: `¿Estás seguro de querer cerrar sesión?`,
      showCancelButton: true,
      confirmButtonText: "Si, cerrar sesión",
      cancelButtonText: "No, cancelar",
      confirmButtonColor: "#16A34A",
      cancelButtonColor: "#DC2626",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        localStorage.removeItem("idUser");
        localStorage.removeItem("idEmpresa");
        navigate("/");
      }
    });
  };

  return (
    <div>
      <div className="bg-politectico">
        <div className="w-4/5 m-auto flex justify-between items-center text-white">
          {idEmpresa === null ? (
            <Link to={"/ofertas"} className="font-bold text-2xl py-1">
              JobHunt
            </Link>
          ) : (
            <div className="font-bold text-2xl py-1">JobHunt</div>
          )}

          <div className="flex">
            <Link
              to={idEmpresa === null ? "/profile" : "/profileEnterprise"}
              className="py-4 px-5 hover:bg-white/30"
            >
              Perfil
            </Link>
            <button
              className="py-4 px-5 hover:bg-white/30"
              onClick={handleLogout}
            >
              Salir
            </button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

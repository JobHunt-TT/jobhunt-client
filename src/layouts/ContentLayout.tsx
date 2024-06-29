import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

interface ContentLayoutProps {
  children: JSX.Element;
}

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [idEmpresa, setIdEmpresa] = useState<string | null>(null);

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
        localStorage.removeItem("idOferta");
        localStorage.removeItem("tipoUsuarioEmpresa");
        navigate("/");
      }
    });
  };

  useEffect(() => {
    const idEmpresa = localStorage.getItem("idEmpresa");
    setIdEmpresa(idEmpresa);
  }, [location]);

  useEffect(() => {
    const idEmpresa = localStorage.getItem("idEmpresa");
    setIdEmpresa(idEmpresa);
  }, []);

  return (
    <div>
      <div className="bg-politectico">
        <div className="w-4/5 m-auto flex justify-between items-center text-white">
          <div className="font-bold text-2xl py-1">
            Adopta Un Burrito: Bolsa de Trabajo IPN
          </div>

          <div className="flex">
            {idEmpresa === null ? (
              <Link
                to={idEmpresa === null ? "/ofertas" : "/profileEnterprise"}
                className="py-4 px-5 hover:bg-white/30"
              >
                Ofertas
              </Link>
            ) : (
              <></>
            )}{" "}
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

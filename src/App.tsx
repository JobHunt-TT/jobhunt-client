import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AdminPage,
  LandingPage,
  LoginPage,
  OfertasPage,
  ProfileEnterprisePage,
  ProfilePage,
  RecoverPasswordPage,
  RegisterEnterprisePage,
  RegisterPage,
  RestorePasswordPage,
  VacantePage,
  ProfileEncargadoPage,
  ProfileReclutador,
  AdminStatsPage,
  ViewPostulante,
  TerminosCondiciones,
  AvisoPrivacidad,
} from "./pages";
import "./assets/css/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/registerEnterprise",
    element: <RegisterEnterprisePage />,
  },
  {
    path: "/recoverPassword",
    element: <RecoverPasswordPage />,
  },
  {
    path: "/restorePassword",
    element: <RestorePasswordPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/profileEnterprise",
    element: <ProfileEnterprisePage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/",
    element: <AdminStatsPage />,
  },
  {
    path: "/oferta",
    element: <VacantePage />,
  },
  {
    path: "/ofertas",
    element: <OfertasPage />,
  },
  {
    path: "/profileEncargado",
    element: <ProfileEncargadoPage />,
  },
  {
    path: "/profileReclutador",
    element: <ProfileReclutador />,
  },
  {
    path: "/viewpostulante",
    element: <ViewPostulante />,
  },
  {
    path: "/TerminosCondiciones",
    element: <TerminosCondiciones />,
  },
  {
    path: "/AvisoPrivacidad",
    element: <AvisoPrivacidad />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

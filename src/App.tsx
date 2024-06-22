import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  AdminPage,
  AdminPageTest,
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
    path: "/adminTest",
    element: <AdminPageTest />,
  },
  {
    path: "/oferta",
    element: <VacantePage />,
  },
  {
    path: "/ofertas",
    element: <OfertasPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  AdminPage,
  LandingPage,
  LoginPage,
  ProfileEnterprisePage,
  ProfilePage,
  RegisterEnterprisePage,
  RegisterPage,
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
    path: "/vacante",
    element: <VacantePage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

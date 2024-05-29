import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { LandingPage, LoginPage, ProfilePage, RegisterEnterprisePage, RegisterPage } from './pages';
import './assets/css/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/registerEnterprise',
    element: <RegisterEnterprisePage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

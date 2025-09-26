import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import Loader from '../components/common/Loader.tsx';
// import { useAuth } from '../context/AuthContext.tsx';
import { useUser } from '@clerk/clerk-react';

const HomePage = lazy(() => import('../pages/HomePage.tsx'));
const Login = lazy(() => import('../pages/Login.tsx'));
const QrCode = lazy(() => import('../pages/QrCode.tsx'));
const Signup = lazy(() => import('../pages/Signup.tsx'));
const Error = lazy(() => import('../pages/ErrorPage.tsx'));

const SSOCallback = lazy(() => import('../components/auth/SsoCallback.tsx'));

export const ProtectedRoute = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  if (!isLoaded) {
    return <Loader />;
  }
  
  // Render the nested routes if authenticated
  if (isSignedIn && isLoaded && user) {
    return <Outlet />;
  }

  return <Navigate to={'/login'} replace />;
};

const AppRouter = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className='flex h-screen w-screen items-center justify-center'>
            <Loader size='7rem' />
          </div>
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/sso-callback' element={<SSOCallback />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/img' element={<QrCode />} />
          </Route>

          {/* Default Route / Fallback Route */}
          <Route path='*' element={<Error />} />
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
};

export default AppRouter;

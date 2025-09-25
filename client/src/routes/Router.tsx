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

export const ProtectedRoute = () => {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) {
    return <Loader />;
  }
  if (!isSignedIn) {
    // Redirect to login or default path if no user
    return <Navigate to={'/login'} replace />;
  }

  // Render the nested routes if authenticated
  return <Outlet />;
};

const AppRouter = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className='flex h-screen w-screen items-center justify-center'>
            <Loader size='12rem' />
          </div>
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

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

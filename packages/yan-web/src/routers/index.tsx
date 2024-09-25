import SignIn from '../components/pages/SignIn';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../components/pages/Home';
import SignUp from '../components/pages/SignUp';
import HomeTemplate from '../components/pages/HomeTemplate';
import PolicyProvider from '../provider/PolicyProvider';
import ForgotPassword from '../components/pages/ForgotPassword';
import SignInTemplate from '../components/pages/SignInTemplate';
import NotFound from '../components/pages/NotFound.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <PolicyProvider>
                <HomeTemplate />
            </PolicyProvider>
        ),
        children: [
            {
                index: true,
                element: <Navigate to={'/home'} />,
            },
            {
                path: 'home',
                element: (
                    <Home />)
            }
        ]
    },
    {
        element: <SignInTemplate />,
        children: [
            {
                index: true,
                element: <Navigate to={'/sign-in'} />,
            },
            {
                path: 'sign-in',
                element: <SignIn />,
            },
            {
                path: 'sign-up',
                element: <SignUp />,
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    }
]);
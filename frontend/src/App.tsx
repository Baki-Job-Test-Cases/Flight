import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute';
import { useVerify } from './hooks/use-verify';
import AuthLayout from './pages/auth/Layout';
import SignInPage from './pages/auth/SignIn';
import SignUpPage from './pages/auth/SignUp';
import HomePage from './pages/main/Home';
import MainLayout from './pages/main/Layout';
import ProfilePage from './pages/main/Profile';
import NotFoundPage from './pages/NotFound';

function App() {
    const { isLoading } = useVerify();

    if (isLoading)
        return <div className="text-5xl text-red-500">Loading...</div>;

    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route
                        path="profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                </Route>
                <Route path="/" element={<AuthLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<SignInPage />} />
                    <Route path="register" element={<SignUpPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                theme="colored"
                className="z-[9999]"
            />
        </>
    );
}

export default App;

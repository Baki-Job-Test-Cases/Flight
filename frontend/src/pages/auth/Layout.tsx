import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '@/hooks/use-session';

export default function AuthLayout() {
    const { data: session } = useSession();

    if (session) return <Navigate to="/" replace />;

    return (
        <>
            <main role="main" className="h-screen">
                <Outlet />
            </main>
        </>
    );
}

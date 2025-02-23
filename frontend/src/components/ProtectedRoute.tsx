import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/hooks/use-session';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const { data: session } = useSession();

    //Check if user not logged in, if not redirect to login page
    useEffect(() => {
        !session && navigate('/login', { replace: true });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return children;
}

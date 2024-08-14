import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';

export default function MainLayout() {
    return (
        <div className="mb-5">
            <Header />
            <main role="main" className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}

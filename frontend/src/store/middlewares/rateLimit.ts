import { toast } from 'react-toastify';
import { Middleware } from 'redux';

export const rateLimitMiddleware: Middleware = () => {
    return (next) => {
        return (action: any) => {
            const result = next(action);

            if (
                action?.error?.message === 'Rejected' &&
                action?.payload?.status === 429 &&
                !action?.payload?.data?.access
            ) {
                toast(
                    action?.payload?.data?.error ||
                        'Too many request. Please try again after a few minute..!',
                    { type: 'error' },
                );
            }

            return result;
        };
    };
};

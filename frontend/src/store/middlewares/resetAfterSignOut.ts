import { Middleware } from 'redux';
import { userApi } from '../apis/user';

export const resetAfterSignOutMiddleware: Middleware = (store) => {
    return (next) => {
        return (action: any) => {
            const result = next(action);

            //Reset userApi queries after logout
            if (action.type === 'session/update' && action.payload === undefined) {
                setTimeout(() => {
                    store.dispatch(userApi.util.resetApiState());
                }, 1000);
            }

            return result;
        };
    };
};

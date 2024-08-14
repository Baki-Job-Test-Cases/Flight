import { Middleware } from 'redux';
import { userApi } from '../apis/user';

export const resetAfterSignOutMiddleware: Middleware = (store) => {
    return (next) => {
        return (action: any) => {
            const result = next(action);

            // action.type === 'authApi/executeMutation/fulfilled' &&
            // action?.meta?.arg?.endpointName === 'signOut' &&
            // action?.payload?.signOut
            if (action.type === 'session/update' && action.payload === undefined) {
                setTimeout(() => {
                    store.dispatch(userApi.util.resetApiState());
                }, 1000);
            }

            return result;
        };
    };
};

import { useAppDispatch, useAppSelector } from './use-redux';
import { update as updateSession } from '@/store';
import type { Session } from '@/types';

export const useSession = () => {
    const { data, status } = useAppSelector(({ session }) => session);
    const dispatch = useAppDispatch();

    const update = (payload?: Session) => dispatch(updateSession(payload));

    return { data, status, update };
};

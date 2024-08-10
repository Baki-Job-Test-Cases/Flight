import type { User } from './user-interface';

export interface Session {
    status: 'loading' | 'authenticated' | 'unauthenticated';
    data: User | null;
}

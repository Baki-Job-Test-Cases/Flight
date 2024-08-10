import type { Flight } from './flight.interface';
import type { RejectWithReason } from './reject-with-reason.type';
import type { User } from './user-interface';

export type AuthResponse<T extends Record<string, any>> =
    | T
    | RejectWithReason<'auth'>;

export type SignUpResponse =
    | {
          signUp: true;
          user: User;
      }
    | RejectWithReason<'signUp'>;

export type SignInResponse =
    | {
          signIn: true;
          user: User;
      }
    | RejectWithReason<'signIn'>;

export type SignOutResponse =
    | {
          signOut: true;
      }
    | RejectWithReason<'signOut'>;

export type VerifyResponse = AuthResponse<
    | {
          verify: true;
          user: User;
      }
    | RejectWithReason<'verify'>
>;

export type SearchFlightResponse =
    | {
          search: true;
          flights?: Flight[];
      }
    | RejectWithReason<'search'>;

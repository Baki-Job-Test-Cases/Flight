import type { Flight } from './flight.interface';
import type { RejectWithReason } from './reject-with-reason.type';
import type { UserWithoutPassword } from './user-without-password.type';

export type GeneralResponse<T extends Record<string, any>> =
    | T
    | RejectWithReason<'access'>;
export type AuthMiddlewareResponse<T extends Record<string, any>> =
    | T
    | RejectWithReason<'auth'>;

export type SignUpResponse = GeneralResponse<
    | {
          signUp: true;
          user: UserWithoutPassword;
      }
    | RejectWithReason<'signUp'>
>;

export type SignInResponse = GeneralResponse<
    | {
          signIn: true;
          user: UserWithoutPassword;
      }
    | RejectWithReason<'signIn'>
>;

export type SignOutResponse = GeneralResponse<
    | {
          signOut: true;
      }
    | RejectWithReason<'signOut'>
>;

export type VerifyResponse = GeneralResponse<
    AuthMiddlewareResponse<
        | {
              verify: true;
              user: UserWithoutPassword;
          }
        | RejectWithReason<'verify'>
    >
>;

export type SearchFlightResponse = GeneralResponse<
    | {
          search: true;
          flights?: Flight[];
      }
    | RejectWithReason<'search'>
>;

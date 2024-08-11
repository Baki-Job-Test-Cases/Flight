import type { Destination } from './destination.interface';
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

export type GetFlightsResponse = GeneralResponse<
    | {
          success: true;
          flights: Flight[];
      }
    | RejectWithReason<'success'>
>;

export type GetFlightResponse = GeneralResponse<
    | {
          success: true;
          flight: Flight;
      }
    | RejectWithReason<'success'>
>;

export type GetDestinationsResponse = GeneralResponse<
    | {
          success: true;
          destinations: Destination[];
      }
    | RejectWithReason<'success'>
>;

export type GetDestinationResponse = GeneralResponse<
    | {
          success: true;
          destination: Destination;
      }
    | RejectWithReason<'success'>
>;

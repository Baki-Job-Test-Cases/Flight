import type { Airline } from './airline.interface';
import type { Destination } from './destination.interface';
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

export type AddFlightResponse = AuthResponse<
    { add: true } | RejectWithReason<'add'>
>;

export type GetUserFlightsResponse = AuthResponse<
    { success: true; flights: Flight[] } | RejectWithReason<'success'>
>;

export type GetFlightsResponse =
    | {
          success: true;
          flights?: Flight[];
      }
    | RejectWithReason<'success'>;

export type GetFlightResponse =
    | {
          success: true;
          flight: Flight;
      }
    | RejectWithReason<'success'>;

export type GetDestinationsResponse =
    | {
          success: true;
          destinations?: Destination[];
      }
    | RejectWithReason<'success'>;

export type GetDestinationResponse =
    | {
          success: true;
          destination: Destination;
      }
    | RejectWithReason<'success'>;

export type GetAirlinesResponse =
    | {
          success: true;
          airlines?: Airline[];
      }
    | RejectWithReason<'success'>;

export type GetAirlineResponse =
    | {
          success: true;
          airline: Airline;
      }
    | RejectWithReason<'success'>;

import { Prisma } from '@prisma/client';
import { toZonedTime } from 'date-fns-tz';
import jwt from 'jsonwebtoken';
import { getAirlineQuery, getDestinationQuery } from './queries';
import type { Response } from 'express';
import type { Flight, TokenPayload } from './types';

type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
type Entity = A<keyof typeof Prisma>;
type Keys<T extends Entity> = Extract<
    keyof (typeof Prisma)[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>],
    string
>;

//Create refresh token
export const createRefreshToken = (value: TokenPayload) => {
    if (!process.env.JWT_REFRESH_TOKEN_SECRET_KEY)
        throw new Error('Missing JWT Auth Credentials..!');

    return jwt.sign(value, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, {
        expiresIn: '3d',
    });
};

//Create access token
export const createAccessToken = (value: TokenPayload) => {
    if (!process.env.JWT_ACCESS_TOKEN_SECRET_KEY)
        throw new Error('Missing JWT Auth Credentials..!');

    return jwt.sign(value, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: '8h',
    });
};

//Set refresh token cookie to response
export const createRefreshTokenCookie = (response: Response, data: TokenPayload) =>
    response.cookie('refreshToken', createRefreshToken(data), {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
    });

//Set access token cookie to response
export const createAccessTokenCookies = (response: Response, data: TokenPayload) =>
    response
        .cookie('accessToken', createAccessToken(data), {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
        })
        .cookie('accessTokenExpiresAt', new Date().getTime() + 60 * 60 * 1000, {
            maxAge: 14 * 24 * 60 * 60 * 1000,
        });

//Set tokens with 0 expire for response
export const clearTokenCookies = (response: Response) =>
    response
        .cookie('refreshToken', null, {
            maxAge: 1,
            httpOnly: true,
            secure: true,
        })
        .cookie('accessToken', null, {
            maxAge: 1,
            httpOnly: true,
            secure: true,
        })
        .cookie('accessTokenExpiresAt', null, {
            maxAge: 1,
        });

//Exclues properties from database query.
export function prismaExclude<T extends Entity, K extends Keys<T>>(type: T, omit: K[]) {
    type Key = Exclude<Keys<T>, K>;
    type TMap = Record<Key, true>;
    const result: TMap = {} as TMap;

    for (const key in Prisma[`${type}ScalarFieldEnum`]) {
        if (!omit.includes(key as K)) {
            result[key as Key] = true;
        }
    }
    return result;
}

//Transform object values to string
export const stringifyObjectValues = (payload: Record<string, any>): Record<string, string> =>
    Object.entries(payload).reduce(
        (acc, [key, value]) => {
            acc[key] = value.toString();

            return acc;
        },
        {} as Record<string, string>,
    );

// Take more data about flight
export const extendFlight = async (
    flight: Flight,
    options?: { airline?: boolean; destinations?: boolean },
): Promise<void> => {
    if (options?.airline && (flight.prefixIATA || flight.prefixICAO)) {
        const airline = await getAirlineQuery(flight.prefixIATA || flight.prefixICAO || '');

        flight.airline = airline;
    }

    if (
        options?.destinations &&
        flight.route?.destinations &&
        flight.route.destinations.length > 0
    ) {
        const destinations = await Promise.all(
            flight.route.destinations.map((iata) => getDestinationQuery(iata)),
        );

        flight.destinations = destinations;
    }
};

// Transform date to target timezone iso date string
export const transformDateToTimeZone = (
    date: Date,
    timeZone: string = 'Europe/Amsterdam',
): string => {
    date = toZonedTime(date.toISOString(), timeZone);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
};

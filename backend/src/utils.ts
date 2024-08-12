import { Prisma } from '@prisma/client';
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

export const createRefreshToken = (value: TokenPayload) => {
    if (!process.env.JWT_REFRESH_TOKEN_SECRET_KEY)
        throw new Error('Missing JWT Auth Credentials..!');

    return jwt.sign(value, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, {
        expiresIn: '3d',
    });
};

export const createAccessToken = (value: TokenPayload) => {
    if (!process.env.JWT_ACCESS_TOKEN_SECRET_KEY)
        throw new Error('Missing JWT Auth Credentials..!');

    return jwt.sign(value, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: '8h',
    });
};

export const createRefreshTokenCookie = (
    response: Response,
    data: TokenPayload,
) =>
    response.cookie('refreshToken', createRefreshToken(data), {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
    });

export const createAccessTokenCookies = (
    response: Response,
    data: TokenPayload,
) =>
    response
        .cookie('accessToken', createAccessToken(data), {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
        })
        .cookie('accessTokenExpiresAt', new Date().getTime() + 60 * 60 * 1000, {
            maxAge: 14 * 24 * 60 * 60 * 1000,
        });

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

export function prismaExclude<T extends Entity, K extends Keys<T>>(
    type: T,
    omit: K[],
) {
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

export const stringifyObjectValues = (
    payload: Record<string, any>,
): Record<string, string> =>
    Object.entries(payload).reduce(
        (acc, [key, value]) => {
            acc[key] = value.toString();

            return acc;
        },
        {} as Record<string, string>,
    );

export const extendFlight = async (flight: Flight): Promise<void> => {
    if (flight.prefixIATA || flight.prefixICAO) {
        const airline = await getAirlineQuery(
            flight.prefixIATA || flight.prefixICAO || '',
        );

        flight.airline = airline;
    }

    if (flight.route?.destinations && flight.route.destinations.length > 0) {
        const destinations = await Promise.all(
            flight.route.destinations.map((iata) => getDestinationQuery(iata)),
        );

        flight.destinations = destinations;
    }
};

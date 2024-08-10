import jwt from 'jsonwebtoken';
import db from '../db';
import { AuthMiddlewareResponse } from '../types';
import {
    clearTokenCookies,
    createAccessTokenCookies,
    prismaExclude,
} from '../utils';
import type { NextFunction, Request, Response } from 'express';

export const authMiddleware = async (
    request: Request,
    response: Response<AuthMiddlewareResponse<{}>>,
    next: NextFunction,
) => {
    if (
        !process.env.JWT_REFRESH_TOKEN_SECRET_KEY ||
        !process.env.JWT_ACCESS_TOKEN_SECRET_KEY
    )
        throw new Error('Missing JWT Auth Credentials..!');

    try {
        const { accessToken, refreshToken } = request.cookies;

        if (!accessToken || !refreshToken) throw new Error();

        const decodedRefreshToken = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
        );

        if (!(decodedRefreshToken instanceof Object)) throw new Error();

        try {
            const decodedAccessToken = jwt.verify(
                accessToken,
                process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
            );

            if (
                !(decodedAccessToken instanceof Object) ||
                Object.keys(decodedAccessToken).length !==
                    Object.keys(decodedRefreshToken).length ||
                decodedAccessToken.id !== decodedRefreshToken.id ||
                decodedAccessToken.email !== decodedRefreshToken.email
            ) {
                clearTokenCookies(response);

                return response.json({
                    auth: false,
                    error: 'You have no authorization..!',
                });
            }
        } catch (error) {
            createAccessTokenCookies(response, {
                id: decodedRefreshToken.id,
                email: decodedRefreshToken.email,
            });
        } finally {
            const user = await db.user.findFirst({
                where: {
                    id: decodedRefreshToken.id,
                    email: decodedRefreshToken.email,
                },
                select: prismaExclude('User', ['password']),
            });

            if (user) request.user = user;
            else throw new Error();
        }

        next();
    } catch (error) {
        clearTokenCookies(response);

        return response.json({
            auth: false,
            error: 'You have no authorization..!',
        });
    }
};

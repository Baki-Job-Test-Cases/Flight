import 'dotenv/config';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import { airlineRoute, authRoute, destinationRoute, flightRoute, userRoute } from './routes';
import { UserWithoutPassword } from './types';

declare global {
    namespace Express {
        interface Request {
            user?: UserWithoutPassword | null;
        }
    }
}

const API_PORT = process.env.API_PORT || 8080;

const app = express();
const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 150,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: {
        access: false,
        error: 'Too many request. Please try again after a few minute..!',
    },
});

//Middlewares
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    cors({
        origin: function (origin, callback) {
            if (process.env.CORS_ORIGIN === origin) {
                callback(null, true);
            } else {
                callback(Error('Blocked By Cors'));
            }
        },
        credentials: true,
    }),
);
app.use(limiter);

app.use('/', authRoute);
app.use('/flights', flightRoute);
app.use('/destinations', destinationRoute);
app.use('/airlines', airlineRoute);
app.use('/user', userRoute);

app.listen(API_PORT, () => {
    console.log(`Server work at port ${API_PORT}`);
});

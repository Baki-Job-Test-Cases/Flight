import * as z from 'zod';
import { transformDateToTimeZone } from '../utils';

export const flightFiltersSchema = z
    .object({
        flightDirection: z.enum(['A', 'D']),
        page: z.coerce
            .number()
            .max(499)
            .transform((val) => val - 1),
        fromDateTime: z.coerce.date().transform((val) => transformDateToTimeZone(val)), //transform date to Amsterdam time
        toDateTime: z.coerce.date().transform((val) => transformDateToTimeZone(val)), //transform date to Amsterdam time
        route: z.string().min(3).max(4),
        airline: z.string().max(3),
        includedelays: z.coerce.boolean(),
        sort: z.enum([
            '+flightName',
            '-flightName',
            '+scheduleDate',
            '-scheduleDate',
            '+scheduleTime',
            '-scheduleTime',
            '+flightDirection',
            '-flightDirection',
            '+mainFlight',
            '-mainFlight',
            '+airlineCode',
            '-airlineCode',
            '+id',
            '-id',
            '+estimatedLandingTime',
            '-estimatedLandingTime',
            '+actualLandingTime',
            '-actualLandingTime',
            '+publicEstimatedOffBlockTime',
            '-publicEstimatedOffBlockTime',
            '+actualOffBlockTime',
            '-actualOffBlockTime',
            '+expectedTimeBoarding',
            '-expectedTimeBoarding',
            '+expectedTimeGateClosing',
            '-expectedTimeGateClosing',
            '+expectedTimeGateOpen',
            '-expectedTimeGateOpen',
            '+expectedTimeOnBelt',
            '-expectedTimeOnBelt',
            '+scheduleDateTime',
            '-scheduleDateTime',
            '+lastUpdatedAt',
            '-lastUpdatedAt',
        ]),
    })
    .partial();

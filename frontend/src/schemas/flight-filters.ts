import * as z from 'zod';

export const flightFiltersSchema = z.object({
    route: z.string().min(3).max(4).optional(),
    page: z.coerce.number().max(499).default(0),
    flightDirection: z.enum(['A', 'D']).default('A'),
    fromDateTime: z.coerce.date().default(new Date()),
    toDateTime: z.coerce.date().optional(),
    includedelays: z.coerce.boolean().optional(),
    sort: z
        .enum([
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
        ])
        .optional(),
    airline: z.string().max(3).optional(),
});
// .partial();

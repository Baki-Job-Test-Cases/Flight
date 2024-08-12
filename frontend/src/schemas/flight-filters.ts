import * as z from 'zod';

export const flightFiltersSchema = z
    .object({
        scheduleDate: z.string().date(),
        scheduleTime: z
            .string()
            .regex(new RegExp(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/), 'Enter Valid Time'),
        flightName: z.string(),
        flightDirection: z.enum(['A', 'D']).default('A'),
        airline: z.string().max(3),
        airlineCode: z.coerce.number(),
        includedelays: z.coerce.boolean(),
        page: z.coerce.number().max(499),
        sort: z.string(), //check
        fromDateTime: z.coerce.date(),
        toDateTime: z.coerce.date(),
        searchDateTimeField: z.enum([
            'estimatedLandingTime',
            'actualLandingTime',
            'publicEstimatedOffBlockTime',
            'actualOffBlockTime',
            'expectedTimeBoarding',
            'expectedTimeGateClosing',
            'expectedTimeGateOpen',
            'expectedTimeOnBelt',
            'scheduleDateTime',
            'lastUpdatedAt',
        ]),
        fromScheduleDate: z.string().date(), //check
        toScheduleDate: z.string().date(), //check
        isOperationalFlight: z.coerce.boolean(),
    })
    .partial();

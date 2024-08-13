import * as z from 'zod';

export const flightFiltersSchema = z
    .object({
        scheduleDate: z.string().date(),
        scheduleTime: z
            .string()
            .regex(
                new RegExp(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
                'Enter Valid Time',
            ),
        flightName: z.string(),

        airline: z.string().max(3),
        airlineCode: z.number(),
        includedelays: z.coerce.boolean(),
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

        //kullanılanlar
        flightDirection: z.enum(['A', 'D']),
        page: z.coerce
            .number()
            .max(499)
            .transform((val) => val - 1),
        fromDateTime: z.coerce.date().transform((val) => transformDate(val)),
        toDateTime: z.coerce.date().transform((val) => transformDate(val)),
        route: z.string().min(3).max(4),
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

const transformDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
};

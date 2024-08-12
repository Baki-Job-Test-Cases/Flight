import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ImSpinner9 } from 'react-icons/im';
import { useSearchParams } from 'react-router-dom';
import Direction from './Direction';
import FromDate from './FromDate';
import ToDate from './ToDate';
import { Form } from '@/components/ui/form';
import { stringifyObjectValues } from '@/lib/utils';
import { flightFiltersSchema } from '@/schemas';
import { useLazyGetFlightsQuery } from '@/store';
import { Button } from '../ui/button';
import type { SubmitHandler } from 'react-hook-form';
import type { FlightFilters } from '@/types';

export default function SearchFlight() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [getFlights, { data: result, isFetching }] = useLazyGetFlightsQuery();
    const validatedSearchParams = useMemo(
        () => flightFiltersSchema.safeParse(Object.fromEntries(searchParams)),

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );
    const form = useForm<FlightFilters>({
        resolver: zodResolver(flightFiltersSchema),
        mode: 'all',
        defaultValues: validatedSearchParams.success
            ? { ...validatedSearchParams.data, flightDirection: 'A' }
            : {
                  flightDirection: 'A',
              },
    });

    const onSubmit: SubmitHandler<FlightFilters> = (data) => {
        setSearchParams(stringifyObjectValues(data));

        getFlights(data);
    };

    return (
        <section aria-describedby="bookFlight" className="rounded-lg bg-white p-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Direction />
                    <div className="flex flex-wrap gap-x-2">
                        <FromDate />
                        <ToDate />
                    </div>
                    <Button
                        type="submit"
                        className="w-28 bg-purple text-white"
                        disabled={isFetching || !form.formState.isValid}
                        aria-label={isFetching ? 'Showing Flights' : 'Show Flights'}
                    >
                        {isFetching ? (
                            <ImSpinner9 className="size-full animate-spin p-px" />
                        ) : (
                            'Show Flights'
                        )}
                    </Button>
                </form>
            </Form>
        </section>
    );
}

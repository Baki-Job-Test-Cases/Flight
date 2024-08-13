import { useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ImSpinner9 } from 'react-icons/im';
import { useSearchParams } from 'react-router-dom';
import Airlines from './Airlines';
import Destination from './Destination';
import Direction from './Direction';
import FromDate from './FromDate';
import IncludeDelays from './IncludeDelays';
import Sort from './Sort';
import ToDate from './ToDate';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { stringifyObjectValues } from '@/lib/utils';
import { flightFiltersSchema } from '@/schemas';
import { useLazyGetFlightsQuery } from '@/store';
import FlightList from '../FlightList';
import FlightPagination from '../FlightPagination';
import type { SubmitHandler } from 'react-hook-form';
import type { FlightFilters } from '@/types';

export default function SearchFlight() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page'));
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
            ? { ...validatedSearchParams.data, flightDirection: 'A', page }
            : {
                  flightDirection: 'A',
                  page: 1,
              },
    });

    //watch extra filters for set search params.
    const [sort, includeDelays] = form.watch(['sort', 'includedelays']);

    const onSubmit: SubmitHandler<FlightFilters> = (data) => {
        const value = Object.assign(data, { page: 1 });

        setSearchParams(stringifyObjectValues(value));

        getFlights(value);
    };

    useEffect(() => {
        if (form.formState.isValid && (sort || includeDelays !== undefined)) {
            sort && searchParams.set('sort', form.getValues('sort') || '');

            includeDelays !== undefined &&
                searchParams.set('includedelays', includeDelays.toString());

            searchParams.set('page', '1');

            setSearchParams(searchParams);
        }
    }, [sort, includeDelays]);

    useEffect(() => {
        if (page && form.formState.isValid) {
            const values = Object.assign(form.getValues(), { page });

            setSearchParams(stringifyObjectValues(values));

            getFlights(values);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return (
        <div className="w-full">
            <section aria-describedby="bookFlight" className="w-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="rounded-2xl bg-white p-6">
                            <Direction />
                            <div className="flex flex-wrap gap-x-2">
                                <Destination />
                                <FromDate />
                                <ToDate />
                            </div>
                            <Button
                                type="submit"
                                className="mt-2 w-28 bg-purple text-white"
                                disabled={isFetching || !form.formState.isValid}
                                aria-label={isFetching ? 'Showing Flights' : 'Show Flights'}
                            >
                                {isFetching ? (
                                    <ImSpinner9 className="size-full animate-spin p-px" />
                                ) : (
                                    'Show Flights'
                                )}
                            </Button>
                        </div>
                        <div className="mt-6 flex gap-6">
                            {isFetching ? (
                                <ImSpinner9 className="size-40 animate-spin" />
                            ) : result?.success ? (
                                result.flights && (
                                    <div className="w-full">
                                        <FlightList flights={result.flights} />
                                    </div>
                                )
                            ) : (
                                <div className="text-3xl text-red-500">{result?.error}</div>
                            )}
                            <div className="ml-auto flex min-w-60 flex-col gap-y-4 rounded-xl">
                                <Sort />
                                <IncludeDelays />
                                <Airlines />
                            </div>
                        </div>
                    </form>
                </Form>
                {!isFetching && result?.success && result.flights && result.flights.length > 0 && (
                    <FlightPagination isLoading={isFetching} />
                )}
            </section>
        </div>
    );
}

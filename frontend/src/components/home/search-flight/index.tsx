import { useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import Destination from './Destination';
import Direction from './Direction';
import ExtraFilters from './extra-filters';
import FromDate from './FromDate';
import ToDate from './ToDate';
import LoadingSpinner from '@/components/LoadingSpinner';
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
    const [getFlights, { data: result, isFetching, error, isUninitialized }] =
        useLazyGetFlightsQuery();
    const validatedSearchParams = flightFiltersSchema.safeParse(Object.fromEntries(searchParams));
    const form = useForm<FlightFilters>({
        resolver: zodResolver(flightFiltersSchema),
        mode: 'all',
        defaultValues: {
            flightDirection: validatedSearchParams.success
                ? validatedSearchParams.data.flightDirection
                : 'A',
            page: 1,
        },
    });

    //watch extra filters for set search params.
    const [sort, includeDelays, airline] = form.watch(['sort', 'includedelays', 'airline']);

    //On form submit set page 1 and set form data to search params
    const onSubmit: SubmitHandler<FlightFilters> = (data) => {
        const value = Object.assign(data, {
            page: 1,
        });

        setSearchParams(stringifyObjectValues(value));

        getFlights(value);
    };

    //Set search params to form
    useEffect(() => {
        validatedSearchParams.success && form.reset({ ...validatedSearchParams.data, page });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Set or delete search params if the form is valid when extra filters change .
    useEffect(() => {
        if (form.formState.isValid && !isUninitialized) {
            sort ? searchParams.set('sort', sort) : searchParams.delete('sort');

            includeDelays
                ? searchParams.set('includedelays', includeDelays.toString())
                : searchParams.delete('includedelays');

            airline ? searchParams.set('airline', airline) : searchParams.delete('airline');

            searchParams.set('page', '1');

            setSearchParams(searchParams);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort, includeDelays, airline]);

    //Search flight if the form is valid when search params change
    useEffect(() => {
        if (page && form.formState.isValid) {
            const values = Object.assign(form.getValues(), {
                page,
            });

            getFlights(values);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return (
        <div className="w-full">
            <section aria-describedby="bookFlight" className="relative w-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="rounded-2xl bg-white px-2 py-6 sm:px-6">
                            <Direction />
                            <div className="grid gap-x-2 xl:grid-cols-2">
                                <Destination />
                                <div className="grid gap-x-2 sm:grid-cols-2">
                                    <FromDate />
                                    <ToDate />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="mt-2 w-28 bg-purple text-white"
                                disabled={isFetching || !form.formState.isValid}
                                aria-label={isFetching ? 'Showing Flights' : 'Show Flights'}
                            >
                                {isFetching ? (
                                    <LoadingSpinner className="size-full animate-spin p-px" />
                                ) : (
                                    'Show Flights'
                                )}
                            </Button>
                        </div>
                        <ExtraFilters />
                    </form>
                </Form>
                <div className="xl:mr-[19.5rem]">
                    {isFetching ? (
                        <LoadingSpinner className="mx-auto size-40 animate-spin" />
                    ) : error ? (
                        <div className="text-3xl text-red-500">Something went wrong..!</div>
                    ) : result?.success ? (
                        <FlightList flights={result.flights} />
                    ) : (
                        <div className="text-3xl text-red-500">{result?.error}</div>
                    )}
                    {!isFetching && !error && result?.success && result.flights.length > 0 && (
                        <FlightPagination isLoading={isFetching} length={result.flights.length} />
                    )}
                </div>
            </section>
        </div>
    );
}

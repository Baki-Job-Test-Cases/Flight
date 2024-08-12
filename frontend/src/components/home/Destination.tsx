import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { useFormContext } from 'react-hook-form';
import { FaPlaneArrival, FaPlaneDeparture } from 'react-icons/fa';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useLazyGetDestinationQuery, useLazyGetDestinationsQuery } from '@/store';
import { Input } from '../ui/input';
import VisuallyHidden from '../VisuallyHidden';
import type { Destination, FlightFilters } from '@/types';

export default function Destination() {
    const form = useFormContext<FlightFilters>();
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [term, setTerm] = useState('');
    const [getDestinations, getDestinationsResult] = useLazyGetDestinationsQuery();
    const [getDestination, getDestinationResult] = useLazyGetDestinationQuery();
    const [flightDirection, route] = form.getValues(['flightDirection', 'route']);

    useEffect(() => {
        route && getDestination({ iata: route });
    }, []);

    useEffect(() => {
        getDestinations({ page });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        getDestinationsResult.data?.success &&
            getDestinationsResult.data.destinations &&
            setDestinations([...destinations, ...getDestinationsResult.data.destinations]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getDestinationsResult.data]);

    useEffect(() => {
        term && getDestination({ iata: term });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [term]);

    const handleDestinationClick = (destination: Destination) => {
        form.setValue('route', destination.iata);

        setOpen(false);
    };
    const debouncedTermChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value);
    }, 1000);

    return (
        <FormField
            control={form.control}
            name="route"
            render={({ field }) => (
                <FormItem className="flex">
                    <VisuallyHidden>
                        <FormLabel>Field</FormLabel>
                    </VisuallyHidden>
                    <div
                        className={cn('flex flex-wrap gap-2', {
                            'flex-row-reverse': flightDirection === 'A',
                        })}
                    >
                        <div
                            className={cn(
                                'flex h-10 w-60 gap-x-1 border-2 py-2 pl-3 pr-4 text-left font-normal',
                                {
                                    'rounded-l-3xl': flightDirection === 'D',
                                    'rounded-r-3xl': flightDirection === 'A',
                                },
                            )}
                        >
                            {flightDirection === 'D' && (
                                <FaPlaneDeparture className="flex h-full w-5 text-purple" />
                            )}
                            {flightDirection === 'A' && (
                                <FaPlaneArrival className="flex h-full w-5 text-purple" />
                            )}
                            Schiphol - AMS
                        </div>
                        <Popover open={open} onOpenChange={setOpen}>
                            <FormControl>
                                <PopoverTrigger
                                    className={cn(
                                        'flex h-10 w-60 gap-x-1 border-2 py-2 pl-3 pr-4 text-left font-normal',
                                        {
                                            'rounded-l-3xl': flightDirection === 'A',
                                            'rounded-r-3xl': flightDirection === 'D',
                                        },
                                    )}
                                >
                                    {flightDirection === 'A' && (
                                        <FaPlaneDeparture className="flex h-full w-5 text-purple" />
                                    )}
                                    {flightDirection === 'D' && (
                                        <FaPlaneArrival className="flex h-full w-5 text-purple" />
                                    )}
                                    {getDestinationResult.isFetching
                                        ? null
                                        : destinations.find(
                                              (destination) => destination.iata === field.value,
                                          )?.publicName?.english ||
                                          (getDestinationResult.data?.success &&
                                              getDestinationResult.data.destination.publicName
                                                  ?.english) ||
                                          'Select Destination'}
                                </PopoverTrigger>
                            </FormControl>
                            <PopoverContent className="w-60 p-0">
                                <div className="px-3 py-1">
                                    <Input
                                        className="focus-visible:ring-1"
                                        onChange={debouncedTermChange}
                                    />
                                    {term ? (
                                        <div
                                            className="mt-2 h-[300px] w-full"
                                            onClick={() => {
                                                if (!getDestinationResult.data?.success) return;

                                                handleDestinationClick(
                                                    getDestinationResult.data.destination,
                                                );

                                                setTerm('');
                                            }}
                                        >
                                            {getDestinationResult.isFetching
                                                ? 'Loading...'
                                                : getDestinationResult.data?.success
                                                  ? getDestinationResult.data.destination.publicName
                                                        ?.english
                                                  : getDestinationResult.data?.error}
                                        </div>
                                    ) : (
                                        <InfiniteScroll
                                            className="mt-2"
                                            height={300}
                                            dataLength={destinations.length}
                                            next={() => {
                                                setPage((c) => c + 1);
                                            }}
                                            hasMore={true}
                                            loader={<h4>Loading...</h4>}
                                        >
                                            <div role="list">
                                                {destinations.map((destination) => (
                                                    <div
                                                        key={destination.iata}
                                                        role="listitem"
                                                        onClick={() =>
                                                            handleDestinationClick(destination)
                                                        }
                                                    >
                                                        {destination.publicName?.english}
                                                    </div>
                                                ))}
                                            </div>
                                        </InfiniteScroll>
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { useFormContext } from 'react-hook-form';
import { FaPlaneArrival, FaPlaneDeparture } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import InfiniteScroll from 'react-infinite-scroll-component';
import ResetFieldIcon from './ResetFieldIcon';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import VisuallyHidden from '@/components/VisuallyHidden';
import { cn } from '@/lib/utils';
import { useLazyGetDestinationQuery, useLazyGetDestinationsQuery } from '@/store';
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

    //If route come form query, get more data about destination with iata code
    useEffect(() => {
        route && getDestination({ iata: route });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //To fetch new data every time the page changes
    useEffect(() => {
        getDestinations({ page });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        getDestinationsResult.data?.success &&
            setDestinations([...destinations, ...getDestinationsResult.data.destinations]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getDestinationsResult.data]);

    useEffect(() => {
        term && getDestination({ iata: term });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [term]);

    useEffect(() => {
        !open && setTerm('');
    }, [open]);

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
                <FormItem className="max-sm:w-full">
                    <VisuallyHidden>
                        <FormLabel>Destination</FormLabel>
                    </VisuallyHidden>
                    <div className="grid gap-2 sm:grid-cols-2">
                        <div
                            className={cn(
                                'flex w-full gap-x-1 border-2 py-2 pl-3 pr-4 text-left font-normal max-sm:w-full max-sm:rounded-3xl',
                                {
                                    'rounded-l-3xl': flightDirection === 'D',
                                    'order-last rounded-r-3xl': flightDirection === 'A',
                                },
                            )}
                        >
                            {flightDirection === 'D' && (
                                <FaPlaneDeparture className="flex h-full min-w-5 text-purple" />
                            )}
                            {flightDirection === 'A' && (
                                <FaPlaneArrival className="flex h-full min-w-5 text-purple" />
                            )}
                            Schiphol - AMS
                        </div>
                        <Popover open={open} onOpenChange={setOpen}>
                            <FormControl>
                                <PopoverTrigger
                                    className={cn(
                                        'flex w-full gap-x-1 truncate border-2 py-2 pl-3 pr-4 text-left font-normal max-sm:w-full max-sm:rounded-3xl',
                                        {
                                            'rounded-l-3xl': flightDirection === 'A',
                                            'order-last rounded-r-3xl': flightDirection === 'D',
                                        },
                                    )}
                                >
                                    {flightDirection === 'A' && (
                                        <FaPlaneDeparture className="flex h-full min-w-5 text-purple" />
                                    )}
                                    {flightDirection === 'D' && (
                                        <FaPlaneArrival className="flex h-full min-w-5 text-purple" />
                                    )}
                                    <span className="truncate">
                                        {destinations.find(
                                            (destination) =>
                                                destination.iata === field.value && field.value,
                                        )?.publicName?.english ||
                                            (getDestinationResult.data?.success &&
                                                getDestinationResult.data.destination.publicName
                                                    ?.english) ||
                                            'Select Destination'}
                                    </span>
                                    <ResetFieldIcon
                                        fieldName="route"
                                        className="Reset route field"
                                    />
                                </PopoverTrigger>
                            </FormControl>
                            <PopoverContent className="p-0 popover-content-width-same-as-its-trigger">
                                <div className="flex items-center border-2 px-2">
                                    <IoIosSearch className="size-6" />
                                    <Input
                                        className="border-none focus-visible:ring-transparent"
                                        placeholder="IATA code"
                                        onChange={debouncedTermChange}
                                    />
                                </div>
                                <div className="p-1">
                                    {term ? (
                                        <div
                                            className="h-[300px] w-full p-2"
                                            onClick={() => {
                                                if (!getDestinationResult.data?.success) return;

                                                handleDestinationClick(
                                                    getDestinationResult.data.destination,
                                                );
                                            }}
                                        >
                                            <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
                                                {getDestinationResult.data?.success
                                                    ? getDestinationResult.data.destination
                                                          .publicName?.english
                                                    : getDestinationResult.data?.error}
                                            </div>
                                        </div>
                                    ) : (
                                        <InfiniteScroll
                                            className="scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg mt-2 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300"
                                            height={300}
                                            dataLength={destinations.length}
                                            next={() => {
                                                setPage((c) => c + 1);
                                            }}
                                            hasMore={
                                                !!(
                                                    getDestinationsResult.data?.success &&
                                                    getDestinationsResult.data.destinations.length >
                                                        0
                                                )
                                            }
                                            loader={<div className="p-2">Loading...</div>}
                                        >
                                            <div role="list">
                                                {destinations.map((destination) => (
                                                    <div
                                                        key={destination.iata}
                                                        role="listitem"
                                                        className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
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

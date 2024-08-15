import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useFormContext } from 'react-hook-form';
import { IoIosSearch } from 'react-icons/io';
import { TiArrowSortedDown } from 'react-icons/ti';
import InfiniteScroll from 'react-infinite-scroll-component';
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
import { cn } from '@/lib/utils';
import { useLazyGetAirlineQuery, useLazyGetAirlinesQuery } from '@/store';
import type { Airline, FlightFilters } from '@/types';

export default function Airlines() {
    const [getAirlines, getAirlinesResult] = useLazyGetAirlinesQuery();
    const [getAirline, getAirlineResult] = useLazyGetAirlineQuery();
    const form = useFormContext<FlightFilters>();
    const [airlines, setAirlines] = useState<Airline[]>([]);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [term, setTerm] = useState('');

    //To fetch new data every time the page changes
    useEffect(() => {
        getAirlines({ page });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    //If query is successful, merge the new data with the old data
    useEffect(() => {
        getAirlinesResult.data?.success &&
            setAirlines([...airlines, ...getAirlinesResult.data.airlines]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getAirlinesResult.data]);

    //Every time the search term changes, airline search
    useEffect(() => {
        term && getAirline({ code: term });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [term]);

    //Reset term after popover close
    useEffect(() => {
        !open && setTerm('');
    }, [open]);

    //Set form data and close popover
    const handleDestinationClick = (airline: Airline) => {
        form.setValue('airline', airline.iata);

        setOpen(false);
    };
    const debouncedTermChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value);
    }, 1000);

    return (
        <FormField
            control={form.control}
            name="airline"
            render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                    <FormLabel className="text-lg font-semibold">Select Airline: </FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                        <FormControl>
                            <PopoverTrigger
                                className={cn(
                                    'flex w-full justify-between gap-x-1 rounded-md border-2 bg-white p-2 text-left font-normal',
                                    { 'text-muted-foreground': !field.value },
                                )}
                            >
                                <span className="truncate">
                                    {airlines.find(
                                        (airline) => airline.iata === field.value && field.value,
                                    )?.publicName ||
                                        (getAirlineResult.data?.success &&
                                            getAirlineResult.data.airline.publicName) ||
                                        'Select Airline'}
                                </span>
                                <TiArrowSortedDown className="h-6 min-w-5" />
                            </PopoverTrigger>
                        </FormControl>
                        <PopoverContent className="rounded-md p-0 popover-content-width-same-as-its-trigger">
                            <div className="flex items-center border-2 px-2">
                                <IoIosSearch className="size-6" />
                                <Input
                                    className="border-none focus-visible:ring-transparent"
                                    placeholder="IATA / ICAO code"
                                    onChange={debouncedTermChange}
                                />
                            </div>
                            <div>
                                {term ? (
                                    <div
                                        className="h-[300px] w-full p-2"
                                        onClick={() => {
                                            if (!getAirlineResult.data?.success) return;

                                            handleDestinationClick(getAirlineResult.data.airline);
                                        }}
                                    >
                                        <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
                                            {getAirlineResult.data?.success
                                                ? getAirlineResult.data.airline.publicName
                                                : getAirlineResult.data?.error}
                                        </div>
                                    </div>
                                ) : (
                                    <InfiniteScroll
                                        className="scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg mt-2 p-1 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300"
                                        height={300}
                                        dataLength={airlines.length}
                                        next={() => {
                                            setPage((c) => c + 1);
                                        }}
                                        hasMore={
                                            !!(
                                                getAirlinesResult.data?.success &&
                                                getAirlinesResult.data.airlines.length > 0
                                            )
                                        }
                                        loader={<div className="p-2">Loading...</div>}
                                    >
                                        <div role="list">
                                            {airlines.map((airline) => (
                                                <div
                                                    key={airline.iata}
                                                    role="listitem"
                                                    className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                                                    onClick={() => handleDestinationClick(airline)}
                                                >
                                                    {airline.publicName}
                                                </div>
                                            ))}
                                        </div>
                                    </InfiniteScroll>
                                )}
                            </div>
                        </PopoverContent>
                    </Popover>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

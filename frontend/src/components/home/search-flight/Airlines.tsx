import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useFormContext } from 'react-hook-form';
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
import VisuallyHidden from '@/components/VisuallyHidden';
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

    useEffect(() => {
        getAirlines({ page });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        getAirlinesResult.data?.success &&
            setAirlines([...airlines, ...getAirlinesResult.data.airlines]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getAirlinesResult.data]);

    useEffect(() => {
        term && getAirline({ code: term });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [term]);

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
                <FormItem className="flex flex-col">
                    <FormLabel className="text-lg font-semibold">Select Airline: </FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                        <FormControl>
                            <PopoverTrigger
                                className={cn(
                                    'flex w-60 gap-x-1 rounded-md border-2 bg-white py-2 pl-3 pr-4 text-left font-normal',
                                )}
                            >
                                {getAirlineResult.isFetching
                                    ? null
                                    : airlines.find(
                                          (airline) => airline.iata === field.value && field.value,
                                      )?.publicName ||
                                      (getAirlineResult.data?.success &&
                                          getAirlineResult.data.airline.publicName) ||
                                      'Select Airline'}
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
                                            if (!getAirlineResult.data?.success) return;

                                            handleDestinationClick(getAirlineResult.data.airline);

                                            setTerm('');
                                        }}
                                    >
                                        {getAirlineResult.isFetching
                                            ? 'Loading...'
                                            : getAirlineResult.data?.success
                                              ? getAirlineResult.data.airline.publicName
                                              : getAirlineResult.data?.error}
                                    </div>
                                ) : (
                                    <InfiniteScroll
                                        className="scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg mt-2 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300"
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
                                        loader={<h4>Loading...</h4>}
                                    >
                                        <div role="list">
                                            {airlines.map((airline) => (
                                                <div
                                                    key={airline.iata}
                                                    role="listitem"
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

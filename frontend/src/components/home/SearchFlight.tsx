import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RiPlaneLine } from 'react-icons/ri';
import { useSearchParams } from 'react-router-dom';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { stringifyObjectValues } from '@/lib/utils';
import { flightFiltersSchema } from '@/schemas';
import { Button } from '../ui/button';
import VisuallyHidden from '../VisuallyHidden';
import type { SubmitHandler } from 'react-hook-form';
import type { FlightFilters } from '@/types';

export default function SearchFlight() {
    const [searchParams, setSearchParams] = useSearchParams();
    const validatedSearchParams = useMemo(
        () => flightFiltersSchema.safeParse(Object.fromEntries(searchParams)),

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );
    const form = useForm<FlightFilters>({
        resolver: zodResolver(flightFiltersSchema),
        mode: 'all',
        defaultValues: validatedSearchParams.success
            ? validatedSearchParams.data
            : {
                  flightDirection: 'A',
              },
    });

    const onSubmit: SubmitHandler<FlightFilters> = (data) => {
        setSearchParams(stringifyObjectValues(data));

        console.log(data);
    };

    return (
        <section
            aria-describedby="bookFlight"
            className="rounded-lg bg-white p-6"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex items-center">
                        <div className="mr-auto">
                            <div className="flex items-center gap-1.5 text-lg">
                                <RiPlaneLine className="size-6 rotate-90" />
                                <h2
                                    className="font-bold uppercase"
                                    id="bookFlight"
                                >
                                    Book your flight
                                </h2>
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name="flightDirection"
                            render={({ field }) => (
                                <FormItem>
                                    <VisuallyHidden>
                                        <FormLabel>Flight Direction</FormLabel>
                                    </VisuallyHidden>
                                    <FormControl className="flex items-center text-center">
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="gap-0"
                                        >
                                            <FormItem>
                                                <FormControl>
                                                    <RadioGroupItem
                                                        value="D"
                                                        className="hidden"
                                                    />
                                                </FormControl>
                                                <FormLabel className="!mt-0 inline-block w-28 cursor-pointer rounded-l-3xl bg-purple px-5 py-3 font-semibold text-white">
                                                    Departure
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem>
                                                <FormControl>
                                                    <RadioGroupItem
                                                        value="A"
                                                        className="hidden"
                                                    />
                                                </FormControl>
                                                <FormLabel className="!mt-0 inline-block w-28 cursor-pointer rounded-r-3xl bg-gray-200 px-5 py-3 font-semibold text-purple">
                                                    Arrival
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="bg-purple text-white">
                        Show Flights
                    </Button>
                </form>
            </Form>
        </section>
    );
}

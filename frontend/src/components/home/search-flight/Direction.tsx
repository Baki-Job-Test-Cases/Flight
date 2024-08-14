import { useFormContext } from 'react-hook-form';
import { RiPlaneLine } from 'react-icons/ri';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import VisuallyHidden from '@/components/VisuallyHidden';
import { FlightFilters } from '@/types';

export default function Direction() {
    const form = useFormContext<FlightFilters>();

    return (
        <div className="grid items-center sm:grid-cols-2">
            <div>
                <div className="flex items-center gap-1.5 text-lg">
                    <RiPlaneLine className="h-6 min-w-6 rotate-90" />
                    <h1 className="font-bold uppercase" id="bookFlight">
                        Book your flight
                    </h1>
                </div>
            </div>
            <FormField
                control={form.control}
                name="flightDirection"
                render={({ field }) => (
                    <FormItem className="sm:ml-auto sm:w-72">
                        <VisuallyHidden>
                            <FormLabel>Flight Direction</FormLabel>
                        </VisuallyHidden>
                        <FormControl className="grid grid-cols-2 items-center">
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="gap-0"
                            >
                                <FormItem className="w-full text-center">
                                    <FormControl>
                                        <RadioGroupItem value="D" className="hidden" />
                                    </FormControl>
                                    <FormLabel className="!mt-0 inline-block w-full cursor-pointer rounded-l-3xl bg-purple px-5 py-3 font-semibold text-white">
                                        Departure
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="w-full text-center">
                                    <FormControl>
                                        <RadioGroupItem value="A" className="hidden" />
                                    </FormControl>
                                    <FormLabel className="!mt-0 inline-block w-full cursor-pointer rounded-r-3xl bg-gray-200 px-5 py-3 font-semibold text-purple">
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
    );
}

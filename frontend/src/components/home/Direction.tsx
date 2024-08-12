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
import { FlightFilters } from '@/types';
import VisuallyHidden from '../VisuallyHidden';

export default function Direction() {
    const form = useFormContext<FlightFilters>();

    return (
        <div className="flex flex-wrap items-center">
            <div className="mr-auto">
                <div className="flex items-center gap-1.5 text-lg">
                    <RiPlaneLine className="size-6 rotate-90" />
                    <h2 className="font-bold uppercase" id="bookFlight">
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
    );
}

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
        <div className="flex flex-wrap items-center">
            <div className="mr-auto">
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
                    <FormItem className="max-[300px]:w-full">
                        <VisuallyHidden>
                            <FormLabel>Flight Direction</FormLabel>
                        </VisuallyHidden>
                        <FormControl className="flex items-center text-center max-[300px]:flex-col max-[300px]:gap-y-2">
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="gap-0"
                            >
                                <FormItem className="max-[300px]:w-full">
                                    <FormControl>
                                        <RadioGroupItem value="D" className="hidden" />
                                    </FormControl>
                                    <FormLabel className="!mt-0 inline-block w-28 cursor-pointer rounded-l-3xl bg-purple px-5 py-3 font-semibold text-white max-[300px]:w-full max-[300px]:rounded-3xl">
                                        Departure
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="max-[300px]:w-full">
                                    <FormControl>
                                        <RadioGroupItem value="A" className="hidden" />
                                    </FormControl>
                                    <FormLabel className="!mt-0 inline-block w-28 cursor-pointer rounded-r-3xl bg-gray-200 px-5 py-3 font-semibold text-purple max-[300px]:w-full max-[300px]:rounded-3xl">
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

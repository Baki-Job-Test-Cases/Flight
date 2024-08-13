import { useFormContext } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import type { FlightFilters } from '@/types';

export default function IncludeDelays() {
    const form = useFormContext<FlightFilters>();

    return (
        <FormField
            control={form.control}
            name="includedelays"
            render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md">
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="size-3 rounded-full border-purple data-[state=checked]:bg-purple [&>span]:hidden"
                        />
                    </FormControl>
                    <FormLabel className="text-md">Include Delays</FormLabel>
                    <FormDescription />
                </FormItem>
            )}
        />
    );
}

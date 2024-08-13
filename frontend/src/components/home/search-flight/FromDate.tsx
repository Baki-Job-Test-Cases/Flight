import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import VisuallyHidden from '@/components/VisuallyHidden';
import { cn } from '@/lib/utils';
import type { FlightFilters } from '@/types';

export default function FromDate() {
    const form = useFormContext<FlightFilters>();
    const [open, setOpen] = useState(false);

    return (
        <>
            <FormField
                control={form.control}
                name="fromDateTime"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <VisuallyHidden>
                            <FormLabel>Date of from</FormLabel>
                        </VisuallyHidden>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant={'outline'}
                                        className={cn(
                                            'text-md w-[240px] justify-normal rounded-l-3xl border-2 pl-1 text-left font-normal',
                                            !field.value && 'text-muted-foreground',
                                        )}
                                    >
                                        <FaRegCalendarAlt className="flex h-full w-8 text-purple" />
                                        {field.value
                                            ? new Date(field.value || '').toDateString()
                                            : 'Pick a from date'}
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(e) => {
                                        e && field.onChange(e);

                                        setOpen(false);
                                    }}
                                    disabled={(date) =>
                                        date < new Date(new Date().setHours(0, 0, 0, 0))
                                    }
                                />
                            </PopoverContent>
                        </Popover>
                        <FormDescription />
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
}

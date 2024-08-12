import { useEffect, useState } from 'react';
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
import { cn } from '@/lib/utils';
import VisuallyHidden from '../VisuallyHidden';
import type { FlightFilters } from '@/types';

export default function ToDate() {
    const form = useFormContext<FlightFilters>();
    const [open, setOpen] = useState(false);
    const watchFromDateTime = form.watch('fromDateTime');

    useEffect(() => {
        form.resetField('toDateTime');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchFromDateTime]);

    return (
        <>
            <FormField
                control={form.control}
                name="toDateTime"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <VisuallyHidden>
                            <FormLabel>Date of to</FormLabel>
                        </VisuallyHidden>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant={'outline'}
                                        className={cn(
                                            'text-md w-[240px] justify-normal rounded-r-3xl border-2 pl-1 text-left font-normal',
                                            !field.value && 'text-muted-foreground',
                                        )}
                                    >
                                        <FaRegCalendarAlt className="flex h-full w-8 text-purple" />
                                        {field.value
                                            ? new Date(field.value || '').toDateString()
                                            : 'Pick a to date'}
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
                                    disabled={(date) => {
                                        const fromDate = new Date(
                                            form.getValues('fromDateTime') || '',
                                        );
                                        const tomorrow = new Date(
                                            form.getValues('fromDateTime') || '',
                                        );

                                        tomorrow.setDate(tomorrow.getDate() + 3);

                                        return (
                                            date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                                            date < fromDate ||
                                            date > tomorrow
                                        );
                                    }}
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

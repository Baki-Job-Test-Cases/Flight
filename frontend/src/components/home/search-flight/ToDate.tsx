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
import { useLocale } from '@/hooks/use-locale';
import { cn } from '@/lib/utils';
import type { FlightFilters } from '@/types';

export default function ToDate() {
    const locale = useLocale();
    const form = useFormContext<FlightFilters>();
    const [open, setOpen] = useState(false);

    return (
        <>
            <FormField
                control={form.control}
                name="toDateTime"
                render={({ field }) => (
                    <FormItem className="max-sm:w-full">
                        <VisuallyHidden>
                            <FormLabel>Date of to</FormLabel>
                        </VisuallyHidden>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant={'outline'}
                                        className={cn(
                                            'text-md w-full justify-normal rounded-r-3xl border-2 pl-1 text-left font-normal max-sm:w-full max-sm:rounded-3xl',
                                            !field.value && 'text-muted-foreground',
                                        )}
                                    >
                                        <FaRegCalendarAlt className="flex h-full w-8 text-purple" />
                                        {field.value
                                            ? new Date(field.value || '').toLocaleDateString(
                                                  locale,
                                                  {
                                                      year: 'numeric',
                                                      month: 'short',
                                                      day: 'numeric',
                                                      weekday: 'long',
                                                  },
                                              )
                                            : 'Pick a to date'}
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(e) => {
                                        e && field.onChange(new Date(e.setHours(23, 59, 59, 999)));

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

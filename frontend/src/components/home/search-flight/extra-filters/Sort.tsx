import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { TiArrowSortedDown } from 'react-icons/ti';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
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
import ResetFieldIcon from '../ResetFieldIcon';
import type { FlightFilters } from '@/types';

interface SortOption {
    value: FlightFilters['sort'];
    text: string;
}

const sortOptions: SortOption[] = [
    { value: '+flightName', text: 'Flight Name Ascending' },
    { value: '-flightName', text: 'Flight Name Descending' },
    { value: '+scheduleDate', text: 'Schedule Date Ascending' },
    { value: '-scheduleDate', text: 'Schedule Date Descending' },
    { value: '+scheduleTime', text: 'Schedule Time Ascending' },
    { value: '-scheduleTime', text: 'Schedule Time Descending' },
    { value: '+flightDirection', text: 'Flight Direction Ascending' },
    { value: '-flightDirection', text: 'Flight Direction Descending' },
    { value: '+mainFlight', text: 'Main Flight Ascending' },
    { value: '-mainFlight', text: 'Main Flight Descending' },
    { value: '+airlineCode', text: 'Airline Code Ascending' },
    { value: '-airlineCode', text: 'Airline Code Descending' },
    { value: '+id', text: 'Id Ascending' },
    { value: '-id', text: 'Id Descending' },
    { value: '+estimatedLandingTime', text: 'Estimated Landing Time Ascending' },
    { value: '-estimatedLandingTime', text: 'Estimated Landing Time Descending' },
    { value: '+actualLandingTime', text: 'Actual Landing Time Ascending' },
    { value: '-actualLandingTime', text: 'Actual Landing Time Descending' },
    { value: '+publicEstimatedOffBlockTime', text: 'Public Estimated Off Block Time Ascending' },
    { value: '-publicEstimatedOffBlockTime', text: 'Public Estimated Off Block Time Descending' },
    { value: '+actualOffBlockTime', text: 'Actual Off Block Time Ascending' },
    { value: '-actualOffBlockTime', text: 'Actual Off Block Time Descending' },
    { value: '+expectedTimeBoarding', text: 'Expected Time Boarding Ascending' },
    { value: '-expectedTimeBoarding', text: 'Expected Time Boarding Descending' },
    { value: '+expectedTimeGateClosing', text: 'Expected Time Gate Closing Ascending' },
    { value: '-expectedTimeGateClosing', text: 'Expected Time Gate Closing Descending' },
    { value: '+expectedTimeGateOpen', text: 'Expected Time Gate Open Ascending' },
    { value: '-expectedTimeGateOpen', text: 'Expected Time Gate Open Descending' },
    { value: '+expectedTimeOnBelt', text: 'Expected Time On Belt Ascending' },
    { value: '-expectedTimeOnBelt', text: 'Expected Time On Belt Descending' },
    { value: '+scheduleDateTime', text: 'Schedule Date Time Ascending' },
    { value: '-scheduleDateTime', text: 'Schedule Date Time Descending' },
    { value: '+lastUpdatedAt', text: 'Last Updated At Ascending' },
    { value: '-lastUpdatedAt', text: 'Last Updated At Descending' },
];

export default function Sort() {
    const form = useFormContext<FlightFilters>();
    const [open, setOpen] = useState(false);

    return (
        <FormField
            control={form.control}
            name="sort"
            render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                    <FormLabel className="text-lg font-semibold">Sort By: </FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                        <FormControl>
                            <PopoverTrigger
                                role="combobox"
                                className={cn(
                                    'flex max-w-full items-center justify-between rounded-md border-2 bg-white p-2 text-left',
                                    !field.value && 'text-muted-foreground',
                                )}
                            >
                                <span className="truncate">
                                    {field.value
                                        ? sortOptions.find(({ value }) => value === field.value)
                                              ?.text
                                        : 'Select Sort Option'}
                                </span>
                                <ResetFieldIcon fieldName="sort" aria-label="Reset sort field" />
                                <TiArrowSortedDown className="h-6 min-w-5" />
                            </PopoverTrigger>
                        </FormControl>
                        <PopoverContent className="p-0 popover-content-width-same-as-its-trigger">
                            <Command>
                                <CommandInput placeholder="Search option..." className="h-9" />
                                <CommandList className="scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg mt-2 p-1 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
                                    <CommandEmpty>No sort option found.</CommandEmpty>
                                    <CommandGroup>
                                        {sortOptions.map(({ text, value }) => (
                                            <CommandItem
                                                value={text}
                                                key={value}
                                                onSelect={() => {
                                                    //Set form's sort value
                                                    form.setValue('sort', value);

                                                    setOpen(false);
                                                }}
                                            >
                                                {text}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

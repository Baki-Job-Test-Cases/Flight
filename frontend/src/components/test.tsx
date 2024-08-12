import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

export default function ComboboxDemo() {
    const [data, setData] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [term, setTerm] = useState('');
    const [page, setPage] = useState(0);
    const [listElement, setListElement] = useState<HTMLDivElement | null>(null);

    const fetchData = async () => {
        const response = await fetch(
            'http://localhost:8080/destinations?' +
                new URLSearchParams({ page: page.toString() }),
        );
        const responseData = await response.json();

        setData([...data, ...responseData.destinations]);
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    useEffect(() => {
        console.log(listElement);
        if (
            !listElement ||
            !listElement.querySelector('div[role="group"] :last-child')
        )
            return;

        const infiniteScrollObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    console.log('worked instersection');

                    setPage((c) => c + 1);
                }
            },
            { threshold: 0.5 },
        );

        infiniteScrollObserver.observe(
            listElement.querySelector(
                'div[role="group"] :last-child',
            ) as Element,
        );

        return () => {
            infiniteScrollObserver.disconnect();
        };
    }, [listElement, data, term]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[300px] justify-between"
                >
                    {/* {value
                        ? frameworks.find(
                              (framework) => framework.value === value,
                          )?.label
                        : 'Select framework...'} */}
                    {/* <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                        onValueChange={setTerm}
                    />
                    <CommandList className="h-40" id="test">
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup ref={setListElement}>
                            {data.map((destination) => (
                                <CommandItem
                                    key={destination.iata}
                                    value={destination.iata}
                                    onSelect={(currentValue) => {
                                        setValue(
                                            currentValue === value
                                                ? ''
                                                : currentValue,
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    {destination.publicName?.english}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

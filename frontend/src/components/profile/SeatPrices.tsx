import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface Schema {
    price?: number;
    value: string;
}

const seatSchemas: Schema[][] = [
    [
        { price: 156, value: 'Main' },
        { price: 204, value: 'Comfort+' },
        { value: 'empty' },
        { price: 386, value: 'Delta One' },
        { value: 'empty' },
    ],
    [
        { price: 182, value: 'Main' },
        { value: 'empty' },
        { value: 'empty' },
        { price: 400, value: 'First' },
        { value: 'empty' },
    ],
    [
        { price: 225, value: 'Anytime' },
        { price: 253, value: 'Business Select' },
        { value: 'empty' },
        { value: 'empty' },
        { value: 'empty' },
    ],
    [
        { price: 183, value: 'Economy' },
        { price: 449, value: 'Economy Flexible' },
        { value: 'empty' },
        { price: 407, value: 'First' },
        { value: 'empty' },
    ],
];

export default function SeatPrices() {
    const randomNumber = useMemo(() => Math.floor(Math.random() * 4), []);

    return (
        <div className="flex flex-col max-sm:ml-14 max-[400px]:ml-0">
            <div className="flex flex-wrap gap-3">
                {seatSchemas[randomNumber].map((schema, index) => (
                    <div
                        key={index}
                        className={cn(
                            'flex h-28 w-24 flex-col items-center gap-y-3 rounded-md border-[3px] border-gray-400/50 py-3',
                            { 'border-none bg-gray-300': schema.value === 'empty' },
                        )}
                    >
                        {schema.value !== 'empty' && (
                            <>
                                <span className="basis-1/2 text-xl font-semibold">
                                    {'$' + schema.price}
                                </span>
                                <span className="basis-1/2 text-center font-medium capitalize text-gray-500">
                                    {schema.value}
                                </span>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div className="cursor-pointer text-xs text-sky">{`${randomNumber + 1} more option${randomNumber >= 1 ? 's' : ''}`}</div>
        </div>
    );
}

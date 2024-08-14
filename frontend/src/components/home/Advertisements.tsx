import { FaHotel } from 'react-icons/fa';
import { FaCarRear, FaUmbrellaBeach } from 'react-icons/fa6';
import { cn } from '@/lib/utils';
import VisuallyHidden from '../VisuallyHidden';
import type { IconType } from 'react-icons/lib';

interface Advertisement {
    Icon?: IconType;
    text: string;
    bgImageClass: string;
}

const advertisements: Advertisement[] = [
    {
        Icon: FaCarRear,
        text: 'car rentals',
        bgImageClass: 'bg-rent',
    },
    {
        Icon: FaHotel,
        text: 'hotels',
        bgImageClass: 'bg-hotel',
    },
    {
        Icon: FaUmbrellaBeach,
        text: 'travel packages',
        bgImageClass: 'bg-travel',
    },
];

export default function Advertisements() {
    return (
        <aside
            className="flex h-fit flex-wrap items-center justify-center gap-6 text-white lg:sticky lg:top-3 lg:flex-col"
            aria-label="Other options"
        >
            {advertisements.map((advertisement) => (
                <div
                    key={advertisement.text}
                    className={cn(
                        'flex size-64 flex-col-reverse rounded-2xl bg-cover p-4 font-semibold',
                        advertisement.bgImageClass,
                    )}
                >
                    <h2 className="text-xl uppercase">{advertisement.text}</h2>
                    {advertisement.Icon && <advertisement.Icon className="size-8" />}
                </div>
            ))}
        </aside>
    );
}

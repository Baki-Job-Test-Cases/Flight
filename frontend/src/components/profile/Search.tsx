import { IoIosArrowDown } from 'react-icons/io';
import RateStars from './RateStars';

export default function Search() {
    return (
        <section
            aria-label="search"
            className="flex flex-wrap items-center justify-between gap-3 gap-y-4 bg-white px-12 py-6"
        >
            <div className="flex flex-wrap items-center gap-6 font-semibold">
                <div className="rounded-md border-2 px-4 py-1 text-lg">Times</div>
                <div className="rounded-md border-2 px-4 py-1 text-lg">Stops</div>
                <div className="rounded-md border-2 px-4 py-1 text-lg">Airlines</div>
                <div className="rounded-md border-2 px-4 py-1 text-lg">Airports</div>
                <div className="rounded-md border-2 px-4 py-1 text-lg">Amenities</div>
                <div className="text-sky flex cursor-pointer items-end gap-x-1 text-base">
                    Edit Search <IoIosArrowDown className="size-4" />
                </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 [&>div:not(:last-child)]:before:absolute [&>div:not(:last-child)]:before:-right-6 [&>div:not(:last-child)]:before:top-1/2 [&>div:not(:last-child)]:before:h-4 [&>div:not(:last-child)]:before:w-[1.5px] [&>div:not(:last-child)]:before:-translate-y-1/2 [&>div:not(:last-child)]:before:bg-gray-300 max-sm:[&>div:not(:last-child)]:before:hidden">
                <RateStars rate={2} />
                <RateStars rate={3} />
                <RateStars rate={4} />
                <RateStars rate={5} />
                <RateStars rate={6} />
            </div>
        </section>
    );
}

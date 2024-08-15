import { IoIosArrowDown, IoIosInformationCircleOutline } from 'react-icons/io';

export default function Sort() {
    return (
        <section aria-label="Sort options for flight list">
            <div className="flex flex-wrap items-center justify-between gap-y-2">
                <div className="flex items-center justify-center gap-x-1 text-xl">
                    <span className="font-normal">Sort by:</span>
                    <span className="font-bold">Recommended</span>
                    <IoIosArrowDown className="ml-1 size-4" />
                </div>
                <div className="flex items-center justify-center gap-x-1 text-xl">
                    <IoIosInformationCircleOutline className="size-8 text-sky" />
                    <span className="font-normal">Avg Fare:</span>
                    <span className="font-bold">$225</span>
                </div>
            </div>
        </section>
    );
}

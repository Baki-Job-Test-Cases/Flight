import { IoIosArrowDown } from 'react-icons/io';
import SeatPrices from './SeatPrices';
import icon from '@/assets/airline-icon.png';
import { useLocale } from '@/hooks/use-locale';
import type { Flight } from '@/types';

type FlightItemProps = {
    flight: Flight;
};

export default function FlightItem({ flight }: FlightItemProps) {
    const locale = useLocale();

    return (
        <div role="listitem" className="grid gap-4 rounded-sm bg-white p-8 md:grid-cols-2">
            <div className="flex gap-x-4 max-[400px]:flex-col">
                <div className="mt-1 flex h-fit w-full max-w-[46px] items-center justify-center overflow-hidden rounded-full border border-gray-400 p-[2px]">
                    <img
                        src={icon}
                        alt={`${flight.airline?.publicName}'s icon`}
                        className="h-10 w-full rounded-full object-contain"
                    />
                </div>
                <div className="flex flex-col gap-y-4">
                    <div>
                        <h2 className="text-3xl">
                            {new Date(flight.scheduleDateTime || '').toLocaleDateString(locale, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </h2>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-16 gap-y-5">
                        <div className="mr-8">
                            <p className="font-semibold">{flight.airline?.publicName}</p>
                            <div className="flex cursor-pointer items-end gap-x-1 text-base text-sky">
                                Flight Details <IoIosArrowDown className="size-4" />
                            </div>
                        </div>
                        <div className="font-semibold">
                            <p>Nonstop</p>
                            <p className="text-gray-500">1h 32m </p>
                        </div>
                        <div className="font-semibold">
                            <p className="uppercase">
                                {flight.flightDirection === 'A'
                                    ? `${flight.destinations?.[0].publicName?.english} to AMS`
                                    : `AMS to ${flight.destinations?.[0].publicName?.english}`}
                            </p>
                            <p className="text-gray-500">{flight.flightName}</p>
                        </div>
                    </div>
                </div>
            </div>
            <SeatPrices />
        </div>
    );
}

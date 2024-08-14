import { LuPlaneLanding, LuPlaneTakeoff } from 'react-icons/lu';
import { MdOutlineAirplanemodeActive } from 'react-icons/md';
import BookFlight from './BookFlight';
import { useLocale } from '@/hooks/use-locale';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import type { Flight } from '@/types';

type FligtItemProps = {
    flight: Flight;
};

export default function FlightItem({ flight }: FligtItemProps) {
    const locale = useLocale();

    return (
        <div role="listitem">
            <div className="flex flex-col rounded-xl rounded-bl-none bg-white">
                <div className="space-y-3 p-6 pb-4">
                    <h2
                        className={cn('flex w-fit font-semibold', {
                            'flex-row-reverse': flight.flightDirection === 'D',
                        })}
                    >
                        <span>{flight.destinations?.[0].publicName?.english}</span>
                        <span className="mx-1">-</span>
                        <span>Schiphol</span>
                    </h2>
                    <div className="flex items-center gap-x-2 max-sm:flex-col max-sm:text-center">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-x-2">
                                <LuPlaneTakeoff className="mr-px size-5" />
                                Departure
                            </div>
                            <span className="mt-1 text-xl font-bold">
                                {flight.flightDirection === 'D'
                                    ? new Date(flight.scheduleDateTime || '').toLocaleTimeString(
                                          locale,
                                          {
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                              hour: '2-digit',
                                              minute: '2-digit',
                                          },
                                      )
                                    : '-'}
                            </span>
                            <span className="font-medium">
                                Airport:{' '}
                                {flight.flightDirection === 'D'
                                    ? 'AMS'
                                    : flight.destinations?.[0].iata}
                            </span>
                        </div>
                        <div className="my-3 h-16 w-[2px] bg-gray-300 sm:mx-auto sm:h-[2px] sm:w-full sm:max-w-24"></div>
                        <div className="flex flex-col items-center">
                            <div className="bg-airline-banner h-6 w-24 bg-contain bg-no-repeat" />
                            <MdOutlineAirplanemodeActive className="mt-1 size-8 rotate-90 text-purple" />
                            <span>2h 25m (Nonstop)</span>
                        </div>
                        <div className="my-3 h-16 w-[2px] bg-gray-300 sm:mx-auto sm:h-[2px] sm:w-full sm:max-w-24"></div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-x-2">
                                <LuPlaneLanding className="size-5" />
                                Arrival
                            </div>
                            <span className="mt-1 text-xl font-bold">
                                {flight.flightDirection === 'A'
                                    ? new Date(flight.scheduleDateTime || '').toLocaleTimeString(
                                          locale,
                                          {
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                              hour: '2-digit',
                                              minute: '2-digit',
                                          },
                                      )
                                    : '-'}
                            </span>
                            <span className="font-medium">
                                Airport:{' '}
                                {flight.flightDirection === 'A'
                                    ? 'AMS'
                                    : flight.destinations?.[0].iata}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between gap-2 max-[360px]:justify-center min-[360px]:pl-6">
                    <div>
                        <div className="text-xl font-bold text-purple">Price: $200</div>
                        <div className="font-medium">Round Trip</div>
                    </div>
                    {flight.id && <BookFlight id={flight.id} />}
                </div>
            </div>
            <Button className="text-md w-fit rounded-none rounded-b-lg bg-gray-300 px-5 py-6 font-medium text-purple underline hover:bg-gray-300">
                Check the details
            </Button>
        </div>
    );
}

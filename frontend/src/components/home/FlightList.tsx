import FlightItem from './FlightItem';
import type { Flight } from '@/types';

type FlightListProps = {
    flights: Flight[];
};

export default function FlightList({ flights }: FlightListProps) {
    if (flights.length < 1) return <div>No more Flights...</div>;

    return (
        <section aria-label="Flight List" className="w-full">
            <div aria-label="list" className="flex flex-col gap-y-5">
                {flights.map((flight) => (
                    <FlightItem key={flight.id} flight={flight} />
                ))}
            </div>
        </section>
    );
}

import FlightItem from './FlightItem';
import { useGetUserFlightsQuery } from '@/store';
import LoadingSpinner from '../LoadingSpinner';

export default function FlightList() {
    const { data, isFetching, error } = useGetUserFlightsQuery();

    if (isFetching) return <LoadingSpinner className="mx-auto size-40 animate-spin" />;
    if (error || (data && 'success' in data && !data.success))
        return <div className="text-3xl text-red-500">Something went wrong..!</div>;

    return (
        <section aria-label="Booked flight list">
            <div role="list" className="flex flex-col gap-y-6">
                {data &&
                    'success' in data &&
                    data.success &&
                    data.flights &&
                    data.flights.map((flight) => <FlightItem key={flight.id} flight={flight} />)}
            </div>
        </section>
    );
}

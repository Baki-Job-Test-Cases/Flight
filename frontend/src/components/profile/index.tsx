import { useGetUserFlightsQuery } from '@/store';

export default function Profile() {
    const { data, isFetching, error } = useGetUserFlightsQuery();

    if (isFetching) return <div>Loading</div>;
    if (error) return <div>Error.</div>;

    return (
        <div>
            {data &&
                'success' in data &&
                data.success &&
                data.flights &&
                data.flights.map((flight) => <div key={flight.id}>{flight.id}</div>)}
        </div>
    );
}

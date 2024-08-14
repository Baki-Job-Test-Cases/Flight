import Advertisements from '@/components/home/Advertisements';
import SearchFlight from '@/components/home/search-flight';

export default function HomePage() {
    return (
        <div className="mx-2 flex gap-6 max-lg:flex-col md:mx-5">
            <SearchFlight />
            <Advertisements />
        </div>
    );
}

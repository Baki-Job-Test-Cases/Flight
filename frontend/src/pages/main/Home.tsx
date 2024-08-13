import Advertisements from '@/components/home/Advertisements';
import SearchFlight from '@/components/home/search-flight';

export default function HomePage() {
    return (
        <div className="flex gap-6">
            <SearchFlight />
            <Advertisements />
        </div>
    );
}

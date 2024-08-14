import FlightList from './FlightList';
import Search from './Search';
import Sort from './Sort';

export default function Profile() {
    return (
        <div className="flex flex-col gap-y-8">
            <Search />
            <div className="space-y-8 px-4 md:px-12">
                <Sort />
                <FlightList />
            </div>
        </div>
    );
}

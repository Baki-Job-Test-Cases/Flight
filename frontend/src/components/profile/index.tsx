import FlightList from './FlightList';
import Search from './Search';
import Sort from './Sort';
import VisuallyHidden from '../VisuallyHidden';

export default function Profile() {
    return (
        <div className="flex flex-col gap-y-8" aria-describedby="profile">
            <VisuallyHidden>
                <h1 id="profile">Profile</h1>
            </VisuallyHidden>
            <Search />
            <div className="space-y-8 px-4 md:px-12">
                <Sort />
                <FlightList />
            </div>
        </div>
    );
}

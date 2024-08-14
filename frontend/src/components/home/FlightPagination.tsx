import { ImSpinner9 } from 'react-icons/im';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../ui/button';

type FlightPaginationProps = {
    isLoading?: boolean;
};

export default function FlightPagination({ isLoading }: FlightPaginationProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get('page')) || 1;

    //Set page at search params for go previous page
    const handlePreviousClick = () => {
        if (page < 2) return;

        searchParams.set('page', (page - 1).toString());

        setSearchParams(searchParams);
    };

    //Set page at search params for go next page
    const handleNextClick = () => {
        searchParams.set('page', (page + 1).toString());

        setSearchParams(searchParams);
    };

    return (
        <div className="my-3 flex items-center justify-center gap-x-3">
            <Button
                className="w-24 border-2 bg-purple px-4 py-2"
                onClick={handlePreviousClick}
                disabled={isLoading || page < 2}
                aria-label={isLoading ? 'Loading previous page' : 'Previous Page'}
            >
                {isLoading ? <ImSpinner9 className="size-full animate-spin p-px" /> : 'Previous'}
            </Button>
            <Button
                className="w-24 border-2 bg-purple px-4 py-2"
                onClick={handleNextClick}
                disabled={isLoading}
                aria-label={isLoading ? 'Loading bext page' : 'Next page'}
            >
                {isLoading ? <ImSpinner9 className="size-full animate-spin p-px" /> : 'Next'}
            </Button>
        </div>
    );
}

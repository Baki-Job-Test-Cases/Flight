import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useSession } from '@/hooks/use-session';
import { useAddFlightMutation } from '@/store';
import LoadingSpinner from '../LoadingSpinner';

type BookFlightProps = {
    id: string;
};

export default function BookFlight({ id }: BookFlightProps) {
    const { data: session, update } = useSession();
    const [addFlight, { data: result, isLoading, error }] = useAddFlightMutation();

    useEffect(() => {
        //Show notification about book flight result
        if (error) {
            toast('Something went wrong..!', { type: 'error' });
        } else if (result && 'add' in result) {
            toast(result.add ? 'Successfully Booked' : result.error, {
                type: result.add ? 'success' : 'error',
            });
        }
    }, [result, error]);

    if (session?.flights.includes(id))
        return (
            <div className="flex h-[4.5rem] w-44 items-center justify-center rounded-lg rounded-bl-none rounded-tr-none bg-purple/45 text-lg text-white">
                Booked
            </div>
        );

    if (!session)
        return (
            <Link
                to="/login"
                className="flex h-[4.5rem] items-center justify-center rounded-lg rounded-bl-none rounded-tr-none bg-purple px-10 text-lg text-white"
            >
                Book Flight
            </Link>
        );

    return (
        <AlertDialog>
            <AlertDialogTrigger
                className="flex h-[4.5rem] w-44 items-center justify-center rounded-lg rounded-bl-none rounded-tr-none bg-purple px-10 text-lg text-white"
                aria-label={isLoading ? 'Booking flight' : 'Book flight'}
                disabled={isLoading}
            >
                {isLoading ? <LoadingSpinner className="size-6 animate-spin" /> : 'Book Flight'}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you will book this flight?</AlertDialogTitle>
                    <AlertDialogDescription />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel aria-label="Cancel book flight">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => addFlight({ id })}
                        aria-label="Continue to book flight"
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

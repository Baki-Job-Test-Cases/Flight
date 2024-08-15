import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSession } from '@/hooks/use-session';
import { cn } from '@/lib/utils';
import { useSignOutMutation } from '@/store';
import LoadingSpinner from '../LoadingSpinner';
import { Button } from '../ui/button';

export default function SignOut({
    className,
    onClick,
    disabled,
}: React.ComponentPropsWithoutRef<'button'>) {
    const navigate = useNavigate();
    const { data: session, update: updateSession } = useSession();
    const [signout, { data: result, isLoading, error }] = useSignOutMutation();

    const handleSignOutClick = () => signout();

    useEffect(() => {
        //Show notification about sign out result
        if (error) {
            toast('Something went wrong..!', { type: 'error' });
        } else if (result) {
            toast(result.signOut ? 'Successfully Signed Out' : result.error, {
                type: result.signOut ? 'success' : 'error',
            });

            //if sign out success redirect main page and reset session state
            if (result.signOut) {
                navigate('/', { replace: true });

                updateSession();
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result, error]);

    return (
        session && (
            <Button
                className={cn(
                    'h-10 w-full rounded-md border-black bg-purple text-xs uppercase tracking-widest',
                    className,
                )}
                disabled={isLoading || disabled}
                aria-label={isLoading ? 'Signing out' : 'Sign out'}
                onClick={(e) => {
                    handleSignOutClick();

                    onClick && onClick(e);
                }}
            >
                {isLoading ? <LoadingSpinner className="size-6 animate-spin" /> : 'Sign Out'}
            </Button>
        )
    );
}

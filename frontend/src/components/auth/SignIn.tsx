import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ImSpinner6 } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signInSchema } from '@/schemas';
import { useSignInMutation } from '@/store';
import type { SubmitHandler } from 'react-hook-form';
import type { SignInForm } from '@/types';

export default function SignIn() {
    const navigate = useNavigate();
    const form = useForm<SignInForm>({
        mode: 'all',
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const [signIn, { data: result, isLoading }] = useSignInMutation();
    const onSubmit: SubmitHandler<SignInForm> = (data) => signIn(data);

    useEffect(() => {
        if (result) {
            //Show notification about sign in result
            toast(result.signIn ? 'Successfully Signed In' : result.error, {
                type: result.signIn ? 'success' : 'error',
            });

            if (result.signIn) {
                //if sign in success redirect main page
                navigate('/', { replace: true });
            } else {
                //if sign in failure reset password input
                form.resetField('password');
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result]);

    return (
        <div className="flex h-full justify-center">
            <div className="flex-1 bg-login bg-cover max-md:hidden"></div>
            <div className="my-auto flex w-1/2 max-w-[35rem] flex-col items-center px-14 py-2 max-md:w-full max-md:max-w-full max-md:px-[10%]">
                <h1 id="loginForm" className="mb-6 text-3xl">
                    Sign In to continue
                </h1>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        aria-labelledby="loginForm"
                        className="w-full"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="email@email.com"
                                            type="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="mt-4 h-12 w-full rounded-md border-black bg-[#622fcf] text-xs uppercase tracking-widest"
                            disabled={isLoading || !form.formState.isValid}
                            aria-label={isLoading ? 'Signing in' : 'Sign in'}
                        >
                            {isLoading ? <ImSpinner6 className="size-6 animate-spin" /> : 'Sign In'}
                        </Button>
                    </form>
                </Form>
                <div className="mt-3 text-center">
                    Don't have an account?
                    <Link
                        to="/register"
                        className="ml-1 text-[#2D3DD2]"
                        aria-label="Sign up for a new account"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}

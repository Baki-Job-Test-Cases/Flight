import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
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
import { signUpSchema } from '@/schemas';
import { useSignUpMutation } from '@/store';
import LoadingSpinner from '../LoadingSpinner';
import type { SignUpForm } from '@/types';

export default function SignUp() {
    const navigate = useNavigate();
    const form = useForm<SignUpForm>({
        mode: 'all',
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });
    const [signUp, { data: result, isLoading, error }] = useSignUpMutation();
    const onSubmit: SubmitHandler<SignUpForm> = (data) => signUp(data);

    //Bug fix for not comparing with confirm password when password changed
    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        formChange: (...event: any[]) => void,
    ) => {
        const {
            formState: {
                dirtyFields: { confirmPassword: isConfirmPasswordDirty },
                errors: { confirmPassword: confirmPasswordError },
            },
            setError,
            clearErrors,
        } = form;

        if (
            isConfirmPasswordDirty &&
            (!confirmPasswordError || confirmPasswordError?.type === 'custom')
        ) {
            if (event.target.value !== form.getValues('confirmPassword')) {
                setError('confirmPassword', {
                    type: 'custom',
                    message: "Passwords don't match",
                });
            } else {
                clearErrors('confirmPassword');
            }
        }

        formChange(event.target.value);
    };

    useEffect(() => {
        //Show notification about sign up result
        if (error) {
            toast('Something went wrong..!', { type: 'error' });
        } else if (result) {
            toast(result.signUp ? 'Successfully Signed Up' : result.error, {
                type: result.signUp ? 'success' : 'error',
            });

            //if sign up success redirect main page
            if (result.signUp) {
                navigate('/', { replace: true });
            }
        }

        //if sign up failure reset password inputs
        if (error || (result && !result.signUp)) {
            form.resetField('password');
            form.resetField('confirmPassword');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result, error]);

    return (
        <div className="flex h-full justify-center">
            <div className="flex-1 bg-register bg-cover bg-[50%_10%] max-md:hidden"></div>
            <div className="my-auto flex w-1/2 max-w-[35rem] flex-col items-center px-14 py-2 max-md:w-full max-md:max-w-full max-md:px-[10%]">
                <h1 id="signUpForm" className="mb-6 text-3xl">
                    Sign Up to continue
                </h1>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        aria-labelledby="signUpForm"
                        className="w-full"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} />
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
                                        <Input
                                            type="password"
                                            {...field}
                                            onChange={(e) =>
                                                handlePasswordChange(e, field.onChange)
                                            }
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="surname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Surname</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="mt-4 h-12 w-full rounded-md border-black bg-purple text-xs uppercase tracking-widest"
                            disabled={isLoading || !form.formState.isValid}
                            aria-label={isLoading ? 'Signing up' : 'Sign Up'}
                        >
                            {isLoading ? (
                                <LoadingSpinner className="size-6 animate-spin" />
                            ) : (
                                'Sign Up'
                            )}
                        </Button>
                    </form>
                </Form>
                <div className="mt-3 text-center">
                    Do you have an account?
                    <Link to="/login" className="ml-1 text-[#2D3DD2]">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}

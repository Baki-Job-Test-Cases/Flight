import * as z from 'zod';

export const signUpSchema = z
    .object({
        name: z.string().min(1, 'Name required').max(30, 'Max character Count is 30..!'),
        surname: z.string().min(1, 'Surname required').max(30, 'Max character Count is 30..!'),
        email: z.string().email('Enter valid email'),
        password: z.string().min(8, 'Password must contain at least 8 character(s)'),
        confirmPassword: z.string().min(8, 'Confirm Password must contain at least 8 character(s)'),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

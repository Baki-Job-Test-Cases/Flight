import * as z from 'zod';
import { signInSchema, signUpSchema } from '../schemas';

export type SignUpForm = z.infer<typeof signUpSchema>;
export type SignInForm = z.infer<typeof signInSchema>;

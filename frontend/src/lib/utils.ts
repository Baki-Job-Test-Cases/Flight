import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const stringifyObjectValues = (
    payload: Record<string, any>,
): Record<string, string> =>
    Object.entries(payload).reduce(
        (acc, [key, value]) => {
            acc[key] = value.toString();

            return acc;
        },
        {} as Record<string, string>,
    );

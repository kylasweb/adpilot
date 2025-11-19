/**
 * Server-side Only Utilities
 * 
 * This file contains utility functions that ensure operations are only performed on the server-side.
 */

/**
 * Checks if the code is running on the server-side
 * @returns boolean indicating if running on server
 */
export function isServer(): boolean {
    return typeof window === 'undefined';
}

/**
 * Checks if the code is running on the client-side
 * @returns boolean indicating if running on client
 */
export function isClient(): boolean {
    return typeof window !== 'undefined';
}

/**
 * Ensures that a function is only called on the server-side
 * @param fn The function to execute
 * @param errorMessage Custom error message
 * @returns The result of the function
 */
export function serverOnly<T>(fn: () => T, errorMessage?: string): T {
    if (isClient()) {
        throw new Error(errorMessage || 'This function can only be called on the server-side');
    }

    return fn();
}

/**
 * Ensures that a function is only called on the client-side
 * @param fn The function to execute
 * @param errorMessage Custom error message
 * @returns The result of the function or undefined if on server
 */
export function clientOnly<T>(fn: () => T, errorMessage?: string): T | undefined {
    if (isServer()) {
        console.warn(errorMessage || 'This function can only be called on the client-side');
        return undefined;
    }

    return fn();
}
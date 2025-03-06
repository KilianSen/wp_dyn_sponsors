// DeepRequired is a recursive version of Required<T>
export type DeepRequired<T> = { [K in keyof T]: Required<DeepRequired<T[K]>> }

/**
 * Fulfills the requirement of a given object with primitive values
 * @param input The object to fulfill
 * @returns The fulfilled object
 **/
export function fulfillRequirementWithPrimitive<T>(input: T): DeepRequired<T> {
    if (input === null || input === undefined) {
        return {} as DeepRequired<T>;
    }

    // Handle primitive types
    if (typeof input !== 'object') {
        return input as DeepRequired<T>;
    }

    // Handle arrays
    if (Array.isArray(input)) {
        return input.map(item => fulfillRequirementWithPrimitive(item)) as DeepRequired<T>;
    }

    // Handle objects
    const result: Record<string, any> = {};

    for (const key in input) {
        const value = input[key];

        if (value === undefined) {
            // Determine appropriate default based on expected type
            if (key.toLowerCase().includes('url') || key.toLowerCase().includes('href')) {
                result[key] = '';
            } else if (key.toLowerCase().includes('img')) {
                result[key] = '';
            } else if (key.toLowerCase().includes('color')) {
                result[key] = '#000000';
            } else if (typeof value === 'boolean') {
                result[key] = false;
            } else if (typeof value === 'number') {
                result[key] = 0;
            } else if (Array.isArray(value)) {
                result[key] = [];
            } else if (typeof value === 'object') {
                result[key] = {};
            } else if (typeof value === 'string') {
                result[key] = '';
            } else {
                throw new Error(`Could not resolve default for ${key}`);
            }
        } else {
            result[key] = fulfillRequirementWithPrimitive(value);
        }
    }
    return result as DeepRequired<T>;
}
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

/**
 * Lightens or darkens a hex color by a given amount.
 * @param col color in hex with or without #
 * @param amt percentage (-100,100)
 */
export function lightenDarkenHex(col: string, amt: number) {
    let usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
    
    const num = parseInt(col, 16);
    
    let r = (num >> 16) + amt;
    r = Math.min(255, Math.max(0, r));
    
    let b = (Number(num >> 8) /*!//>*/ & Number(0x00FF)) + amt;
    b = Math.min(255, Math.max(0, b));
    
    let g = (Number(num) & Number(0x0000FF)) + amt;
    g = Math.min(255, Math.max(0, g));
    
    const result = (Number(g) | Number(b << 8/*!//>*/ ) | Number(r << 16/*!//>*/ )).toString(16).padStart(6, '0');
    return (usePound ? "#" : "") + result;
}
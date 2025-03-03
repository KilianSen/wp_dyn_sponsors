import {DeepRequired} from "./utils";

/**
 * This represents the structure of the input json config.
 */
export type InputSponsorConfig = {
    teams?: {
        [key: string]: {
            href?: string,
            img?: string
        }
    },
    levels?: {
        [key: string]: { color?: string }
    },
    sponsors?: {
        [key: string]: {
            img?: string,
            href?: string,
            affiliatedWith?: (keyof InputSponsorConfig["teams"])[]
            level?: string,
            description?: string
        }
    },
    features?: {
        coloredHeadings?: boolean,
        randomizeOrder?: boolean,
        badge?: boolean
    }
}

/**
 * This represents the structure of the parsed json config.
 */
export type StructuredSponsorData = {
    structure: {
        [key in keyof InputSponsorConfig["levels"]]: { // level
            [key in keyof InputSponsorConfig["sponsors"]]: // sponsor
                Required<Omit<InputSponsorConfig["sponsors"][keyof InputSponsorConfig["sponsors"]], "level">>
        }
    },
    features: Required<InputSponsorConfig["features"]>,
} & DeepRequired<Omit<InputSponsorConfig, "sponsors" | "features">>;
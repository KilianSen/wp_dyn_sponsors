import {DeepRequired} from "./utils";
import {InputSponsorConfig, StructuredSponsorData} from "./types";
import {DefaultFeatures} from "./default";

/**
 * Parses the sponsor config to ensure all required fields are present
 *
 * @returns {StructuredSponsorData} The parsed sponsor config
 * @param {InputSponsorConfig} data The sponsor config to parse
 * @throws {Error} If any required fields cannot be resolved by primitive values
 **/
export function parseRequired(data: InputSponsorConfig): DeepRequired<InputSponsorConfig> {
    return data as DeepRequired<InputSponsorConfig>;
}

/**
 * Parses the sponsor config into a nested structure
 *
 * @returns {StructuredSponsorData} The parsed sponsor config
 * @param {DeepRequired<InputSponsorConfig>} data The sponsor config with all fields present
 **/
export function parseStructure(data: DeepRequired<InputSponsorConfig>): StructuredSponsorData {
    const {teams, levels, sponsors, features} = data;
    const structuredData: StructuredSponsorData = {
        structure: {},
        teams: teams,
        levels: levels,
        features: DefaultFeatures,
    }

    for (const level in levels) {
        structuredData.structure[level] = {};
    }

    for (const sponsor in sponsors) {
        const {img, href, affiliatedWith, level, description, ...rest} = sponsors[sponsor];
        structuredData.structure[level][sponsor] = {
            img, href, affiliatedWith, description: description, ...rest
        };
    }

    // Filter out levels with no sponsors
    for (const level in structuredData.structure) {
        if (Object.keys(structuredData.structure[level]).length === 0) {
            delete structuredData.structure[level];
        }
    }

    // Apply default features
    for (const feature in DefaultFeatures) {
        if (feature && features && features[feature] !== undefined) {
            structuredData.features[feature] = features[feature];
        }
    }
    return structuredData;
}

/**
 * Parses the sponsor config to ensure all required fields are present and returns a nested structure
 * @param {InputSponsorConfig} data The sponsor config to parse
 * @returns {StructuredSponsorData} The parsed sponsor config
 */
export function parseConfig(data: InputSponsorConfig): StructuredSponsorData {
    return parseStructure(parseRequired(data))
}

type DeepRequired<T> = { [K in keyof T]: Required<DeepRequired<T[K]>> }
type InputSponsorConfig = {
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
type StructuredSponsorData = {
	structure: {
		[key: keyof InputSponsorConfig["levels"]]: { // level
			[key: keyof InputSponsorConfig["sponsors"]]: // sponsor
				Required<Omit<InputSponsorConfig["sponsors"][keyof InputSponsorConfig["sponsors"]], "level">>
		}
	},
	features: Required<InputSponsorConfig["features"]>,
} & DeepRequired<Omit<InputSponsorConfig, "sponsors" | "features">>;






function fulfillRequirementWithPrimitive<T>(input: T): DeepRequired<T> {
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
			} else {
				result[key] = '';
			}
		} else {
			result[key] = fulfillRequirementWithPrimitive(value);
		}
	}

	return result as DeepRequired<T>;
}



/**
 * Default values for features (recommended)
 * **/
const DefaultFeatures: Required<InputSponsorConfig["features"]> = {
	coloredHeadings: true,
	randomizeOrder: true,
	badge: true
}

/**
 * Parses the sponsor config to ensure all required fields are present
 *
 * @returns {StructuredSponsorData} The parsed sponsor config
 * @param {InputSponsorConfig} data The sponsor config to parse
 * @throws {Error} If any required fields cannot be resolved by primitive values
 **/
function parseRequired(data: InputSponsorConfig): DeepRequired<InputSponsorConfig> {
	return fulfillRequirementWithPrimitive(data);
}

/**
 * Parses the sponsor config into a nested structure
 *
 * @returns {StructuredSponsorData} The parsed sponsor config
 * @param {DeepRequired<InputSponsorConfig>} data The sponsor config with all fields present
 **/
function parseStructure(data: DeepRequired<InputSponsorConfig>): StructuredSponsorData {
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
		const {img, href, affiliatedWith, level, description} = sponsors[sponsor];
		structuredData.structure[level][sponsor] = {
			img, href, affiliatedWith, description: description,
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
		if (features[feature] !== undefined) {
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
function parseConfig(data: InputSponsorConfig): StructuredSponsorData {
	return parseStructure(parseRequired(data))
}

type InputSponsorConfig = {
	teams: {
		[key: string]: {
			href: string,
			img: string
		}
	},
	levels: {
		[key: string]: { color: string }
	},
	sponsors: {
		[key: string]: {
			img: string,
			href: string,
			affiliatedWith: string[],
			level: string,
			description?: string
		}
	},
	features: {
		coloredHeadings?: boolean,
		randomizeOrder?: boolean,
		badge?: boolean
	}
}

type StructuredSponsorData = {
	data: {
		[key: string]: { // level
			[key: string]: { // sponsor
				img: string,
				href: string,
				affiliatedWith: InputSponsorConfig["teams"], // team
				description: string
			}
		}
	}
	levels: {
		[key: string]: { color: string }
	},
	teams: {
		[key: string]: { href: string, img: string }
	},
	features: {
		coloredHeadings?: boolean,
		randomizeOrder?: boolean,
		badge?: boolean
	}
}

function parseSponsorConfig(data: InputSponsorConfig): StructuredSponsorData {
	const {teams, levels, sponsors, features} = data;
	const structuredData: StructuredSponsorData = {
		data: {},
		levels,
		teams,
		features: features || {}
	};
	
	for (const level in levels) {
		structuredData.data[level] = {};
	}
	
	for (const sponsor in sponsors) {
		const {img, href, affiliatedWith, level, description} = sponsors[sponsor];
		structuredData.data[level][sponsor] = {
			img, href, affiliatedWith: {
				...affiliatedWith.reduce((acc: InputSponsorConfig["teams"], team) => {
					acc[team] = teams[team];
					return acc;
				}, {})
			}, description: description || "",
		};
	}
	
	// Filter out levels with no sponsors
	for (const level in structuredData.data) {
		if (Object.keys(structuredData.data[level]).length === 0) {
			delete structuredData.data[level];
		}
	}
	
	const defaultFeatures: InputSponsorConfig["features"] = {
		coloredHeadings: true,
		randomizeOrder: true,
		badge: true
	}
	
	// Default enable all features
	for (const feature in defaultFeatures) {
		if (structuredData.features[feature] === undefined) {
			structuredData.features[feature] = defaultFeatures[feature];
		}
	}
	
	return structuredData;
}
type InputSponsorData = {
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
            level: string
        }
    }
}

type StructureSportData = {
    [key: string]: { // level
        [key: string]: { // sponsor
            img: string,
            href: string,
            affiliatedWith: InputSponsorData["teams"], // team
        }
    }
}

function parseSponsorData(data: InputSponsorData): StructureSportData {
    const { teams, levels, sponsors } = data;
    const structuredData: StructureSportData = {};

    for (const level in levels) {
        structuredData[level] = {};
    }

    for (const sponsor in sponsors) {
        const { img, href, affiliatedWith, level } = sponsors[sponsor];
        structuredData[level][sponsor] = { img, href, affiliatedWith: {
                ...affiliatedWith.reduce((acc: InputSponsorData["teams"], team) => {
                    acc[team] = teams[team];
                    return acc;
                }, {})
            }};
    }

    // Filter out levels with no sponsors
    for (const level in structuredData) {
        if (Object.keys(structuredData[level]).length === 0) {
            delete structuredData[level];
        }
    }

    return structuredData;
}
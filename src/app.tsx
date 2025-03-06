import {parseConfig} from "./parse";
import {InputSponsorConfig} from "./types";
import {Card} from "./detailCard.tsx";

export function App() {
	
	const structuredSponsorData = parseConfig(
		JSON.parse(globalThis.config) as InputSponsorConfig
	);
	
	return (
		<>
			{
				Object.keys(structuredSponsorData.structure).map(level =>
					<div className='level'>
						<h3 className='sponsor-heading' style={structuredSponsorData.features.enableColorHeadings ? {color: structuredSponsorData.levels[level].color} : undefined}>{level}</h3>
						<div className='level-sponsor-container'>
							{
								Object.keys(structuredSponsorData.structure[level]).toSorted(() => structuredSponsorData.features.enableRandomizedOrder ? Math.random() - 0.5 : 0).map(sponsor => {
									return Card({
										sponsor,
										level,
										ssd: structuredSponsorData,
									})
								})
							}
						</div>
					</div>
				)
			}
			{
				structuredSponsorData.features.enableRandomizedOrder ? <p>*To represent our sponsors fairly, we have randomized the order in which they are displayed.</p> : undefined
			}
		</>
	)
}
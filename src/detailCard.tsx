import Color from 'color';
import {StructuredSponsorData} from "./types.ts";

export type CardDef = {
	sponsor: string,
	level: string,
	ssd: StructuredSponsorData,
}

export function CardLogo(card: CardDef) {
	return <div className={'flex justify-center items-center p-1'}>
		<img src={card.ssd.structure[card.level][card.sponsor].img} alt={card.sponsor} className={"max-w-48 max-h-48"} />
	</div>
}

export function Card(card: CardDef) {
	return <div className="relative hover:*:flex">
		{CardLogo(card)}
		{DetailCard(card)}
	</div>
}

export function DetailCard(card: CardDef) {
	const features = card.ssd.features;
	if (!features.enableHover) return undefined;
	
	const ccL = Color(card.ssd.levels[card.level].color);
	
	const backgroundColor =
		features.deriveBackgroundColorFromLevel ?
			ccL.lighten(.25).hex():
			card.ssd.structure[card.level][card.sponsor].backgroundColor ||
			card.ssd.levels[card.level].color;
	
	return <div className={"absolute w-fit h-fit hidden hover:flex gap-4 border-b-9 border-b-gray-300 p-4 shadow-xl rounded-lg bg-white top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"} style={{borderColor:backgroundColor}}>
		<div className="flex flex-col justify-between grow no-wrap min-w-72 min-h-42">
			<div>
				<h3 className="sponsor-heading text-3xl text-neutral-700">{card.sponsor}</h3>
				<div className={"text-neutral-500 hover:text-neutral-700 underline"}>
					{(features.enableReferralUrl && card.ssd.structure[card.level][card.sponsor].href)?
						<a
						target="_blank"
						rel="noopener noreferrer"
						href={
							card.ssd.structure[card.level][card.sponsor].href
						}>Visit Sponsor</a>: undefined}
					{card.ssd.structure[card.level][card.sponsor].auxiliaryLink ?
						<a
							target="_blank"
							rel="noopener noreferrer"
							href={
								card.ssd.structure[card.level][card.sponsor].auxiliaryLink.href
							}>{card.ssd.structure[card.level][card.sponsor].auxiliaryLink.text}</a> : undefined}
				</div>
			</div>
			<p>
				{features.enableDescription ? card.ssd.structure[card.level][card.sponsor].description : undefined}
			</p>
			<div className={"flex flex-col gap-2"}>
				<p>Affiliated with</p>
				<div className={"flex gap-2"}>
					{card.ssd.structure[card.level][card.sponsor].affiliatedWith.map((e: number) => card.ssd.teams[e]).toSorted().map((team) => <a href={team.href}><img src={team.img} alt="" className={"max-h-8"}/></a>)}
				</div>
			</div>
		</div>
		<div className={"grow flex justify-center items-center overflow-hidden"}>
			<a href={(features.enableLogoRedirect && features.enableReferralUrl) ? card.ssd.structure[card.level][card.sponsor].href : undefined}>
				<img src={card.ssd.structure[card.level][card.sponsor].img} alt={card.sponsor} className={"max-w-48 max-h-48"} />
			</a>
		</div>
	</div>
}
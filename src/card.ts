import {DIV, IMG, H1, A} from "./components.ts";
import {lightenDarkenHex} from "./utils.ts";

export function passiveCard(cardImageUrl: string) {
	return DIV('sponsor-card', undefined, [IMG(undefined, undefined, undefined, cardImageUrl)]);
}

export function hoverCard(cardImageUrl: string, cardTitle: string, badge: string | undefined, badgeColor: string, referralUrl: string | undefined, affiliatedUrls: string[], description: string | undefined) {
	return DIV(['sponsor-card', "absolute"], undefined, [
		IMG(undefined, undefined, undefined, cardImageUrl),
		DIV('sponsor-content', undefined, [
			H1(undefined, {marginBlock: "5px"}, cardTitle),
			DIV('tier-container', undefined, [
				badge?DIV('tier-label', { color: badgeColor, backgroundColor: lightenDarkenHex(badgeColor, -25) }, badge): undefined,
				referralUrl ? A(undefined, undefined, 'Visit Sponsor', referralUrl): undefined
			]),
			description?DIV(undefined, undefined, description): undefined,
			DIV(undefined, {display:"flex", gap: "2em"}, [
				...affiliatedUrls.map(url => IMG(undefined, undefined, undefined, url))
			])
		])
	]);
}

export function sponsorCard(cardImageUrl: string, cardTitle: string, badge: string, badgeColor: string, referralUrl: string | undefined, affiliatedUrls: string[], description: string | undefined) {
	return DIV('relative', undefined, [
		passiveCard(cardImageUrl),
		hoverCard(cardImageUrl, cardTitle, badge, badgeColor, referralUrl, affiliatedUrls, description)
	]);
}
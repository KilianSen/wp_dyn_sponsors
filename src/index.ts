import {parseConfig} from "./parse";
import {InputSponsorConfig} from "./types";
import {DIV, H3, P} from "./components.ts";
import {sponsorCard} from "./card.ts";
// @ts-ignore
import "./style.css"

async function main() {
    const structuredSponsorData = parseConfig(
        JSON.parse(document.getElementsByTagName("code")![0].innerText) as InputSponsorConfig
    );

    for (const level in structuredSponsorData.structure) {
        const levelContainer = DIV('level', undefined, [
            H3('sponsor-heading', structuredSponsorData.features.coloredHeadings? {color: structuredSponsorData.levels[level].color}: undefined, level),
            DIV('level-sponsor-container', undefined, [
                ...Object.keys(structuredSponsorData.structure[level]).toSorted(() => structuredSponsorData.features.randomizeOrder ? Math.random() - 0.5 : 0).map(sponsor => {
                    const {img, href, affiliatedWith, description} = structuredSponsorData.structure[level][sponsor];
                    return sponsorCard(
                        img,
                        sponsor,
                        structuredSponsorData.features.badge? level: undefined,
                        structuredSponsorData.levels[level].color,
                        href,
                        Object.keys(affiliatedWith).map(e => structuredSponsorData.teams[e].img).toSorted(),
                        description
                    );
                }),
            ]),
        ]);


        document.getElementById('container')!.appendChild(levelContainer);
    }
    if (structuredSponsorData.features.randomizeOrder) {
        document.getElementById('container')!.appendChild(P(undefined, undefined, "*To represent our sponsors fairly, we have randomized the order in which they are displayed."));
    }
}
document.body.innerHTML = document.body.innerHTML.replace("&amp;", "&").replace("&#038;", "&");

setTimeout(main, 1000);


const rawData = document.getElementsByTagName("code")![0].innerText;
const parsedJson = JSON.parse(rawData) as InputSponsorData;
const structuredData = parseSponsorData(parsedJson);

for (const level in structuredData) {
    const levelContainer = document.createElement('div');
    levelContainer.classList.add('level');
    levelContainer.innerHTML = `<h3 class="sponsor-heading" style="color: ${parsedJson.levels[level].color}">${level}</h3>`;
    const levelSponsorContainer = document.createElement('div');
    levelSponsorContainer.classList.add('level-sponsor-container');
    levelContainer.appendChild(levelSponsorContainer);
    for (const sponsor of Object.keys(structuredData[level]).toSorted(() => Math.random() - 0.5)) {
        const { img, href, affiliatedWith } = structuredData[level][sponsor];
        levelSponsorContainer.appendChild(
            createSponsorCard(img, sponsor, level, parsedJson.levels[level].color, href, Object.keys(affiliatedWith).map(e => parsedJson.teams[e].img).toSorted())
        );
    }

    document.getElementById('container')!.appendChild(levelContainer);
}
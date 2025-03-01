async function init() {
	// @ts-ignore
	const sponsorData = JSON.parse(document.getElementsByTagName("code")![0].innerText) as InputSponsorData;
	const structuredSponsorData = parseSponsorData(sponsorData);
	
	for (const level in structuredSponsorData) {
		const levelContainer = document.createElement('div');
		levelContainer.classList.add('level');
		
		const heading = document.createElement('h3');
		heading.classList.add('sponsor-heading');
		heading.style.color = sponsorData.levels[level].color;
		heading.textContent = level;
		levelContainer.appendChild(heading);
		
		const levelSponsorContainer = document.createElement('div');
		levelSponsorContainer.classList.add('level-sponsor-container');
		levelContainer.appendChild(levelSponsorContainer);
		
		for (const sponsor of Object.keys(structuredSponsorData[level]).toSorted(() => Math.random() - 0.5)) {
			const {img, href, affiliatedWith} = structuredSponsorData[level][sponsor];
			levelSponsorContainer.appendChild(
				createSponsorCard(
					img,
					sponsor,
					level,
					sponsorData.levels[level].color,
					href,
					Object.keys(affiliatedWith).map(e => sponsorData.teams[e].img).toSorted()
				)
			);
		}
		
		document.getElementById('container')!.appendChild(levelContainer);
	}
}


init().then()
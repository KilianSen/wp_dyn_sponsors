function smallCard(logoURL: string) {
	const container = document.createElement('div');
	container.classList.add('sponsor-card');
	
	const img = document.createElement('img');
	img.src = logoURL;
	container.appendChild(img);
	
	return container;
}

function bigCard(logoURL: string, TITLE: string, tier: string, levelColor: string, URL: string, teamUrls: string[]) {
	const container = document.createElement('div');
	container.classList.add('sponsor-card');
	container.classList.add('absolute');
	
	const img = document.createElement('img');
	img.src = logoURL;
	container.appendChild(img);
	
	const content = document.createElement('div');
	content.classList.add("sponsor-content")
	
	const title = document.createElement('h1');
	title.textContent = TITLE;
	content.appendChild(title);
	
	const tierContainer = document.createElement('div');
	tierContainer.classList.add('tier-container');
	
	const tierDiv = document.createElement('div');
	tierDiv.textContent = tier;
	tierDiv.classList.add('tier-label')
	tierDiv.style.backgroundColor = LightenDarkenColor(levelColor, -25)
	tierDiv.style.color = levelColor;
	tierContainer.appendChild(tierDiv);
	
	const link = document.createElement('a');
	link.href = URL;
	link.textContent = 'Visit Sponsor';
	tierContainer.appendChild(link);
	
	content.appendChild(tierContainer);
	
	const teamContainer = document.createElement('div');
	
	for (const url in teamUrls) {
		const img = document.createElement('img');
		img.src = url;
		teamContainer.appendChild(img);
		
	}
	
	content.appendChild(teamContainer);
	container.appendChild(content);
	return container;
}

function sc(logoURL: string, TITLE: string, tier: string, levelColor: string, URL: string, teamUrls: string[]) {
	const cardDiv = document.createElement('div');
	cardDiv.classList.add('relative');
	
	cardDiv.appendChild(smallCard(logoURL));
	cardDiv.appendChild(bigCard(logoURL, TITLE, tier, levelColor, URL, teamUrls));
	
	return cardDiv;
}
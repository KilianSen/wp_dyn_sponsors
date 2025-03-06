import {createRoot} from "react-dom/client";
import {App} from "./app.tsx";

declare let config: string

const DEV_MODE = document.getElementsByClassName("html").length === 0;

async function init() {
	if (DEV_MODE)
		config = await (await fetch("../warr.json")).text();
	else
		config = document.getElementsByTagName("code")[0].innerText;
	
	const root = createRoot(document.getElementById('container'));
	root.render(<App/>);
}
init().then()
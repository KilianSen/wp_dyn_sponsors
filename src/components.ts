/*
	This file contains a minimalistic set of functions to create HTML elements in a more intuitive way, similar to jsx.
 */

type BaseComponentType = {
	className?: string | string[],
	style?: Partial<CSSStyleDeclaration>,
	children?: HTMLElement | (HTMLElement | undefined)[] | string,
}

function BaseComponent({ tag, className, style, children }: BaseComponentType & { tag: string }): HTMLElement {
	const element = document.createElement(tag);
	if (className) {
		if (Array.isArray(className)) {
			className.forEach(c => element.classList.add(c));
		} else {
			element.classList.add(className);
		}
	}
	if (style) {
		Object.assign(element.style, style);
	}
	if (children) {
		if (Array.isArray(children)) {
			children.filter(child => child !== undefined)
				.forEach(child => element.appendChild(child));
		} else if (typeof children === 'string') {
			element.textContent = children;
		} else {
			element.appendChild(children);
		}
	}
	return element;
}

function createComponent<t extends HTMLElement>(tag: string): (className?: (string | string[]), style?: Partial<CSSStyleDeclaration>, children?: (HTMLElement | (HTMLElement | undefined)[] | string), extra?: Partial<t>) => t {
	return (className?: string | string[], style?: Partial<CSSStyleDeclaration>, children?: HTMLElement | (HTMLElement | undefined)[] | string, extra?: Partial<t>) => {
		const element = BaseComponent({tag, className, style, children});
		if (extra) Object.assign(element, extra);
		return element as t;
	};
}


export const DIV = createComponent('div');
export const SPAN = createComponent('span');
export const H1 = createComponent('h1');
export const H2 = createComponent('h2');
export const H3 = createComponent('h3');
export const IMG = (className?: string | string[], style?: Partial<CSSStyleDeclaration>, children?: HTMLElement | HTMLElement[] | string, src?: string) => createComponent<HTMLImageElement>('img')(className, style, children, { src });
export const P = createComponent('p');
export const A = (className?: string | string[], style?: Partial<CSSStyleDeclaration>, children?: HTMLElement | HTMLElement[] | string, href?: string) => createComponent<HTMLAnchorElement>('a')(className, style, children, { href });
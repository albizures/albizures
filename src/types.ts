export interface Page {
	url: string;
	label: string;
	fullLabel?: string;
	showInHome: boolean;
	asTopLink: boolean;
	external: boolean;
}

export interface Post {
	slug: string;
	title: string;
	date: string;
	author: string;
	content: string;
	tags: string[];
	cover?: string;
	ogImage?: {
		url: string;
	};
}

export type MissingPostItems = (keyof Post)[];

export interface IncompletePost {
	missingItems: MissingPostItems;
	items: Post;
}

export interface Config {
	site: {
		name: string;
	};
	pages: Page[];
}

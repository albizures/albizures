export interface Page {
	url: string;
	label: string;
	fullLabel?: string;
	showInHome: boolean;
	asTopLink: boolean;
	external: boolean;
}

export interface PostData {
	slug: string;
	url: string;
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

export type MissingPostItems = (keyof PostData)[];

export interface IncompletePost {
	missingItems: MissingPostItems;
	items: PostData;
}

export interface Config {
	twitter: string;
	site: {
		title: string;
		description: string;
		baseUrl: string;
		keywords: string[];
	};
	pages: Page[];
}

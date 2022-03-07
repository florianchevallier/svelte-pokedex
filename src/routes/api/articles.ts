// Require the package
import googleNewsScraper from 'google-news-scraper';
import type { IArticle } from 'src/types/types'


export async function get() {

	// Execute within an async function, pass a config object (further documentation below)
	const articles: IArticle[] = await googleNewsScraper({
		searchTerm: "Pokémon",
		prettyURLs: false,
		queryVars: {
			hl: "fr-FR",
			gl: "Fr",
			ceid: "US:en"
		},
		timeframe: "7d",
		puppeteerArgs: []
	});

	if (articles) {
		const finalArticles = articles.map(a => ({ ...a, time: a.time.split('ago')[0] }));
		return {
			body: finalArticles
		};
	}

	return {
		status: 404
	};
};
import {createClient, Locale} from 'contentful';
import dotenv from 'dotenv';
import {IPage} from '../types/generated/contentful';

dotenv.config();

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID as string,
	accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN as string,
	environment: process.env.CONTENTFUL_ENVIRONMENT as string,
	resolveLinks: true,
	removeUnresolved: true,
});

type GetPageParams = {
	slug: string;
	include?: number;
	locale?: Locale;
	preview?: boolean;
};

const getPageQuery = (params: GetPageParams) => ({
	limit: 1,
	// Includes option, Recursively collects references of an entry and their descendants, up to 10 levels deep, and returns them.
	include: params.include || 10,
	locale: params.locale,
	'fields.slug': params.slug,
});

export async function getPage(params: GetPageParams) {
	const query = getPageQuery(params);
	const {items} = await client.getEntries({
		...query,
		content_type: 'page',
	});
	const page = items[0];
	return page;
}

export async function getPages() {
	const query = {
		include: 10,
		content_type: 'page',
	};
	const {items} = await client.getEntries(query);
	return items as IPage[];
}

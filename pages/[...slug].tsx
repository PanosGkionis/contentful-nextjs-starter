import {Entry} from 'contentful';
import {GetStaticPropsContext} from 'next';
import Head from 'next/head';
import React from 'react';
import ContentSection from '../components/ContentSection';
import {getPage, getPages} from '../lib/api';

import {IPage} from '../types/generated/contentful';

export default function Slug(props: {page: IPage}) {
	const {page} = props;

	return (
		<>
			<Head>
				<title>{page.fields.title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div>
				<h1 className='w-fit mx-auto text-center text-2xl font-bold p-4 border-4 border-yellow-500'>{page.fields.internalName}</h1>

				<div className='flex flex-col justify-center items-center overflow-hidden'>
					{page.fields.sections?.map(
						(section: Entry<any>, i: number) => (
							<ContentSection key={i} section={section} />
						)
					)}
				</div>
			</div>
		</>
	);
}

// Get all the page slugs
export async function getStaticPaths() {
	const pages = await getPages();
	const paths = pages.map(p => p.fields.slug);
	const stdPaths = paths.map(p => (/^\//.test(p) ? p : `/${p}`));
	return {paths: stdPaths?.filter((p: string) => p !== '/'), fallback: false};
}

// Pass the props for each of the pages
export async function getStaticProps(context: GetStaticPropsContext) {
	const {params, preview} = context;
	if (!params || !params.slug) {
		console.error(
			'getStaticProps error, (params && params.slug) is false',
			context
		);
		return {props: {}};
	}
	const pageSlug = params.slug as string[];
	const pagePath = `/${pageSlug.join('/')}`;
	const pageData = await getPage({slug: pagePath, preview: Boolean(preview)});
	return {props: {page: pageData}};
}

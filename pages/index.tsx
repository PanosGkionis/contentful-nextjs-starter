import {Entry} from 'contentful';
import {GetStaticPropsContext} from 'next';
import Head from 'next/head';
import ContentSection from '../components/ContentSection';
import {getPage} from '../lib/api';
import {IPage} from '../types/generated/contentful';

export default function Home(props: {page: IPage}) {
	const {page} = props;
	console.log(page)
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

export async function getStaticProps(context: GetStaticPropsContext) {
	const {preview} = context;
	const page = await getPage({slug: '/', preview: Boolean(preview)});

	return {props: {page}};
}

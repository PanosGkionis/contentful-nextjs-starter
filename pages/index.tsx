import {Entry} from 'contentful';
import {GetStaticPropsContext} from 'next';
import Head from 'next/head';
import ContentSection from '../components/ContentSection';
import {getPage} from '../lib/api';
import {IPage} from '../types/generated/contentful';
import styles from '../styles/Home.module.css';

export default function Home(props: any) {
	const {page} = props;

	return (
		<>
			<Head>
				<title>Contentful tech session</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className={styles.main}>
				<h1 className={styles.heading}>Home Page</h1>

				<div className={styles.content}>
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

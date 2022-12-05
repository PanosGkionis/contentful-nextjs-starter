import {ISectionCtaFields} from '../../../types/generated/contentful';
import styles from '../../../styles/Hero.module.css';

/* eslint-disable @next/next/no-img-element */
export function Hero(props: ISectionCtaFields) {
	const {title, subtitle, media} = props;
	return (
		<div className={styles.hero}>
			<div>
				<h1>Hero Component</h1>
				<h2>{title}</h2>
				<h3>{subtitle}</h3>
			</div>
			<img
				style={{width: '500px'}}
				src={`https:${media?.fields.file.url}`}
				alt={media?.fields.title}
			/>
		</div>
	);
}

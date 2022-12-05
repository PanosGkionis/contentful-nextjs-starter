import {ISectionCtaFields} from '../../../types/generated/contentful';
import styles from '../../../styles/Headline.module.css';

export function Headline(props: ISectionCtaFields) {
	const {title, subtitle, media} = props;
	return (
		<div
			className={styles.headline}
			style={{backgroundImage: `url(https:${media?.fields.file.url})`}}
		>
			<div className={styles.overlay}>
				<h1>Headline component</h1>
				<h2>{title}</h2>
				<h3>{subtitle}</h3>
			</div>
		</div>
	);
}

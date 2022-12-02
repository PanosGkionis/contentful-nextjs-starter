import {ISectionCtaFields} from '../../../types/generated/contentful';

/* eslint-disable @next/next/no-img-element */
export function Hero(props: ISectionCtaFields) {
	const {title, subtitle, media} = props;
	return (
		<>
			<h1>Hero Component</h1>
			<h2>{title}</h2>
			<h3>{subtitle}</h3>
			<img
				style={{width: '500px'}}
				src={`https:${media?.fields.file.url}`}
				alt={media?.fields.title}
			/>
		</>
	);
}

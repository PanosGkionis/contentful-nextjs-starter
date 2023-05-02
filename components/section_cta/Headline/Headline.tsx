import {ISectionCtaFields} from '../../../types/generated/contentful';

export function Headline(props: ISectionCtaFields) {
	const {title, subtitle, media} = props;
	return (
		<div
			className='w-screen h-96 bg-center bg-cover bg-no-repeat border-4 border-yellow-500'
			style={{backgroundImage: `url(https:${media?.fields.file.url})`}}
		>
			<div
				className='w-full h-full flex flex-col items-center justify-center text-white space-y-4'
				style={{backgroundColor: 'rgba(0, 0, 0, 0.336)'}}
			>
				<h1 className='text-4xl'>Headline component</h1>
				<h2 className='text-2xl  border-4 border-yellow-500'>{title}</h2>
				<h3 className='text-xl  border-4 border-yellow-500'>{subtitle}</h3>
			</div>
		</div>
	);
}

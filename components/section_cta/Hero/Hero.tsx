import {ISectionCtaFields} from '../../../types/generated/contentful';

/* eslint-disable @next/next/no-img-element */
export function Hero(props: ISectionCtaFields) {
	const {title, subtitle, media} = props;
	return (
		<div className='w-screen max-w-5xl p-14 flex flex-col md:flex-row items-center gap-10 bg-slate-100'>
			<div className='flex-1 space-y-4'>
				<h1 className='text-4xl'>Hero Component</h1>
				<h2 className='text-2xl border-4 border-yellow-500'>{title}</h2>
				<h3 className='text-xl border-4 border-yellow-500'>{subtitle}</h3>
			</div>
			<div className='flex-1'>
				<img
					className='rounded-lg border-4 border-yellow-500'
					style={{width: '500px'}}
					src={`https:${media?.fields.file.url}`}
					alt={media?.fields.title}
				/>
			</div>
		</div>
	);
}

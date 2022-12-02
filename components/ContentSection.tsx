import {Entry} from 'contentful';
import dynamic from 'next/dynamic';
import React from 'react';
import {ISection} from '../types/generated/contentful';

function useElementComponent(modelName: string, style?: string) {
	return React.useMemo<any>(() => {
		return (
			modelName !== 'section' &&
			dynamic(() => import(`./${modelName}${style ? `/${style}` : ''}`))
		);
	}, [modelName, style]);
}

// Component
export function ContentBlock(props: {block: Entry<any>}) {
	const {block} = props;

	// Content type id
	const modelName = block?.sys.contentType.sys.id ?? '';

	// Style name if exists
	const style = block?.fields?.style;

	// Dynamic import of component
	const ElementComponent = useElementComponent(modelName, style);

	if (ElementComponent)
		return <ElementComponent {...block.fields} key={block.sys.id} />;
	return null;
}

// Section
function ContentSection(props: {section: Entry<any>}) {
	const {section} = props;

	const id = section?.sys.id ?? '';

	// Content type id
	const modelName = section?.sys.contentType.sys.id ?? '';

	// Content type style if exists
	const style = section?.fields?.style;

	// Dynamic import of component
	const ElementComponent = useElementComponent(modelName, style);

	// Casting to section type
	const sectionData = section as ISection;

	// If it's a section wrap the comopnent into a section
	if (modelName === 'section') {
		return (
			<section id={sectionData.fields.anchor}>
				{sectionData.fields.content.map((child, index) => (
					<ContentBlock block={child} key={child?.sys?.id || index} />
				))}
			</section>
		);
	}

	if (!ElementComponent) return null;

	// If it's a component without a section, render the component
	return <ElementComponent {...section.fields} key={id} />;
}

export default ContentSection;

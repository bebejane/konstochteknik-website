'use client';

import s from './index.module.scss';
import cn from 'classnames';
import { Markdown } from 'next-dato-utils/components';
import ImageSlide from './ImageSlide';
import VideoSlide from './VideoSlide';
import { useShallow, useStore } from '@/lib/store';
import { useEffect } from 'react';

type Props = {
	project: AllProjectsQuery['allProjects'][0];
	single?: boolean;
	clean?: boolean;
};

export default function Slide({ project, single, clean }: Props) {
	const [currentProject] = useStore(useShallow((s) => [s.project, s.setProject]));
	const active = (currentProject?.id === project.id || single) && !clean ? true : false;

	return (
		<div key={project.id} style={{ backgroundColor: project?.background?.hex }} className={s.slide}>
			<>
				{project.slide[0].__typename === 'ImageSlideRecord' ? (
					<ImageSlide data={project.slide[0] as ImageSlideRecord} active={active} />
				) : project.slide[0].__typename === 'VideoSlideRecord' ? (
					<VideoSlide data={project.slide[0] as VideoSlideRecord} active={active} />
				) : null}
			</>
			{active && project.caption && (
				<h2
					key={`${currentProject?.id}-${active}`}
					className={cn(s[project.captionStyle], 'color-transition')}
					style={{ color: project?.color?.hex }}
					onClick={(e) => e.stopPropagation()}
				>
					<Markdown content={project.caption} />
				</h2>
			)}
		</div>
	);
}

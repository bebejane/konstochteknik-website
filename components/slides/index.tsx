'use client';

import s from './index.module.scss';
import cn from 'classnames';
import { Markdown } from 'next-dato-utils/components';
import ImageSlide from './ImageSlide';
import VideoSlide from './VideoSlide';
import { useShallow, useStore } from '@/lib/store';

type Props = {
	project: AllProjectsQuery['allProjects'][0];
	single?: boolean;
	clean?: boolean;
};

export default function Slide({ project, single, clean }: Props) {
	const [color, projectId, h2Override] = useStore(
		useShallow((s) => [s.color, s.projectId, s.h2Override]),
	);
	const active = (projectId === project.id || single) && !clean ? true : false;

	return (
		<div style={{ backgroundColor: color }} className={s.slide}>
			<>
				{project.slide[0].__typename === 'ImageSlideRecord' ? (
					<ImageSlide
						key={project.slide[0].id}
						data={project.slide[0] as ImageSlideRecord}
						active={active}
					/>
				) : project.slide[0].__typename === 'VideoSlideRecord' ? (
					<VideoSlide
						key={project.slide[0].id}
						data={project.slide[0] as VideoSlideRecord}
						active={active}
					/>
				) : null}
			</>

			{active && (project.caption || h2Override) && (
				<h2
					key={`${project.id}-${active}-${h2Override ?? 'caption'}`}
					className={cn(s[project.captionStyle], 'color-transition')}
					style={{ color }}
					onClick={(e) => e.stopPropagation()}
				>
					{h2Override ? h2Override : <Markdown content={project.caption!} />}
				</h2>
			)}
		</div>
	);
}

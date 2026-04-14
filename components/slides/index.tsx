'use client';

import s from './index.module.scss';
import cn from 'classnames';
import { Markdown } from 'next-dato-utils/components';
import ImageSlide from './ImageSlide';
import VideoSlide from './VideoSlide';
import { useShallow, useStore } from '@/lib/store';
import { useState } from 'react';

type Props = {
	project: AllProjectsQuery['allProjects'][number];
	single?: boolean;
	clean?: boolean;
};

export default function Slide({ project, single, clean }: Props) {
	const [color, projectId, h2Override] = useStore(
		useShallow((s) => [s.color, s.projectId, s.h2Override]),
	);
	const [loading, setLoading] = useState(true);
	const active = (projectId === project.id || single) && !clean ? true : false;
	const slide = project.slide[0];

	return (
		<div style={{ backgroundColor: color }} className={s.slide}>
			<>
				{slide.__typename === 'ImageSlideRecord' ? (
					<ImageSlide
						key={slide.id}
						data={slide as ImageSlideRecord}
						active={active}
						onLoad={() => setLoading(false)}
					/>
				) : slide.__typename === 'VideoSlideRecord' ? (
					<VideoSlide
						key={slide.id}
						data={slide as VideoSlideRecord}
						active={active}
						onLoad={() => setLoading(false)}
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

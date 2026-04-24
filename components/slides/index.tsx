'use client';

import s from './index.module.scss';
import cn from 'classnames';
import { Markdown } from 'next-dato-utils/components';
import ImageSlide from './ImageSlide';
import VideoSlide from './VideoSlide';
import { useShallow, useStore } from '@/lib/store';
import { useEffect, useRef, useState } from 'react';
import ExternalLink from '@/components/slides/ExternalLink';

type Props = {
	project: AllProjectsQuery['allProjects'][number];
	index: number;
	single?: boolean;
	clean?: boolean;
	onLoad?: () => void;
};

export default function Slide({ project, index, single, clean, onLoad }: Props) {
	const [activeProject, inIntro] = useStore(useShallow((s) => [s.project, s.inIntro]));
	const [loading, setLoading] = useState(true);
	const active = (project.id === activeProject?.id || single) && !clean ? true : false;
	const slide = project.slide[0];
	const backgroundColor = project.background?.hex ?? 'transparent';
	const color = project.color?.hex ?? 'var(--black)';

	useEffect(() => {
		!loading && onLoad?.();
	}, [loading]);

	return (
		<div style={{ backgroundColor }} className={s.slide}>
			<>
				{slide.__typename === 'ImageSlideRecord' ? (
					<ImageSlide
						key={slide.id}
						data={slide as ImageSlideRecord}
						active={active}
						index={index}
						onLoad={() => setLoading(false)}
					/>
				) : slide.__typename === 'VideoSlideRecord' ? (
					<VideoSlide
						key={slide.id}
						data={slide as VideoSlideRecord}
						active={active}
						index={index}
						onLoad={() => setLoading(false)}
					/>
				) : null}
			</>

			{active && project.caption && !inIntro && (
				<h2
					key={`${project.id}-${active}`}
					className={cn(s[project.captionStyle], 'color-transition')}
					style={{ color }}
					onClick={(e) => e.stopPropagation()}
				>
					<Markdown content={project.caption!} />
				</h2>
			)}
			<ExternalLink url={project.url} />
		</div>
	);
}

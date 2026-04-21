'use client';

import s from './index.module.scss';
import cn from 'classnames';
import { Markdown } from 'next-dato-utils/components';
import ImageSlide from './ImageSlide';
import VideoSlide from './VideoSlide';
import { useShallow, useStore } from '@/lib/store';
import { useEffect, useRef, useState } from 'react';

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
	const containerRef = useRef<HTMLDivElement | null>(null);
	const externalLinkRef = useRef<HTMLAnchorElement | null>(null);
	const externalLink = getExternalLink(project.caption);
	const active = (project.id === activeProject?.id || single) && !clean ? true : false;
	const slide = project.slide[0];
	const backgroundColor = project.background?.hex ?? 'transparent';
	const color = project.color?.hex ?? 'var(--black)';

	useEffect(() => {
		!loading && onLoad?.();
	}, [loading]);

	useEffect(() => {
		if (!externalLink || !externalLinkRef.current || !containerRef.current) return;

		const container = containerRef.current;
		const link = externalLinkRef.current;

		function handleMouseMove(e: MouseEvent) {
			const { clientX: x, clientY: y } = e;
			link.style.opacity = '1';
			link.style.top = `${y}px`;
			link.style.left = `${x}px`;
		}

		function handleMouseLeave() {
			link.style.opacity = '0';
		}

		container.addEventListener('mousemove', handleMouseMove);
		container.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			container.removeEventListener('mousemove', handleMouseMove);
			container.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, [externalLink]);

	return (
		<div style={{ backgroundColor }} className={s.slide} ref={containerRef}>
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
			{externalLink && (
				<a
					ref={externalLinkRef}
					href={externalLink}
					target='_blank'
					rel='noreferrer'
					className={s.externalLink}
					onClick={(e) => e.stopPropagation()}
				>
					Visit website
				</a>
			)}
		</div>
	);
}

function getExternalLink(str: string): string {
	const urlRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
	const urls: string[] = [];
	let match: RegExpExecArray | null;
	while ((match = urlRegex.exec(str)) !== null) {
		urls.push(match[2]);
	}
	return urls.length > 0 ? urls[0] : null;
}

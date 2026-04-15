'use client';

import s from './Gallery.module.scss';
import cn from 'classnames';
import useEmblaCarousel from 'embla-carousel-react';
import Slide from './slides';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useShallow, useStore } from '@/lib/store';

type Props = {
	allProjects: AllProjectsQuery['allProjects'];
};

export default function Gallery({ allProjects }: Props) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true, duration: 25 });
	const [showNavigation, setShowNavigation] = useState<string | null>(null);
	const [project, setProject, filter, index, setIndex, setShowThumbnails] = useStore(
		useShallow((s) => [
			s.project,
			s.setProject,
			s.filter,
			s.index,
			s.setIndex,
			s.setShowThumbnails,
		]),
	);
	const color = project?.color?.hex ?? 'var(--black)';
	const buttonStyle = { color };
	const projects = allProjects.filter(({ category }) => !filter || filter === category);

	function swipeNext() {
		emblaApi?.scrollNext();
	}

	useEffect(() => {
		if (!emblaApi) return;

		emblaApi.scrollTo(index, false);
		requestAnimationFrame(() => {
			const project = projects[index];
			setProject(project);
		});
	}, [index, emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		emblaApi.on('select', ({ selectedScrollSnap }) => setIndex(selectedScrollSnap()));
	}, [emblaApi]);

	useEffect(() => {
		setProject(projects[0]);
	}, [filter]);

	return (
		<>
			<div className={s.swiper} ref={emblaRef}>
				<div className={s.container}>
					{projects.map((p, idx) => (
						<div key={`${p.id}-${idx}-${filter ?? ''}`} className={s.slide} onClick={swipeNext}>
							<div className={s.slidewrap} style={{ backgroundColor: p.background?.hex }}>
								<Slide key={p.id} project={p} />
							</div>
						</div>
					))}
				</div>
			</div>

			<button
				className={cn(s.prev, showNavigation === 'prev' && s.show)}
				onMouseEnter={() => setShowNavigation('prev')}
				onMouseLeave={() => setShowNavigation(null)}
				onClick={() => emblaApi?.scrollPrev()}
				style={buttonStyle}
			>
				←
			</button>

			<button
				className={cn(s.next, showNavigation === 'next' && s.show)}
				onMouseEnter={() => setShowNavigation('next')}
				onMouseLeave={() => setShowNavigation(null)}
				onClick={() => emblaApi?.scrollNext()}
				style={buttonStyle}
			>
				→
			</button>
		</>
	);
}

'use client';

import s from './Thumbnails.module.scss';
import cn from 'classnames';
import useEmblaCarousel from 'embla-carousel-react';
import WheelGestures from 'embla-carousel-wheel-gestures';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useShallow, useStore } from '@/lib/store';

type Props = {
	allProjects: AllProjectsQuery['allProjects'];
};

export default function Thumbnails({ allProjects }: Props) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: true, duration: 0 }, [
		WheelGestures({
			forceWheelAxis: 'x',
		}),
	]);
	const [hover, setHover] = useState<string | null>(null);
	const [init, setInit] = useState(false);
	const [showThumbnails, setShowThumbnails, filter, index, setIndex, project] = useStore(
		useShallow((s) => [
			s.showThumbnails,
			s.setShowThumbnails,
			s.filter,
			s.index,
			s.setIndex,
			s.project,
		]),
	);

	const projects = allProjects.filter(({ category }) => !filter || filter === category);
	const width = 400;
	const sharpness = 80;
	const showThumbnailsRef = useRef(showThumbnails);

	function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		e.stopPropagation();
		const index = Number(e.currentTarget.dataset.index);

		requestAnimationFrame(() => {
			setIndex(index);
		});
	}
	function centerSlide(index: number): void {
		emblaApi?.scrollTo(index);
	}

	useEffect(() => {
		showThumbnailsRef.current = showThumbnails;
	}, [showThumbnails]);

	useEffect(() => {
		if (!project || showThumbnailsRef.current) return;
		const idx = projects.findIndex((p) => p.id === project?.id);
		centerSlide(idx);
	}, [project?.id]);

	useEffect(() => {
		emblaApi && setInit(true);
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		emblaApi.on('init', () => setInit(true));
	}, [emblaApi]);

	return (
		<div
			className={cn(s.swiper, (!showThumbnails || !init) && s.hide)}
			ref={emblaRef}
			onMouseLeave={() => {
				setHover(null);
				//setShowThumbnails(false);
			}}
		>
			<div className={s.container}>
				{projects.map((p, idx) => (
					<div
						key={`${p.id}-${idx}-${filter ?? ''}`}
						data-index={idx}
						className={cn(s.slide, idx === index && s.active)}
						onClick={handleClick}
						onMouseEnter={() => {
							setHover(p.id);
							setShowThumbnails(true);
						}}
						onWheel={() => setHover(p.id)}
					>
						{p.thumbnail?.url && (
							<img
								src={`${p.thumbnail.url}?w=${width}&sharp=${sharpness}`}
								alt={p.title}
								className={cn(s.image, hover === p.id && s.hover)}
							/>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

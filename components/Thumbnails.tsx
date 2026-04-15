'use client';

import s from './Thumbnails.module.scss';
import cn from 'classnames';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import Swiper from 'swiper';
import { FreeMode, Mousewheel } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import { useShallow, useStore } from '@/lib/store';

type Props = {
	allProjects: AllProjectsQuery['allProjects'];
};

export default function Thumbnails({ allProjects }: Props) {
	const swiperRef = useRef<Swiper | null>(null);
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
	const showThumbnailsRef = useRef(showThumbnails);
	const projects = allProjects.filter(({ category }) => !filter || filter === category);
	const width = 400;
	const sharpness = 90;

	function centerSlide(index: number): void {
		swiperRef.current?.slideToLoop(index, 300, true);
	}

	useEffect(() => {
		showThumbnailsRef.current = showThumbnails;
	}, [showThumbnails]);

	useEffect(() => {
		if (!project || showThumbnailsRef.current) return;
		const index = projects.findIndex((p) => p.id === project?.id);
		centerSlide(index);
	}, [project?.id]);

	return (
		<div onMouseEnter={() => setShowThumbnails(true)} onMouseLeave={() => setShowThumbnails(false)}>
			<SwiperReact
				id='thumbnails'
				key={`thumbnails-${filter ?? ''}`}
				slidesPerView={'auto'}
				spaceBetween={0}
				loop={true}
				centeredSlides={true}
				initialSlide={0}
				wrapperClass={cn(s.swiper, (!showThumbnails || !init) && s.hide)}
				direction={'horizontal'}
				modules={[FreeMode, Mousewheel]}
				mousewheel={{
					forceToAxis: true,
					releaseOnEdges: true,
					invert: false,
					sensitivity: 1,
				}}
				freeMode={{
					enabled: true,
					momentum: true,
					sticky: false,
				}}
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}
				onAfterInit={() => setInit(true)}
			>
				{projects.map((p, idx) => (
					<SwiperSlide
						key={`${p.id}-${idx}-${filter ?? ''}`}
						className={cn(s.slide, idx === index && s.active, hover === p.id && s.hover)}
						onClick={async (e) => {
							e.stopPropagation();
							setIndex(idx);
						}}
						onMouseEnter={() => setHover(p.id)}
						onWheel={() => setHover(p.id)}
						onMouseLeave={() => setHover(null)}
					>
						{p.thumbnail?.url && (
							<img
								src={`${p.thumbnail.url}?w=${width}&sharp=${sharpness}`}
								alt={p.title}
								className={cn(s.image, hover === p.id && s.hover)}
							/>
						)}
					</SwiperSlide>
				))}
			</SwiperReact>
		</div>
	);
}

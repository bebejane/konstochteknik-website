'use client';

import 'swiper/css';
import s from './Thumbnails.module.scss';
import cn from 'classnames';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import Swiper from 'swiper';
import { FreeMode, Mousewheel } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import { useShallow, useStore } from '@/lib/store';
import { Image } from 'react-datocms';

Swiper.use([FreeMode, Mousewheel]);

type Props = {
	allProjects: AllProjectsQuery['allProjects'];
};

export default function Thumbnails({ allProjects }: Props) {
	const swiperRef = useRef<Swiper | null>(null);
	const [project, setProject, category] = useStore(useShallow((s) => [s.project, s.setProject, s.category]));
	const projects = allProjects.filter(({ category: cat }) => !category || cat === category);

	return (
		<>
			<SwiperReact
				id='thumbnails'
				key={category}
				slidesPerView={'auto'}
				spaceBetween={0}
				initialSlide={0}
				loop={false}
				wrapperClass={s.swiper}
				direction={'horizontal'}
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
				onSwiper={(swiper) => (swiperRef.current = swiper)}
			>
				{projects.map((p, idx) => (
					<SwiperSlide
						key={`${p.id}-${idx}-${category}`}
						className={cn(s.slide, project?.id === p.id && s.active)}
						onClick={(e) => {
							e.stopPropagation();
							setProject(p as ProjectRecord);
						}}
					>
						<Image
							data={{ ...p.thumbnail.responsiveImage, bgColor: p.background?.hex ?? undefined }}
							intersectionMargin={'0px 100% 0px 100%'}
							usePlaceholder={false}
						/>
					</SwiperSlide>
				))}
			</SwiperReact>
		</>
	);
}

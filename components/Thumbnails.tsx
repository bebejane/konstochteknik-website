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
	const [project, setProject] = useStore(useShallow((s) => [s.project, s.setProject]));
	const [index, setIndex] = useState(0);

	return (
		<>
			<SwiperReact
				id='thumbnails'
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
				{allProjects
					?.filter(({ thumbnail }) => thumbnail?.responsiveImage)
					.map((p, idx) => (
						<SwiperSlide
							key={`${p.id}-${idx}`}
							className={cn(s.slide, project?.id === p.id && s.active)}
							onClick={(e) => {
								e.stopPropagation();
								setProject(p as ProjectRecord);
							}}
						>
							<Image data={p.thumbnail.responsiveImage} />
						</SwiperSlide>
					))}
			</SwiperReact>
		</>
	);
}

'use client';

import 'swiper/css';
import s from './Thumbnails.module.scss';
import cn from 'classnames';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import type { Swiper } from 'swiper';
import { useRef, useState } from 'react';
import { useShallow, useStore } from '@/lib/store';
import { Image } from 'react-datocms';

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
				onSlideChange={({ realIndex }) => setIndex(realIndex)}
			>
				{allProjects?.map(({ id, thumbnail }, idx) => (
					<SwiperSlide
						key={`${id}-${idx}`}
						className={cn(s.slide, project?.id === id && s.active)}
						onClick={(e) => {
							e.stopPropagation();
							setProject(allProjects[idx] as ProjectRecord);
						}}
					>
						<Image data={thumbnail.responsiveImage} />
					</SwiperSlide>
				))}
			</SwiperReact>
		</>
	);
}

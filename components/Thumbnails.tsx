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
import * as Tone from 'tone';

Swiper.use([FreeMode, Mousewheel]);

type Props = {
	allProjects: AllProjectsQuery['allProjects'];
};

const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const octave = 5;

export default function Thumbnails({ allProjects }: Props) {
	const swiperRef = useRef<Swiper | null>(null);
	const toneRef = useRef<Tone.DuoSynth | null>(null);
	const [hover, setHover] = useState<string | null>(null);
	const [category, index, setIndex] = useStore(useShallow((s) => [s.category, s.index, s.setIndex]));
	const projects = allProjects.filter(({ category: cat }) => !category || cat === category);

	function initTone() {
		//if (toneRef.current) return;
		console.log('initTone');
		//const panner = new Tone.Panner(0).toDestination();
		const feedbackDelay = new Tone.FeedbackDelay('2n', 0.9).toDestination();
		const phaser = new Tone.Phaser(2, 1, 200).toDestination();
		const volume = new Tone.Gain(-2, 'gain').toDestination();

		feedbackDelay.wet.value = 0.8;
		phaser.wet.value = 0.3;

		toneRef.current = new Tone.DuoSynth({
			volume: 0.1,
			harmonicity: 0.5,
			vibratoAmount: 0.5,
			vibratoRate: 0.5,
			context: {
				latencyHint: 'interactive',
			},
		})
			.chain(feedbackDelay, phaser, volume)
			.toDestination();
	}

	function playNote() {
		const piano = notes.map((n, i) => `${n}${octave}`).concat(notes.map((n, i) => `${n}${octave + 1}`));
		const idx = Math.floor(projects.findIndex((p) => p.id === hover) % piano.length);

		toneRef.current?.triggerAttackRelease(piano[idx], 3, Tone.now() + 0.05, 0.005);
		console.log('play note', piano[idx]);
	}

	useEffect(() => {
		//if (hover === null) return;
		//toneRef.current?.triggerAttackRelease('C5', 1, Tone.now(), 1);
	}, [hover]);

	return (
		<>
			<SwiperReact
				id='thumbnails'
				key={category}
				slidesPerView={'auto'}
				spaceBetween={0}
				initialSlide={0}
				loop={true}
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
				onClick={() => initTone()}
			>
				{projects.map((p, idx) => (
					<SwiperSlide
						key={`${p.id}-${idx}-${category}`}
						className={cn(s.slide, idx === index && s.active, hover === p.id && s.hover)}
						onClick={(e) => {
							e.stopPropagation();
							playNote();
							setIndex(idx);
							setHover(null);
						}}
						onMouseEnter={() => setHover(p.id)}
						onMouseLeave={() => setHover(null)}
					>
						<Image
							data={{ ...p.thumbnail.responsiveImage, bgColor: p.background?.hex ?? undefined }}
							intersectionMargin={'0px 100% 0px 100%'}
							//usePlaceholder={false}
						/>
					</SwiperSlide>
				))}
			</SwiperReact>
		</>
	);
}

'use client';

import { useShallow, useStore } from '@/lib/store';
import s from './Intro.module.scss';
import { use, useEffect, useRef, useState } from 'react';

type Props = {
	intro: IntroQuery['intro'];
	project: AllProjectsQuery['allProjects'][number];
};

export default function Intro({ intro, project }: Props) {
	const [inIntro, setInIntro, loading] = useStore(
		useShallow((s) => [s.inIntro, s.setInIntro, s.loading]),
	);
	const [loader, setLoader] = useState<IntroQuery['intro']['loader'][number]>(intro.loader[0]);
	const interval = useRef<NodeJS.Timeout | null>(null);
	const timeout = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		interval.current = setInterval(() => {
			setLoader((loader) => {
				const index = intro.loader.findIndex((l) => l.id === loader.id);
				return index + 1 > intro.loader.length - 1 ? intro.loader[0] : intro.loader[index + 1];
			});
		}, intro.speed);

		timeout.current = setTimeout(() => {
			clearInterval(interval.current);
			setInIntro(false);
		}, intro.duration);

		return () => {
			clearInterval(interval.current);
			clearTimeout(timeout.current);
		};
	}, [intro]);

	useEffect(() => {
		if (!loading.thumbs && !loading.gallery) {
			clearTimeout(timeout.current);
			clearInterval(interval.current);
			setInIntro(false);
		}
	}, [loading]);

	if (!inIntro) return null;

	const backgroundColor = project?.captionStyle === 'fill' ? 'var(--white)' : 'transparent';
	const color = project?.captionStyle === 'fill' ? 'var(--black)' : project?.color?.hex;

	return (
		<div className={s.intro} onClick={() => setInIntro(false)} style={{ backgroundColor, color }}>
			<h1 className='big'>
				<span className={s.title}>{loader.title}</span>
				<span className={s.and}>
					<i>&</i>
				</span>
				<span className={s.subtitle}>{loader.subtitle}</span>
			</h1>
			<h2>
				<i>Loading...</i>
			</h2>
		</div>
	);
}

'use client';

import s from './Intro.module.scss';
import cn from 'classnames';
import { useShallow, useStore } from '@/lib/store';

import { use, useEffect, useRef, useState } from 'react';
import { sleep } from 'next-dato-utils/utils';

type Props = {
	intro: IntroQuery['intro'];
	project: AllProjectsQuery['allProjects'][number];
};

const title = ['Peter, Bjorn', '&', 'Jon'];
const title2 = ['Peter,', 'Björn', '&', 'Mattias'];

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
			//}, intro.duration);
		}, 1000000);

		return () => {
			clearInterval(interval.current);
			clearTimeout(timeout.current);
		};
	}, [intro]);

	useEffect(() => {
		if (!loading.gallery) {
			//clearTimeout(timeout.current);
			clearInterval(interval.current);
			//setInIntro(false);
		}
	}, [loading]);

	useEffect(() => {
		async function animate() {
			const mattias = 'Mattias';
			const speed = 80;
			const title = document.getElementById('title');
			const lastDiv = title.querySelector('div:last-child');
			if (!title) return;
			const spans = Array.from(title.querySelectorAll('span'));

			for (const span of spans) {
				await sleep(speed);
				span.style.opacity = '1';
			}

			await sleep(500);

			for (let x = -1; x >= -3; x--) {
				spans.at(x).style.opacity = '0';
				await sleep(speed * 1.5);
			}

			for (let x = -3; x < 0; x++) {
				spans.at(x).textContent = mattias[x + 3];
				spans.at(x).style.opacity = '1';
				await sleep(speed);
			}

			for (let x = 3; x < mattias.length; x++) {
				await sleep(speed);
				const span = document.createElement('span');
				span.textContent = mattias[x];
				span.style.opacity = '1';
				lastDiv.append(span);
			}

			await sleep(500);
			//setInIntro(false);
		}
		animate();
	}, []);

	if (!inIntro) return null;

	return (
		<div className={s.intro} onClick={() => setInIntro(false)}>
			<h1 id='title' className='big'>
				{title.map((line, idx) => {
					const chars = line.split('');

					return (
						<div key={line} className={cn(s.title)}>
							{chars.map((c, i) => (
								<span key={i} className={c === '&' ? s.and : undefined}>
									{c}
								</span>
							))}
						</div>
					);
				})}

				{/* <span className={s.title}>{loader.title}</span>
				<span className={s.and}>
					<i>&</i>
				</span>
				<span className={s.subtitle}>{loader.subtitle}</span> */}
			</h1>
			{/* <h2>
				<i>Loading...</i>
			</h2> */}
		</div>
	);
}

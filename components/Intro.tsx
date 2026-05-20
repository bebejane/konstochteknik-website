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

export default function Intro({ intro, project }: Props) {
	const [inIntro, setInIntro] = useStore(useShallow((s) => [s.inIntro, s.setInIntro]));

	async function animate() {
		const title = document.getElementById('title');

		title.innerHTML = `<span class="${s.cursor}"></span>`;
		await sleep(2000);
		const speed = 0.7;
		let chars = typewriter;
		if (typeof localStorage !== 'undefined') {
			const prev = localStorage.getItem('intro');
			if (prev === 'pbj') {
				chars = typewriter2;
				localStorage.setItem('intro', 'kocht');
			} else localStorage.setItem('intro', 'pbj');
		}

		for (let i = 0; i < chars.length; i++) {
			const { str, cursor, duration } = chars[i];

			title.innerHTML = str
				.split('')
				.map(
					(c, i) =>
						`<span class="${c === '\n' ? s.break : ''}">${c}</span>` +
						(i === cursor - 1 ? `<span class="${s.cursor}"></span>` : ''),
				)
				.join('');
			await sleep(duration);
		}
		await sleep(500);
		setInIntro(false);
	}

	useEffect(() => {
		animate();
	}, []);

	if (!inIntro) return null;

	return (
		<div className={s.intro}>
			<p>Loading Selected Work by</p>
			<h1 id='title' className='big'></h1>
		</div>
	);
}

const typewriter = [
	{
		key: 'P',
		time: 128,
		str: 'P',
		cursor: 1,
		duration: 128,
	},
	{
		key: 'e',
		time: 239,
		str: 'Pe',
		cursor: 2,
		duration: 111,
	},
	{
		key: 't',
		time: 403,
		str: 'Pet',
		cursor: 3,
		duration: 164,
	},
	{
		key: 'e',
		time: 540,
		str: 'Pete',
		cursor: 4,
		duration: 137,
	},
	{
		key: 'r',
		time: 609,
		str: 'Peter',
		cursor: 5,
		duration: 69,
	},
	{
		key: ',',
		time: 772,
		str: 'Peter,',
		cursor: 6,
		duration: 163,
	},
	{
		key: ' ',
		time: 844,
		str: 'Peter, ',
		cursor: 7,
		duration: 72,
	},
	{
		key: 'B',
		time: 1155,
		str: 'Peter, B',
		cursor: 8,
		duration: 311,
	},
	{
		key: 'j',
		time: 1333,
		str: 'Peter, Bj',
		cursor: 9,
		duration: 178,
	},
	{
		key: 'o',
		time: 1619,
		str: 'Peter, Bjo',
		cursor: 10,
		duration: 286,
	},
	{
		key: 'Backspace',
		time: 2283,
		str: 'Peter, Bj',
		cursor: 9,
		duration: 264,
	},
	{
		key: 'ö',
		time: 2829,
		str: 'Peter, Bjö',
		cursor: 10,
		duration: 246,
	},
	{
		key: 'r',
		time: 3869,
		str: 'Peter, Björ',
		cursor: 11,
		duration: 340,
	},
	{
		key: 'n',
		time: 3942,
		str: 'Peter, Björn',
		cursor: 12,
		duration: 73,
	},
	{
		key: 'Enter',
		time: 4459,
		str: 'Peter, Björn\n',
		cursor: 13,
		duration: 317,
	},
	{
		key: '&',
		time: 5001,
		str: 'Peter, Björn\n&',
		cursor: 14,
		duration: 342,
	},
	{
		key: 'Enter',
		time: 5252,
		str: 'Peter, Björn\n&\n',
		cursor: 15,
		duration: 251,
	},
	{
		key: 'J',
		time: 5937,
		str: 'Peter, Björn\n&\nJ',
		cursor: 16,
		duration: 285,
	},
	{
		key: 'o',
		time: 6251,
		str: 'Peter, Björn\n&\nJo',
		cursor: 17,
		duration: 314,
	},
	{
		key: 'h',
		time: 6576,
		str: 'Peter, Björn\n&\nJoh',
		cursor: 18,
		duration: 225,
	},
	{
		key: 'Backspace',
		time: 7156,
		str: 'Peter, Björn\n&\nJo',
		cursor: 17,
		duration: 280,
	},
	{
		key: 'Backspace',
		time: 7321,
		str: 'Peter, Björn\n&\nJ',
		cursor: 16,
		duration: 125,
	},
	{
		key: 'Backspace',
		time: 7480,
		str: 'Peter, Björn\n&\n',
		cursor: 15,
		duration: 129,
	},
	{
		key: 'M',
		time: 7904,
		str: 'Peter, Björn\n&\nM',
		cursor: 16,
		duration: 290,
	},
	{
		key: 'a',
		time: 8068,
		str: 'Peter, Björn\n&\nMa',
		cursor: 17,
		duration: 164,
	},
	{
		key: 't',
		time: 8255,
		str: 'Peter, Björn\n&\nMat',
		cursor: 18,
		duration: 187,
	},
	{
		key: 't',
		time: 8422,
		str: 'Peter, Björn\n&\nMatt',
		cursor: 19,
		duration: 157,
	},
	{
		key: 'i',
		time: 8564,
		str: 'Peter, Björn\n&\nMatti',
		cursor: 20,
		duration: 132,
	},
	{
		key: 'a',
		time: 8699,
		str: 'Peter, Björn\n&\nMattia',
		cursor: 21,
		duration: 135,
	},
	{
		key: 's',
		time: 8844,
		str: 'Peter, Björn\n&\nMattias',
		cursor: 22,
		duration: 145,
	},
];

const typewriter2 = [
	{
		key: 'K',
		time: 128,
		str: 'K',
		cursor: 1,
		duration: 128,
	},
	{
		key: 'o',
		time: 239,
		str: 'Ko',
		cursor: 2,
		duration: 111,
	},
	{
		key: 'n',
		time: 403,
		str: 'Kon',
		cursor: 3,
		duration: 164,
	},
	{
		key: 's',
		time: 540,
		str: 'Kons',
		cursor: 4,
		duration: 137,
	},
	{
		key: 't',
		time: 540,
		str: 'Konst',
		cursor: 5,
		duration: 167,
	},
	{
		key: 'Enter',
		time: 4459,
		str: 'Konst\n',
		cursor: 6,
		duration: 317,
	},
	{
		key: '&',
		time: 5001,
		str: 'Konst\n&',
		cursor: 7,
		duration: 342,
	},
	{
		key: 'Enter',
		time: 5252,
		str: 'Konst\n&\n',
		cursor: 8,
		duration: 251,
	},
	{
		key: 'T',
		time: 5937,
		str: 'Konst\n&\nT',
		cursor: 9,
		duration: 285,
	},
	{
		key: 'e',
		time: 6251,
		str: 'Konst\n&\nTe',
		cursor: 10,
		duration: 314,
	},
	{
		key: 'k',
		time: 6576,
		str: 'Konst\n&\nTek',
		cursor: 11,
		duration: 225,
	},
	{
		key: 'n',
		time: 7904,
		str: 'Konst\n&\nTekn',
		cursor: 12,
		duration: 190,
	},
	{
		key: 'i',
		time: 8068,
		str: 'Konst\n&\nTekni',
		cursor: 13,
		duration: 164,
	},
	{
		key: 'k',
		time: 8255,
		str: 'Konst\n&\nTeknik',
		cursor: 14,
		duration: 187,
	},
];

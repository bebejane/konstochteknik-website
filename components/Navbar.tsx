'use client';

import Link from 'next/link';
import s from './Navbar.module.scss';
import cn from 'classnames';
import { useStore, useShallow } from '@/lib/store';
import About from './About';
import { useState } from 'react';

type Props = {
	allCommisioners: AllCommisionersQuery['allCommisioners'];
	about: AboutQuery['about'];
};

export default function Navbar({ about, allCommisioners }: Props) {
	const [project, showAbout, setShowAbout, category, setCategory, setProject] = useStore(
		useShallow((s) => [s.project, s.showAbout, s.setShowAbout, s.category, s.setCategory, s.setProject])
	);
	const color = showAbout ? 'var(--white)' : project?.color?.hex;

	function toggle(e: React.MouseEvent<HTMLButtonElement>) {
		const c =
			e.currentTarget.dataset.id === category ? undefined : (e.currentTarget.dataset.id as 'art' | 'tech' | undefined);
		setCategory(c);
		setProject(null);
	}

	return (
		<nav style={{ color }} className={cn(s.navbar)}>
			<button onClick={toggle} data-enabled={category === 'art'} data-id='art'>
				Konst
			</button>
			<button className={s.round} onClick={toggle} data-enabled={!category ? true : false}>
				&
			</button>
			<button onClick={toggle} data-enabled={category === 'tech'} data-id='tech'>
				Teknik
			</button>
		</nav>
	);
}

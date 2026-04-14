'use client';

import s from './Navbar.module.scss';
import Link from 'next/link';
import { useStore, useShallow } from '@/lib/store';
import { useState } from 'react';

export default function Navbar() {
	const [project, setProject, showAbout, setFilter, filter] = useStore(
		useShallow((s) => [s.project, s.setProject, s.showAbout, s.setFilter, s.filter]),
	);

	const [category, setCategory] = useState<'art' | 'tech' | 'all' | null>(filter);
	function toggle(e: React.MouseEvent<HTMLButtonElement>) {
		setProject(null);
		const f = (e.currentTarget.dataset.id as 'art' | 'tech' | 'all' | undefined) || null;
		setFilter(f === 'all' ? null : f);
		setCategory(null);
	}

	const color = project?.color?.hex ?? 'var(--black)';

	return (
		<nav style={{ color: showAbout ? 'var(--white)' : color }} className={s.navbar}>
			<div className={s.logo}>
				<button
					onClick={toggle}
					data-enabled={filter === 'art'}
					data-id='art'
					onMouseEnter={() => setCategory('art')}
					onMouseLeave={() => setCategory(null)}
				>
					Konst
				</button>
				<button
					className={s.and}
					onClick={toggle}
					data-enabled={!filter ? true : false}
					onMouseEnter={() => setCategory('all')}
					onMouseLeave={() => setCategory(null)}
				>
					&
				</button>
				<button
					onClick={toggle}
					data-enabled={filter === 'tech'}
					data-id='tech'
					onMouseEnter={() => setCategory('tech')}
					onMouseLeave={() => setCategory(null)}
				>
					Teknik
				</button>
			</div>
			{category && (
				<div className={s.filter}>
					{category === 'art'
						? 'Filter works on design and printed matter'
						: category === 'tech'
							? 'Filter works by interactive projects'
							: category === 'all'
								? 'Show all selected works.'
								: null}
				</div>
			)}
			<div>
				<Link href='/about' scroll={false}>
					<button style={{ color }}>About</button>
				</Link>
			</div>
		</nav>
	);
}

'use client';

import s from './Navbar.module.scss';
import Link from 'next/link';
import { useStore, useShallow } from '@/lib/store';

export default function Navbar() {
	const [project, setProject, showAbout, category, setCategory, setH2Override] = useStore(
		useShallow((s) => [
			s.project,
			s.setProject,
			s.showAbout,
			s.category,
			s.setCategory,
			s.setH2Override,
		]),
	);

	function toggle(e: React.MouseEvent<HTMLButtonElement>) {
		const c =
			e.currentTarget.dataset.id === category
				? undefined
				: (e.currentTarget.dataset.id as 'art' | 'tech' | undefined);
		setCategory(c);
		setProject(null);
	}

	const color = project?.color?.hex ?? 'var(--black)';

	return (
		<nav style={{ color: showAbout ? 'var(--white)' : color }} className={s.navbar}>
			<div className={s.logo}>
				<button
					onClick={toggle}
					data-enabled={category === 'art'}
					data-id='art'
					onMouseEnter={() => setH2Override('Filter works on design and printed matter.')}
					onMouseLeave={() => setH2Override(null)}
				>
					Konst
				</button>
				<button
					className={s.and}
					onClick={toggle}
					data-enabled={!category ? true : false}
					onMouseEnter={() => setH2Override('Show all selected works.')}
					onMouseLeave={() => setH2Override(null)}
				>
					&
				</button>
				<button
					onClick={toggle}
					data-enabled={category === 'tech'}
					data-id='tech'
					onMouseEnter={() => setH2Override('Filter works by interactive projects')}
					onMouseLeave={() => setH2Override(null)}
				>
					Teknik
				</button>
			</div>
			<div>
				<Link href='/about' scroll={false}>
					<button style={{ color }}>About</button>
				</Link>
			</div>
		</nav>
	);
}

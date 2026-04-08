'use client';

import { useEffect, useState } from 'react';
import s from './CloseButton.module.scss';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export function CloseButton() {
	const [modal, setModal] = useState(false);
	const segments = useSelectedLayoutSegment('modals');

	useEffect(() => {
		const about = document.querySelector('main  #about');
		setModal(!about ? true : false);
	}, [segments]);
	if (!modal) return null;
	return (
		<Link href='/' className={s.close} replace={true}>
			<button>Close</button>
		</Link>
	);
}

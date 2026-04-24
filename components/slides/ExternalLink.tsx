import s from './ExternalLink.module.scss';
import { useEffect, useRef } from 'react';

export default function ExternalLink({ url }: { url: string }) {
	const externalLinkRef = useRef<HTMLAnchorElement | null>(null);

	useEffect(() => {
		if (!url || !externalLinkRef.current) return;

		const container = externalLinkRef.current.parentElement;
		const link = externalLinkRef.current;

		function handleMouseMove(e: MouseEvent) {
			const { clientX: x, clientY: y } = e;
			link.style.opacity = '1';
			link.style.top = `${y}px`;
			link.style.left = `${x}px`;
		}

		function handleMouseLeave() {
			link.style.opacity = '0';
		}

		container.addEventListener('mousemove', handleMouseMove);
		container.addEventListener('mouseleave', handleMouseLeave);
		document.addEventListener('visibilitychange', handleMouseLeave);

		return () => {
			container.removeEventListener('mousemove', handleMouseMove);
			container.removeEventListener('mouseleave', handleMouseLeave);
			document.removeEventListener('visibilitychange', handleMouseLeave);
		};
	}, [url]);

	if (!url) return null;

	return (
		<a
			ref={externalLinkRef}
			href={url}
			target='_blank'
			rel='noreferrer'
			className={s.externalLink}
			onClick={(e) => e.stopPropagation()}
		>
			Visit →
		</a>
	);
}

function getExternalLink(str: string): string {
	const urlRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
	const urls: string[] = [];
	let match: RegExpExecArray | null;
	while ((match = urlRegex.exec(str)) !== null) {
		urls.push(match[2]);
	}
	return urls.length > 0 ? urls[0] : null;
}

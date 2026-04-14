'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';
import s from './VideoSlide.module.scss';
import parseStyles from 'css-to-style';

type Props = {
	active: boolean;
	data: VideoSlideRecord;
	onLoad(): void;
};

export default function VideoSlide({
	data: { backgroundImage, video, poster, css },
	onLoad,
}: Props) {
	const ref = useRef<HTMLVideoElement>(null);
	const [loaded, setLoaded] = useState(false);

	return (
		<div
			className={s.videoslide}
			style={{
				backgroundImage: backgroundImage ? `url(${backgroundImage?.url}?w=2000)` : '',
				...(parseStyles(css ?? '') as CSSProperties),
			}}
		>
			<div className={s.monitor}>
				<img src='/images/monitor.png' alt='monitor' />
				<video
					ref={ref}
					poster={poster?.url}
					muted={true}
					autoPlay={true}
					playsInline
					onCanPlay={() => onLoad()}
				>
					<source src={video.video.mp4Url} type='video/mp4' />
					<track kind='captions' />
				</video>
			</div>
		</div>
	);
}

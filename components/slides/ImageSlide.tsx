'use client';

import s from './ImageSlide.module.scss';
import cn from 'classnames';
import { Image } from 'react-datocms';
import parseStyles from 'css-to-style';
import { CSSProperties, useEffect, useState } from 'react';

type Props = {
	active: boolean;
	data: ImageSlideRecord;
	onLoad(): void;
};

export default function ImageSlide({
	data: { layout, images, backgroundImage, css },
	active,
	onLoad,
}: Props) {
	images = images.filter(({ image }) => image?.responsiveImage);

	const [loading, setLoading] = useState<Record<string, boolean>>({});
	const column = images.length === 1 ? 'single' : images.length === 2 ? 'double' : 'quad';

	useEffect(() => {
		const loaded = images.every(({ id }) => loading[id] === true);
		loaded && onLoad();
	}, [loading]);

	return (
		<div className={s.imageslide}>
			{images.map(({ id, image, background, layout: imageLayout }, idx) => (
				<figure
					id={image.id}
					key={idx}
					className={cn(s[column], imageLayout === 'cover' && s.cover)}
					style={{
						backgroundImage: backgroundImage ? `url(${backgroundImage?.url}?w=2000)` : undefined,
						backgroundColor: background?.hex,
						...(parseStyles(css ?? '') as CSSProperties),
					}}
				>
					<Image
						key={image.mimeType === 'image/gif' && active ? image.id : undefined}
						data={image.responsiveImage}
						fadeInDuration={0}
						intersectionMargin='0px 100% 0px 100%'
						objectFit={
							(layout === 'cover' && images.length === 1) || imageLayout === 'cover'
								? 'cover'
								: 'contain'
						}
						className={s.image}
						srcSetCandidates={[0.5, 0.75, 1, 1.5, 2, 3, 4]}
						usePlaceholder={false}
						onLoad={() => setLoading((l) => ({ ...l, [id]: true }))}
						pictureClassName={s[`image-${imageLayout || layout}`]}
					/>
				</figure>
			))}
		</div>
	);
}

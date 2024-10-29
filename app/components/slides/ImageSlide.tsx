'use client'

import s from "./ImageSlide.module.scss";
import cn from 'classnames'
import { Image } from 'react-datocms'

type Props = {
  active: boolean
  data: ImageSlideRecord
}

export default function ImageSlide({ data: { id, layout, images, backgroundImage, css }, active }: Props) {

  const column = images.length === 1 ? "single" : images.length === 2 ? "double" : "quad";

  return (
    <div className={s.imageslide}>
      {images.filter(({ image }) => image?.responsiveImage).map(({ id, image, background, layout: imageLayout }) =>
        <figure
          key={image.id}
          className={cn(s[column], imageLayout === 'cover' && s.cover)}
          style={{
            backgroundImage: backgroundImage ? `background-image:url(${backgroundImage?.url}?w=2000)` : undefined,
            backgroundColor: background?.hex
            //...css
          }}
        >
          <Image
            data={image.responsiveImage}
            fadeInDuration={500}
            objectFit={(layout === "cover" && images.length === 1) || imageLayout === "cover" ? "cover" : "contain"}
            className={s.image}
            srcSetCandidates={[0.5, 0.75, 1, 1.5, 2, 3, 4]}
            usePlaceholder={false}
            pictureClassName={s[`image-${imageLayout || layout}`]}
          />
        </figure>
      )}
    </div>
  )
}
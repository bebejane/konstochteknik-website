'use client'

import { useEffect, useRef } from "react";
import s from "./VideoSlide.module.scss";
import parseStyles from 'css-to-style';

type Props = {
  active: boolean
  data: VideoSlideRecord
}
export default function VideoSlide({ data: { backgroundImage, video, poster, id, css }, active }: Props) {

  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {

    if (active) {
      ref.current.currentTime = 0;
      ref.current.play();
    } else
      ref.current.pause()

  }, [active])

  return (
    <div
      className={s.videoslide}
      style={{
        backgroundImage: backgroundImage ? `background-image:url(${backgroundImage?.url}?w=2000)` : '',
        ...parseStyles(css ?? '')
      }}
    >
      <div className={s.monitor}>
        <img src="/images/monitor.png" alt="monitor" />
        <video ref={ref} poster={poster?.url} muted playsInline>
          <source src={video.video.mp4Url} type="video/mp4" />
          <track kind="captions" />
        </video>
      </div>
    </div>
  )
}
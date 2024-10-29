'use client'

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import s from "./VideoSlide.module.scss";

type Props = {
  active: boolean
  data: VideoSlideRecord
}
export default function VideoSlide({ data: { backgroundImage, video, poster, id }, active }: Props) {

  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    active ? ref.current?.play() : ref.current?.pause()
  }, [active])

  return (
    <div
      className={s.videoslide}
      style={{ backgroundImage: backgroundImage ? `background-image:url(${backgroundImage?.url}?w=2000)` : "" }}
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
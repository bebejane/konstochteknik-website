'use client'

import Link from "next/link";
import s from "./Navbar.module.scss";
import cn from 'classnames'
import { useStore } from "@lib/store";
import About from "./About";

type Props = {
  allCommisioners: AllCommisionersQuery['allCommisioners'],
  about: AboutQuery['about']
}

export default function Navbar({ about, allCommisioners }: Props) {

  const [project, showAbout, setShowAbout] = useStore((s) => [s.project, s.showAbout, s.setShowAbout]);
  const color = showAbout ? "var(--white)" : project?.color?.hex;

  return (
    <>
      <nav style={{ color }} className={cn(s.navbar, 'color-transition')}>
        <h1>
          <Link href="/">Konst & Teknik
            <br />
            <span><em>Selected Works</em></span>
          </Link>
        </h1>
        <div className={s.menu}>
          <button onClick={() => setShowAbout(!showAbout)}>{showAbout ? 'Close' : 'About'}</button>
          &nbsp;
          <Link href="https://www.instagram.com/konstteknik">News</Link>
        </div>
      </nav >
      <About allCommisioners={allCommisioners} about={about} show={showAbout} />
    </>
  )
}
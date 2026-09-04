'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

export function ScrollHero() {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const archScale = useTransform(scrollYProgress, [0, .45, 1], [.72, .94, 1.18]);
  const archRotate = useTransform(scrollYProgress, [0, .5, 1], [-7, 0, 7]);
  const archY = useTransform(scrollYProgress, [0, 1], [55, -45]);
  const titleY = useTransform(scrollYProgress, [0, .65], [0, -115]);
  const titleScale = useTransform(scrollYProgress, [0, .65], [1, .78]);
  const titleOpacity = useTransform(scrollYProgress, [0, .58, .76], [1, 1, 0]);
  const revealOpacity = useTransform(scrollYProgress, [.55, .72, 1], [0, 1, 1]);
  const revealY = useTransform(scrollYProgress, [.55, .8], [80, 0]);
  const leftX = useTransform(scrollYProgress, [.42, .78], [-280, 0]);
  const rightX = useTransform(scrollYProgress, [.42, .78], [280, 0]);

  return <section ref={section} className="scroll-hero">
    <div className="scroll-stage">
      <div className="hero-orbit hero-orbit-one"/><div className="hero-orbit hero-orbit-two"/>
      <motion.div className="hero-arch-3d" style={{ scale: archScale, rotateY: archRotate, y: archY }}>
        <Image src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=90" alt="LuxeStay resort after sunset" fill priority sizes="(max-width: 800px) 88vw, 620px"/>
        <div className="arch-vignette"/>
      </motion.div>

      <motion.div className="scroll-hero-title" style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}>
        <span>For an unforgettable stay</span>
        <h1>Book with<br/><em>LuxeStay</em></h1>
        <p>Personal hospitality, remarkable spaces and every detail handled.</p>
        <Link href="/register">Find your room <ArrowRight size={17}/></Link>
      </motion.div>

      <motion.div className="scroll-reveal" style={{ opacity: revealOpacity, y: revealY }}>
        <motion.article className="float-note note-left" style={{ x: leftX, rotateY: 10 }}><Sparkles size={19}/><small>Designed around you</small><strong>Quiet luxury.<br/>Genuine care.</strong></motion.article>
        <div className="reveal-copy"><small>The LuxeStay feeling</small><h2>Arrive curious.<br/><em>Leave inspired.</em></h2></div>
        <motion.article className="float-note note-right" style={{ x: rightX, rotateY: -10 }}><small>Guest favourite</small><strong>4.9</strong><span>★★★★★</span></motion.article>
      </motion.div>
      <div className="scroll-cue"><ChevronDown size={16}/><span>Scroll to discover</span></div>
    </div>
  </section>;
}

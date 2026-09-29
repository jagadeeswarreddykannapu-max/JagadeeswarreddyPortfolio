"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import styles from "./projects.module.css";

/*
 * Layers cut from the Projects reference (1536 x 864 source frame):
 *   sky   - the full frame with the type and the crane removed
 *   boom  - crane boom, trolley and hoist cables   (box 0,0 - 747,559)
 *   load  - hook, slings and the orange container   (box 578,543 - 844,825), pivot at the hook (710,552)
 * All three share one coordinate frame, so they stay registered at every size.
 */
const W = 1536;
const H = 864;
const BOOM = { x: 0, y: 0, w: 747, h: 559 };
const LOAD = { x: 578, y: 543, w: 266, h: 282 };
const PIVOT = { x: 710, y: 552 };
const pc = (n: number, of: number) => `${(n / of) * 100}%`;

/**
 * Master document, Projects landing: the navy scene is established first, the orange container
 * swings in from the left and settles (restrained perspective turn, a damped sway, no bounce),
 * then the copy follows. Scrolling adds a slow parallax between the sky and the crane.
 * Without JavaScript, or with reduced motion, the scene is simply shown in its final state.
 */
export function CraneScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue("0%");
  const rotateY = useMotionValue(0);
  const opacity = useMotionValue(1);
  const swing = useMotionValue(0);

  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start start", "end start"] });
  const skyY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 36]);
  const craneY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -18]);

  useEffect(() => {
    const el = groupRef.current;
    if (reduce) {
      el?.setAttribute("data-ready", "");
      return;
    }
    x.set("-62%");
    rotateY.set(16);
    opacity.set(0);
    swing.set(7);
    el?.setAttribute("data-ready", "");
    const controls = [
      animate(opacity, 1, { duration: 0.5, delay: 0.35 }),
      animate(x, "0%", { duration: 1.25, delay: 0.35, ease: [0.22, 0.9, 0.3, 1] }),
      animate(rotateY, 0, { duration: 1.25, delay: 0.35, ease: [0.22, 0.9, 0.3, 1] }),
      // the load lags while travelling, swings forward as the crane stops, then settles (damped, no elastic bounce)
      animate(swing, [7, 2.2, -3.2, 1.5, -0.6, 0.2, 0], {
        duration: 2.6,
        delay: 0.35,
        ease: "easeInOut",
        times: [0, 0.3, 0.52, 0.68, 0.81, 0.92, 1],
      }),
    ];
    return () => controls.forEach((c) => c.stop());
  }, [reduce, x, rotateY, opacity, swing]);

  return (
    <div ref={rootRef} className={styles.sceneWrap} aria-hidden>
      <motion.div className={styles.scene} style={{ y: skyY, ["--dur" as string]: "600ms" }} data-reveal="fade">
        <Image src="/images/projects/crane-sky.jpg" alt="" fill priority sizes="(min-width: 1024px) 110vw, 220vw" quality={80} className="object-cover" />
      </motion.div>

      <div className={styles.scene} style={{ perspective: 1600 }}>
        <motion.div
          ref={groupRef}
          className={`crane-load ${styles.craneGroup}`}
          style={{ x, rotateY, opacity, y: craneY }}
        >
          <div className="absolute" style={{ left: pc(BOOM.x, W), top: pc(BOOM.y, H), width: pc(BOOM.w, W), height: pc(BOOM.h, H) }}>
            <Image src="/images/projects/crane-boom.webp" alt="" fill priority sizes="(min-width: 1024px) 55vw, 110vw" quality={82} className="select-none" draggable={false} />
          </div>
          <motion.div
            className="absolute will-change-transform"
            style={{
              left: pc(LOAD.x, W),
              top: pc(LOAD.y, H),
              width: pc(LOAD.w, W),
              height: pc(LOAD.h, H),
              rotate: swing,
              transformOrigin: `${pc(PIVOT.x - LOAD.x, LOAD.w)} ${pc(PIVOT.y - LOAD.y, LOAD.h)}`,
            }}
          >
            <Image src="/images/projects/crane-load.webp" alt="" fill priority sizes="(min-width: 1024px) 20vw, 40vw" quality={85} className="select-none drop-shadow-[0_30px_40px_rgba(2,8,23,0.45)]" draggable={false} />
          </motion.div>
        </motion.div>
      </div>

      {/* keep the copy legible where the scene meets the text column and the page below */}
      <div className={styles.sceneShade} />
    </div>
  );
}

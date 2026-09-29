import Image from "next/image";
import styles from "./hero.module.css";

/**
 * Layered "looking up through the container stack" scene, rebuilt from the supplied
 * reference: a clean sky plate plus separate top and bottom container layers.
 * The parallax (10-18px) is a CSS scroll-driven animation, so the opening screen needs
 * no animation JavaScript; browsers without scroll timelines simply show it still.
 */
export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden>
      <div className={`${styles.skyPar} absolute inset-0`}>
        <div className={`${styles.sky} absolute inset-[-3%]`}>
          <Image src="/images/hero/sky.jpg" alt="" fill priority sizes="100vw" quality={80} className="object-cover" />
        </div>
      </div>

      {/* tone: deepens the open sky toward the brand blue so white type reads comfortably */}
      <div className={`${styles.scrim} absolute inset-0`} />

      <div className={`${styles.layer} ${styles.layerTop} ${styles.topPar}`}>
        <div className={`${styles.layerIn} ${styles.layerInTop}`}>
          <Image
            src="/images/hero/containers-top.webp"
            alt=""
            width={2242}
            height={896}
            priority
            quality={82}
            sizes="(orientation: portrait) 104vh, 100vw"
            className="block h-auto w-full select-none"
            draggable={false}
          />
        </div>
      </div>

      <div className={`${styles.layer} ${styles.layerBottom} ${styles.bottomPar}`}>
        <div className={`${styles.layerIn} ${styles.layerInBottom}`}>
          <Image
            src="/images/hero/containers-bottom.webp"
            alt=""
            width={2242}
            height={1006}
            priority
            quality={82}
            sizes="(orientation: portrait) 104vh, 100vw"
            className="block h-auto w-full select-none"
            draggable={false}
          />
        </div>
      </div>

      <div className={`${styles.vignette} absolute inset-0`} />
    </div>
  );
}

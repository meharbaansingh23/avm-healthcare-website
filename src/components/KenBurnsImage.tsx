import Image from "next/image";

type KenBurnsImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  /** Classes for the outer container (aspect ratio, rounding, shadow). */
  className?: string;
};

/**
 * A static image that feels alive: a very slow Ken Burns scale (1.0 → 1.05 over
 * 20s, alternating) applied via a GPU-only transform animation. The container
 * clips the overflow so the zoom stays within the frame.
 */
export default function KenBurnsImage({
  src,
  alt,
  sizes,
  priority,
  className,
}: KenBurnsImageProps) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="kenburns-img"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}

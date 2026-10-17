import { baseHref } from "@/lib/base-href"

type PawIconProps = {
  className?: string
  title?: string
}

/**
 * Official Guau Fresh paw mark (heart pad). Always rendered square via currentColor mask.
 */
export function PawIcon({ className = "h-4 w-4", title }: PawIconProps) {
  const maskUrl = `url(${baseHref("/paw-mark.png")})`

  return (
    <span
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      title={title}
      className={`inline-block aspect-square shrink-0 bg-current ${className}`}
      style={{
        WebkitMaskImage: maskUrl,
        maskImage: maskUrl,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  )
}

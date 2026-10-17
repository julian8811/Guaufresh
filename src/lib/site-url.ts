/**
 * URL canónica del sitio (Vercel, dominio propio).
 * En Vercel define PUBLIC_SITE_URL (sin barra final).
 */
const FALLBACK_SITE = "https://guaufresh.vercel.app"

function sanitizeSite(raw: unknown): string {
  const value = String(raw ?? "").trim().replace(/\/$/, "")
  if (!value) return FALLBACK_SITE
  try {
    return new URL(value).origin
  } catch {
    try {
      return new URL(`https://${value}`).origin
    } catch {
      return FALLBACK_SITE
    }
  }
}

export function siteUrl(): string {
  return sanitizeSite(import.meta.env.PUBLIC_SITE_URL)
}

export function absoluteAssetUrl(path: string): string {
  const base = siteUrl()
  const clean = path.startsWith("/") ? path : `/${path}`
  return new URL(clean, `${base}/`).toString()
}

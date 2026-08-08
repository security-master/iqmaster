export interface OrgBranding {
  organizationName: string
  primaryColor: string
  accentColor: string
  logoText: string
}

const KEY = 'iqmaster.branding.v1'

const DEFAULTS: OrgBranding = {
  organizationName: 'IQMaster',
  primaryColor: '#0e7490',
  accentColor: '#14b8a6',
  logoText: 'IQMaster',
}

const LEGACY_PURPLES = new Set(['#5b21b6', '#7c3aed', '#3b0764', '#4c1d95', '#6d28d9'])

export function getBranding(): OrgBranding {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULTS
    const parsed = JSON.parse(raw) as Partial<OrgBranding>
    // Migrate away from the old purple theme defaults.
    if (parsed.primaryColor && LEGACY_PURPLES.has(parsed.primaryColor.toLowerCase())) {
      return DEFAULTS
    }
    return { ...DEFAULTS, ...parsed }
  } catch {
    return DEFAULTS
  }
}

export function setBranding(next: Partial<OrgBranding>) {
  const merged = { ...getBranding(), ...next }
  localStorage.setItem(KEY, JSON.stringify(merged))
  applyBranding(merged)
  return merged
}

export function applyBranding(branding: OrgBranding = getBranding()) {
  const root = document.documentElement
  root.style.setProperty('--primary', branding.primaryColor)
  root.style.setProperty('--primary-deep', branding.primaryColor)
  root.style.setProperty('--brand-accent', branding.accentColor)
  root.dataset.orgName = branding.organizationName
}

export function resetBranding() {
  localStorage.removeItem(KEY)
  applyBranding(DEFAULTS)
}

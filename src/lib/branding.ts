export interface OrgBranding {
  organizationName: string
  primaryColor: string
  accentColor: string
  logoText: string
}

const KEY = 'iqmaster.branding.v1'

const DEFAULTS: OrgBranding = {
  organizationName: 'IQMaster',
  primaryColor: '#5b21b6',
  accentColor: '#7c3aed',
  logoText: 'IQMaster',
}

export function getBranding(): OrgBranding {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULTS
    return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<OrgBranding>) }
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

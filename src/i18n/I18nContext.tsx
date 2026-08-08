import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { messages, type MessageTree } from './messages'

export type Language = 'en' | 'tr'

const STORAGE_KEY = 'iqmaster.lang'

function getNested(obj: MessageTree, path: string): string | undefined {
  const parts = path.split('.')
  let current: unknown = obj
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[part]
  }
  return typeof current === 'string' ? current : undefined
}

function getInitialLang(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'tr') return stored
  } catch {
    /* ignore storage errors */
  }
  try {
    const nav = typeof navigator !== 'undefined' ? navigator.language || '' : ''
    if (nav.toLowerCase().startsWith('tr')) return 'tr'
  } catch {
    /* ignore */
  }
  return 'en'
}

type I18nVars = Record<string, string | number>

function applyVars(template: string, vars?: I18nVars): string {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] === undefined || vars[key] === null ? `{${key}}` : String(vars[key]),
  )
}

type I18nContextValue = {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string, vars?: I18nVars) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLang)

  const setLang = useCallback((next: Language) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore storage errors */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const t = useCallback(
    (key: string, vars?: I18nVars) =>
      applyVars(getNested(messages[lang], key) ?? getNested(messages.en, key) ?? key, vars),
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

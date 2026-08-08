import { useState, type FormEvent } from 'react'
import { Seo } from '../components/Seo'
import { useI18n } from '../i18n/I18nContext'
import { submitContactMessage } from '../lib/sync'
import { isSupabaseConfigured } from '../lib/supabase'

export function Contact() {
  const { t } = useI18n()
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setBusy(true)
    setStatus('idle')
    try {
      const ok = await submitContactMessage({
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        message: String(data.get('message') ?? ''),
      })
      if (!ok) throw new Error('failed')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    } finally {
      setBusy(false)
    }
  }

  const delivery = isSupabaseConfigured()
    ? t('contact.supabase')
    : import.meta.env.VITE_CONTACT_TO_EMAIL
      ? t('contact.emailGw')
      : t('contact.local')

  return (
    <div className="container page-hero">
      <Seo title={t('contact.seoTitle')} description={t('contact.seoDescription')} />
      <p className="eyebrow">{t('contact.eyebrow')}</p>
      <h1>{t('contact.title')}</h1>
      <p>{t('contact.lead')}</p>
      <p className="muted" style={{ marginTop: '0.6rem' }}>
        {t('contact.delivery')} {delivery}
      </p>

      <form className="form-grid" style={{ marginTop: '2rem' }} onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="name">{t('contact.name')}</label>
          <input id="name" name="name" required />
        </div>
        <div className="field">
          <label htmlFor="email">{t('contact.email')}</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className="field">
          <label htmlFor="message">{t('contact.message')}</label>
          <textarea id="message" name="message" required />
        </div>
        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? t('contact.sending') : t('contact.submit')}
        </button>
        {status === 'sent' && <p className="notice">{t('contact.sent')}</p>}
        {status === 'error' && <p className="notice">{t('contact.error')}</p>}
      </form>
    </div>
  )
}

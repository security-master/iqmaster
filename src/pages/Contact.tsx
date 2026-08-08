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

  return (
    <div className="container page-hero">
      <Seo
        title="Contact — IQMaster"
        description="Questions about your Test ID, certificate, pricing, or organization packages? Send a message to the IQMaster team."
      />
      <p className="eyebrow">Contact</p>
      <h1>{t('contact.title')}</h1>
      <p>Questions about your Test ID, certificate, or partnership ideas — send a note.</p>
      <p className="muted" style={{ marginTop: '0.6rem' }}>
        Delivery:{' '}
        {isSupabaseConfigured()
          ? 'Supabase inbox'
          : import.meta.env.VITE_CONTACT_TO_EMAIL
            ? 'Email gateway'
            : 'Local demo inbox (configure Supabase or VITE_CONTACT_TO_EMAIL for delivery)'}
      </p>

      <form className="form-grid" style={{ marginTop: '2rem' }} onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" required />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required />
        </div>
        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? 'Sending…' : t('contact.submit')}
        </button>
        {status === 'sent' && <p className="notice">Message received.</p>}
        {status === 'error' && (
          <p className="notice">Could not send right now. Email hello@iqmaster.app instead.</p>
        )}
      </form>
    </div>
  )
}

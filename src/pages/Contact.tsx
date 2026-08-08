import { useState, type FormEvent } from 'react'

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="container page-hero">
      <p className="eyebrow">Contact</p>
      <h1>Talk to the team</h1>
      <p>Questions about your Test ID, certificate, or partnership ideas — send a note.</p>

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
        <button className="btn btn-primary" type="submit">
          Send message
        </button>
        {status === 'sent' && <p className="notice">Message sent — we will get back to you.</p>}
        {status === 'error' && (
          <p className="notice">Could not send right now. Email hello@iqmaster.app instead.</p>
        )}
      </form>
    </div>
  )
}

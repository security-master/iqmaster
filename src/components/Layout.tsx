import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { applyBranding } from '../lib/branding'

export function Layout() {
  useEffect(() => {
    applyBranding()
  }, [])

  return (
    <>
      <Header />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

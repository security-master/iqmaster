import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">IQ</span>
          <span>
            IQMaster
            <small>Certificate IQ Test</small>
          </span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>

        <nav className={`nav ${open ? 'open' : ''}`}>
          <NavLink to="/progress" onClick={() => setOpen(false)}>
            Progress
          </NavLink>
          <NavLink to="/age-groups" onClick={() => setOpen(false)}>
            Age Groups
          </NavLink>
          <NavLink to="/packages" onClick={() => setOpen(false)}>
            Packages
          </NavLink>
          <NavLink to="/for-organizations" onClick={() => setOpen(false)}>
            Organizations
          </NavLink>
          <NavLink to="/blog" onClick={() => setOpen(false)}>
            Blog
          </NavLink>
          <NavLink to="/faq" onClick={() => setOpen(false)}>
            FAQ
          </NavLink>
          <Link to="/age-groups" className="btn btn-primary nav-cta" onClick={() => setOpen(false)}>
            Start IQ Test
          </Link>
        </nav>
      </div>
    </header>
  )
}

import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">IQ</span>
          IQMaster
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
          <NavLink to="/about" onClick={() => setOpen(false)}>
            About
          </NavLink>
          <NavLink to="/iq-score" onClick={() => setOpen(false)}>
            IQ Score
          </NavLink>
          <NavLink to="/blog" onClick={() => setOpen(false)}>
            Blog
          </NavLink>
          <NavLink to="/display-results" onClick={() => setOpen(false)}>
            Results
          </NavLink>
          <NavLink to="/faq" onClick={() => setOpen(false)}>
            FAQ
          </NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)}>
            Contact
          </NavLink>
          <Link to="/iq-test" className="btn btn-primary nav-cta" onClick={() => setOpen(false)}>
            Start IQ Test
          </Link>
        </nav>
      </div>
    </header>
  )
}

import { useEffect, useState } from 'react'
import { initApp } from '@freeappstore/sdk'
import { BuildInfo, type NavItem, PageHeader, Shell } from '@freeappstore/sdk/ui'

const fas = initApp({ appId: 'APPNAME' })

// The app's screens. Shell renders them as its navbar (<nav aria-label="Main">,
// current screen highlighted, a menu on phones). Add one entry per screen;
// `title` becomes the browser tab title on that route.
const NAV: NavItem[] = [
  { label: 'Home', href: '/', title: 'APPNAME' },
  { label: 'About', href: '/about', title: 'About — APPNAME' },
]

export default function App() {
  const [currentHref, setCurrentHref] = useState(
    () => window.location.pathname + window.location.search + window.location.hash,
  )
  const path = new URL(currentHref, window.location.href).pathname

  // Keep URL state in step with back/forward and same-path query/hash changes.
  useEffect(() => {
    const sync = () =>
      setCurrentHref(window.location.pathname + window.location.search + window.location.hash)
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('hashchange', sync)
    }
  }, [])

  // Nav clicks switch screens without a page load. Shell scrolls to the top
  // and moves focus to the new screen's PageHeader.
  const navigate = (href: string) => {
    window.history.pushState(null, '', href)
    setCurrentHref(window.location.pathname + window.location.search + window.location.hash)
  }

  return (
    <Shell app={fas} appName="APPNAME" nav={NAV} onNavigate={navigate}>
      <div className="mx-auto w-full max-w-3xl p-4 sm:p-8">
        {path === '/about' ? <About /> : <Home />}
      </div>
      <BuildInfo />
    </Shell>
  )
}

function Home() {
  return <PageHeader title="APPNAME" description="Edit web/src/App.tsx to start building." />
}

function About() {
  return (
    <>
      <PageHeader title="About" />
      <p className="text-muted">
        APPNAME is a free app on <a href="https://freeappstore.online" className="underline">FreeAppStore</a>.
      </p>
    </>
  )
}

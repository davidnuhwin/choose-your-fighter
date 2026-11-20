import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { FighterCarousel } from './components/FighterCarousel.jsx'
import { FighterProfile } from './components/FighterProfile.jsx'
import { fighters, getAdjacentIndex } from './fighters.js'
import './App.css'

function readView() {
  const profileIndex = fighters.findIndex((fighter) => fighter.id === window.location.hash.slice(1))
  if (profileIndex !== -1) {
    return { index: profileIndex, profile: true }
  }

  const selectionIndex = fighters.findIndex((fighter) => fighter.id === window.history.state?.fighterId)
  return { index: Math.max(0, selectionIndex), profile: false }
}

function App() {
  const [view, setView] = useState(readView)
  const focusTarget = useRef(null)
  const previousScreen = useRef(view.profile)

  function move(direction) {
    const index = getAdjacentIndex(view.index, direction)
    const fighterId = fighters[index].id
    const url = view.profile ? `#${fighterId}` : window.location.pathname + window.location.search
    window.history.replaceState({ ...window.history.state, fighterId }, '', url)
    setView({ ...view, index })
  }

  function openProfile() {
    const fighterId = fighters[view.index].id
    window.history.pushState({ fighterId, fromSelection: true }, '', `#${fighterId}`)
    setView({ ...view, profile: true })
  }

  function closeProfile() {
    if (window.history.state?.fromSelection) {
      window.history.back()
      return
    }

    const url = window.location.pathname + window.location.search
    window.history.replaceState({ fighterId: fighters[view.index].id }, '', url)
    setView({ ...view, profile: false })
  }

  const handleKeyDown = useEffectEvent((event) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      move(event.key === 'ArrowLeft' ? -1 : 1)
    } else if (event.key === 'Escape' && view.profile) {
      event.preventDefault()
      closeProfile()
    }
  })

  useEffect(() => {
    function syncView() {
      setView(readView())
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('popstate', syncView)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('popstate', syncView)
    }
  }, [])

  useEffect(() => {
    if (previousScreen.current === view.profile) return

    previousScreen.current = view.profile
    focusTarget.current?.focus({ preventScroll: true })
    window.scrollTo(0, 0)
  }, [view.profile])

  return (
    <main className="notebook">
      {view.profile ? (
        <FighterProfile index={view.index} onMove={move} onBack={closeProfile} focusRef={focusTarget} />
      ) : (
        <FighterCarousel index={view.index} onMove={move} onOpen={openProfile} focusRef={focusTarget} />
      )}
    </main>
  )
}

export default App

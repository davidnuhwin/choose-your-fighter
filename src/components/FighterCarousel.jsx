import { fighters, getAdjacentIndex } from '../fighters.js'
import { FighterNavigation } from './FighterNavigation.jsx'
import { SpriteAnimator } from './SpriteAnimator.jsx'

export function FighterCarousel({ index, onMove, onOpen, focusRef }) {
  const previous = getAdjacentIndex(index, -1)
  const next = getAdjacentIndex(index, 1)
  const active = fighters[index]

  return (
    <section className="selection" aria-labelledby="selection-title">
      <h1 id="selection-title" className="selection__title">Choose Your Fighter</h1>
      <div className="carousel" role="group" aria-label="Fighter selection">
        {fighters.map((fighter, position) => (
          <div
            className={`fighter-preview fighter-preview--${fighter.id}`}
            data-position={position === index ? 'active' : position === previous ? 'previous' : 'next'}
            key={fighter.id}
            aria-hidden="true"
          >
            <span className="fighter-preview__name">{fighter.name}</span>
            {fighter.idleSprite ? (
              <SpriteAnimator
                className="fighter-preview__art"
                fallbackSrc={fighter.image}
                {...fighter.idleSprite}
              />
            ) : (
              <img className="fighter-preview__art" src={fighter.image} alt="" width="1254" height="1254" draggable="false" />
            )}
          </div>
        ))}
        <FighterNavigation direction={-1} fighter={fighters[previous]} onClick={() => onMove(-1)} />
        <button type="button" className="carousel__open" ref={focusRef} onClick={onOpen}>
          <span className="sr-only">View {active.name} profile</span>
        </button>
        <FighterNavigation direction={1} fighter={fighters[next]} onClick={() => onMove(1)} />
      </div>
      <p className="selection__quote" aria-live="polite" aria-atomic="true">
        <span className="sr-only">{active.name}. </span>
        <span className="selection__quote-text" key={active.id}>“{active.description}”</span>
      </p>
    </section>
  )
}

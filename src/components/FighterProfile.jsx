import { fighters, getAdjacentIndex } from '../fighters.js'
import { FighterNavigation } from './FighterNavigation.jsx'

const macronutrients = [
  { key: 'fat', label: 'Fat', letter: 'F' },
  { key: 'carbs', label: 'Carbohydrates', letter: 'C' },
  { key: 'protein', label: 'Protein', letter: 'P' },
]

function FighterStats({ fighter }) {
  return (
    <div className="fighter-stats">
      <dl className="fighter-stats__grid" aria-label="Macronutrients per serving">
        {macronutrients.map(({ key, label, letter }) => (
          <div className="fighter-stats__item" key={key} data-primary={key === fighter.primaryMacro}>
            <dt className={`fighter-stats__letter fighter-stats__letter--${key}`}>
              <span aria-hidden="true">{letter}</span>
              <span className="sr-only">{label}</span>
            </dt>
            <dd className="fighter-stats__amount">{fighter.macros[key]}g</dd>
          </div>
        ))}
      </dl>
      <p className="fighter-stats__serving">Approx. per {fighter.serving}</p>
    </div>
  )
}

export function FighterProfile({ index, onMove, onBack, focusRef }) {
  const fighter = fighters[index]
  const previous = fighters[getAdjacentIndex(index, -1)]
  const next = fighters[getAdjacentIndex(index, 1)]

  return (
    <section className="profile" aria-labelledby="profile-title">
      <button type="button" className="profile__back" onClick={onBack}>
        <span className="return-arrow" aria-hidden="true" />
        Go Back
      </button>

      <div className="profile__body">
        <header className="profile__header">
          <p className="profile__type">{fighter.type}</p>
          <h1
            id="profile-title"
            className="profile__name"
            data-fighter={fighter.id}
            ref={focusRef}
            tabIndex={-1}
            aria-live="polite"
          >
            {fighter.name}
          </h1>
        </header>
        <img
          key={`art-${fighter.id}`}
          className={`profile__art profile__art--${fighter.id}`}
          src={fighter.image}
          alt=""
          width="1254"
          height="1254"
        />
        <div className="profile__details" key={`details-${fighter.id}`}>
          <FighterStats fighter={fighter} />
          <p className="profile__workout">{fighter.workout}</p>
          <p className="profile__description">{fighter.description}</p>
        </div>
      </div>

      <nav className="profile__navigation" aria-label="Browse fighter profiles">
        <FighterNavigation direction={-1} fighter={previous} onClick={() => onMove(-1)} showName />
        <FighterNavigation direction={1} fighter={next} onClick={() => onMove(1)} showName />
      </nav>
    </section>
  )
}

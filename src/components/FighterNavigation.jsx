export function FighterNavigation({ direction, fighter, onClick, showName = false }) {
  const previous = direction === -1

  return (
    <button
      type="button"
      className={`fighter-nav fighter-nav--${previous ? 'previous' : 'next'}`}
      aria-label={`${previous ? 'Previous' : 'Next'} fighter: ${fighter.name}`}
      onClick={onClick}
    >
      <span className="arrow" aria-hidden="true" />
      {showName && <span className="fighter-nav__name" aria-hidden="true">{fighter.shortName}</span>}
    </button>
  )
}

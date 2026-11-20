import whiteBread from './assets/white-bread.webp'
import bagel from './assets/bagel.webp'
import peanutButter from './assets/peanut-butter.webp'

export const fighters = [
  {
    id: 'white-bread',
    name: 'White Bread',
    shortName: 'White Bread',
    image: whiteBread,
    idleSprite: {
      src: `${import.meta.env.BASE_URL}assets/characters/toast-idle.png`,
      columns: 4,
      rows: 2,
      fps: 8,
    },
    type: 'Carb',
    primaryMacro: 'carbs',
    serving: '1 slice',
    macros: { fat: 1, carbs: 11, protein: 2 },
    description: 'Some might say he’s boring, but he gets along\nwith everyone! Best friend to Peanut Butter and Jam',
    workout: 'A slice can give you carbs for a workout. Try it 30–60 minutes before if it sits well.',
  },
  {
    id: 'bagel',
    name: 'Bagel',
    shortName: 'Bagel',
    image: bagel,
    idleSprite: {
      src: `${import.meta.env.BASE_URL}assets/characters/bagelspritesheet.png`,
      columns: 4,
      rows: 2,
      fps: 8,
    },
    type: 'Carb',
    primaryMacro: 'carbs',
    serving: '1 plain bagel (95 g)',
    // Thomas’ Plain Bagels, manufacturer SmartLabel nutrition panel.
    macros: { fat: 1.5, carbs: 53, protein: 9 },
    description: 'Chewy, cocky, and always up for a rematch. Bagel has never met a toaster he couldn’t handle.',
    workout: 'A plain bagel can fuel a longer workout. Try a smaller portion if you’re eating close to training.',
  },
  {
    id: 'peanut-butter',
    name: 'Peanut Butter',
    shortName: 'PB',
    image: peanutButter,
    idleSprite: {
      src: `${import.meta.env.BASE_URL}assets/characters/peanutbutterspritesheet.png`,
      columns: 4,
      rows: 2,
      fps: 7,
    },
    type: 'Fat',
    primaryMacro: 'fat',
    serving: '2 tbsp (33 g)',
    // Jif Creamy Peanut Butter, manufacturer nutrition panel.
    macros: { fat: 16, carbs: 8, protein: 7 },
    description: 'The goofy glue of the group. Peanut Butter sticks with his friends through thick and thin.',
    workout: 'Peanut butter adds fat and protein to toast. If it feels heavy before training, try a thinner spread or eat it earlier.',
  },
]

export function getAdjacentIndex(index, direction) {
  return (index + direction + fighters.length) % fighters.length
}

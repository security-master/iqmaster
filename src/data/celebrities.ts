import { asset } from '../lib/asset'

export type CelebrityIq = {
  name: string
  iq: number
  photo: string
}

/** Reported / commonly cited scores used for social comparison — not clinical claims. */
export const celebrities: CelebrityIq[] = [
  {
    name: 'Taylor Swift',
    iq: 136,
    photo: asset('/images/celebrities/taylor-swift.jpg'),
  },
  {
    name: 'Elon Musk',
    iq: 155,
    photo: asset('/images/celebrities/elon-musk.jpg'),
  },
  {
    name: 'Zendaya',
    iq: 134,
    photo: asset('/images/celebrities/zendaya.jpg'),
  },
  {
    name: 'Bill Gates',
    iq: 160,
    photo: asset('/images/celebrities/bill-gates.jpg'),
  },
  {
    name: 'Emma Watson',
    iq: 138,
    photo: asset('/images/celebrities/emma-watson.jpg'),
  },
  {
    name: 'Cristiano Ronaldo',
    iq: 132,
    photo: asset('/images/celebrities/cristiano-ronaldo.jpg'),
  },
  {
    name: 'Beyoncé',
    iq: 133,
    photo: asset('/images/celebrities/beyonce.jpg'),
  },
  {
    name: 'Leonardo DiCaprio',
    iq: 137,
    photo: asset('/images/celebrities/leonardo-dicaprio.jpg'),
  },
  {
    name: 'Shakira',
    iq: 140,
    photo: asset('/images/celebrities/shakira.jpg'),
  },
  {
    name: 'Mark Zuckerberg',
    iq: 152,
    photo: asset('/images/celebrities/mark-zuckerberg.jpg'),
  },
  {
    name: 'Margot Robbie',
    iq: 135,
    photo: asset('/images/celebrities/margot-robbie.jpg'),
  },
  {
    name: 'Timothée Chalamet',
    iq: 131,
    photo: asset('/images/celebrities/timothee-chalamet.jpg'),
  },
]

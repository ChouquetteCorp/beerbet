import versus1 from '../assets/images/versus1.jpg'
import versus2 from '../assets/images/versus2.jpg'
import versus3 from '../assets/images/versus3.jpg'
import versus4 from '../assets/images/versus4.jpg'

interface Event {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  location: string
  date: {
    day: number
    month: number
    year: number
    hour?: string
  }
}

export const EventsMock: Event[] = [
  {
    id: 1,
    title: 'Affrontement 3ème VS 2ème',
    subtitle: 'Grand match de Ping Pong entre les champions du 3ème et du 2ème',
    description:
      'Ervin Halgand, champion du 3ème jouera contre le champion du 2ème étage Jean Portalis dans un match de Ping ' +
      'Pong sans merci en 3 sets. Le vainqueur sera sacré grand champion de Niji Nantes et pourra se la raconter un max.',
    image: versus1,
    location: 'À la cafet',
    date: {
      day: 9,
      month: 11,
      year: 2023,
      hour: '13h30',
    },
  },
  {
    id: 2,
    title: 'Concours de hot dogs',
    subtitle: 'Qui mangera le plus de hot dogs ? Qui mangera le plus vite ?',
    description:
      'Ad voluptas soluta aut itaque deserunt aut dolorem laudantium hic amet officiis. Et odit quas eum architecto ' +
      'rerum ab laboriosam dolores vel quod labore et voluptatem illum aut facilis exercitationem aut ipsa sunt.',
    image: versus2,
    location: 'Chez Ervin Halgand',
    date: {
      day: 15,
      month: 11,
      year: 2023,
    },
  },
  {
    id: 3,
    title: 'Lever de menhirs en bande organisée',
    subtitle: 'Attention à la tête le lendemain !',
    description:
      'Ut dignissimos quia et enim natus vel quod ratione est velit reiciendis. Et eveniet autem et voluptatem ' +
      'voluptatem qui nisi accusantium ut quam doloribus.',
    image: versus3,
    location: 'Au Shamrock à Rennes',
    date: {
      day: 25,
      month: 11,
      year: 2023,
    },
  },
  {
    id: 4,
    title: 'Escalade de la tour Eiffel',
    subtitle: 'Merci de prendre une assurance vie avant de venir...',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt luctus',
    image: versus4,
    location: 'Paris',
    date: {
      day: 15,
      month: 12,
      year: 2023,
    },
  },
]

import { EventUnit } from '../end-bet/computes/ComputeInterface.ts'

export function getDomain(unit: EventUnit) {
  if (Deno.env.get('BACKEND_ENV') === 'production') {
    switch (unit) {
      case EventUnit.CHOUQUETTE:
        return 'https://chouquette-bet.netlify.app/'
      case EventUnit.BEER:
        return 'https://beerbet.netlify.app/'
    }
  } else {
    switch (unit) {
      case EventUnit.CHOUQUETTE:
        return 'https://develop--chouquette-bet.netlify.app/'
      case EventUnit.BEER:
        return 'https://develop--beer-bet.netlify.app/'
    }
  }
}

import { Effect } from 'undux'
import { State } from './store'

export let withEffects: Effect<State> = store => {

  // localStorage
  store.onAll().subscribe(({ key, value }) =>
    localStorage.setItem(key, JSON.stringify(value))
  )

  // router
  store.on('route').subscribe(route =>
    window.location.hash = route
  )
}

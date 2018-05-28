import { Plugin } from 'undux'
import { State } from './store'

export let withEffects: Plugin<State> = store => {

  // localStorage
  store.onAll().subscribe(({ key, value }) =>
    localStorage.setItem(key, JSON.stringify(value))
  )

  // router
  store.on('route').subscribe(route =>
    window.location.hash = route
  )

  return store
}

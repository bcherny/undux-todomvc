import { Store } from './store'

export function withEffects(store: Store): Store {

  // localStorage
  store.beforeAll().subscribe(({ key, value }) =>
    localStorage.setItem(key, JSON.stringify(value))
  )

  // router
  store.on('route').subscribe(route =>
    window.location.hash = route
  )

  return store
}

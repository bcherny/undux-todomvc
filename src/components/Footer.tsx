import * as React from 'react'
import { Route } from '../datatypes'
import { Store, withStore } from '../store'
import { pluralize } from '../utils'

let filters: [Route, string][] = [
  ['/all', 'All'],
  ['/active', 'Active'],
  ['/completed', 'Completed']
]

export let TodoFooter = withStore('route', 'todos')(({ store }) => {

  let allTodos = store.get('todos')
  let activeCount = allTodos.filter(_ => _.status === 'active').length
  let completedCount = allTodos.length - activeCount
  let shouldShowClearButton = completedCount > 0

  return <footer className='footer'>
    <span className='todo-count'>
      <strong>{activeCount}</strong> {pluralize(activeCount, 'item')} left
    </span>
    <ul className='filters'>
      {filters.map(([route, name]) =>
        <li key={route}>
          <a
            className={route === store.get('route') ? 'selected' : ''}
            onClick={() => store.set('route')(route)}
          >{name}</a>
        </li>
      )}
    </ul>
    {shouldShowClearButton && <button
      className='clear-completed'
      onClick={onClearCompleted(store)}>
      Clear completed
    </button>}
  </footer>
})

let onClearCompleted =
  (store: Store) =>
  () => store.set('todos')(
    store.get('todos').filter(_ => _.status !== 'completed')
  )

import * as React from 'react'
import { Route } from '../datatypes'
import { StoreProps, withStore } from '../store'
import { pluralize } from '../utils'

let filters: [Route, string][] = [
  ['/all', 'All'],
  ['/active', 'Active'],
  ['/completed', 'Completed']
]

export let TodoFooter = withStore(class extends React.Component<StoreProps> {
  render() {

    let allTodos = this.props.store.get('todos')
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
              className={route === this.props.store.get('route') ? 'selected' : ''}
              onClick={() => this.props.store.set('route')(route)}
            >{name}</a>
          </li>
        )}
      </ul>
      {shouldShowClearButton && <button
        className='clear-completed'
        onClick={this.onClearCompleted}>
        Clear completed
    </button>}
    </footer>
  }

  onClearCompleted = () =>
    this.props.store.set('todos')(
      this.props.store.get('todos').filter(_ => _.status !== 'completed')
    )
})

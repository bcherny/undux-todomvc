import classnames from 'classnames'
import React from 'react'
import { Route, Todo } from '../datatypes'
import Store, { StoreProps } from '../store'
import TodoItem from './TodoItem'

type Props = StoreProps & {
  onDestroy(todo: Todo): void
  onSave(todo: Todo, title: string): void
  onToggle(todo: Todo, isCompleted: boolean): void
}

let TodoList: React.StatelessComponent<Props> = ({
  onDestroy, onSave, onToggle, store
}) =>
  <ul className='todo-list'>
    {store
      .get('todos')
      .filter(byRoute(store.get('route')))
      .map((todo, index) =>
        <li
          className={classnames({
            completed: todo.status === 'completed',
            editing: todo === store.get('editingTodo')
          })}
          key={index}
        >
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onDestroy={onDestroy}
            onSave={onSave}
          />
        </li>
      )
    }
  </ul>

export default Store.withStore(TodoList)

function byRoute(route: Route) {
  return (todo: Todo): boolean => {
    switch (route) {
      case '/all': return true
      case '/active': return todo.status === 'active'
      case '/completed': return todo.status === 'completed'
    }
  }
}

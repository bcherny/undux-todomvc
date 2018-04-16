import { without } from 'lodash'
import * as React from 'react'
import { Todo, TodoStatus } from '../datatypes'
import { StoreProps, withStore } from '../store'
import { replace } from '../utils'
import { AddTodoItem } from './AddTodoItem'
import { TodoFooter } from './Footer'
import { TodoList } from './TodoList'
import { ToggleAll } from './ToggleAll'

export let App = withStore(class extends React.Component<StoreProps> {

  render() {
    return <React.Fragment>
      <header className='header'>
        <h1>todos</h1>
        <AddTodoItem />
      </header>
      <section className='main'>
        <ToggleAll onChange={this.onToggleAll} />
        <TodoList
          onDestroy={this.onDestroy}
          onSave={this.onSave}
          onToggle={this.onToggle}
        />
      </section>
      <TodoFooter />
    </React.Fragment>
  }

  onDestroy = (todo: Todo) => {
    this.props.store.set('todos')(
      without(this.props.store.get('todos'), todo)
    )
  }

  onToggleAll = (status: TodoStatus) =>
    this.props.store.set('todos')(
      this.props.store.get('todos').map(_ => ({ ..._, status }))
    )

  onToggle = (todo: Todo, isCompleted: boolean) => {
    let status: TodoStatus = isCompleted ? 'completed' : 'active'
    this.props.store.set('todos')(
      replace(this.props.store.get('todos'), todo, { ...todo, status })
    )
  }

  onSave = (todo: Todo, title: string) => {
    this.props.store.set('todos')(
      replace(this.props.store.get('todos'), todo, { ...todo, title })
    )
    this.props.store.set('editingTodo')(null)
  }

})

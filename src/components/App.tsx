import without from 'lodash/without'
import React from 'react'
import { Todo, TodoStatus } from '../datatypes'
import Store, { StoreProps } from '../store'
import { replace } from '../utils'
import AddTodoItem from './AddTodoItem'
import TodoFooter from './Footer'
import TodoList from './TodoList'
import ToggleAll from './ToggleAll'

class App extends React.Component<StoreProps> {

  render() {
    return <>
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
    </>
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
    let {store} = this.props
    store.set('todos')(
      replace(store.get('todos'), todo, { ...todo, title })
    )
    store.set('editingTodo')(null)
  }

}

export default Store.withStore(App)

import * as React from 'react'
import { ENTER, ESCAPE } from '../constants/KEYCODES'
import { Todo } from '../datatypes'
import { StoreProps, withStore } from '../store'
import { Input } from './Input'

type Props = {
  todo: Todo
  onDestroy(todo: Todo): void
  onSave(todo: Todo, title: string): void
  onToggle(todo: Todo, isCompleted: boolean): void
}

export let TodoItem = withStore(
  class TodoItem extends React.Component<StoreProps & Props> {

    onEdit = () => {
      this.props.store.set('editingTodo')(this.props.todo)
      this.props.store.set('editingTodoNewTitle')(this.props.todo.title)
    }

    onKeyDown = (keyCode: number) => {
      switch (keyCode) {
        case ENTER:
          this.onSubmit()
          return
        case ESCAPE:
          this.props.store.set('editingTodoNewTitle')(this.props.todo.title)
          this.props.store.set('editingTodo')(null)
          return
      }
    }

    onSubmit = () => {
      let text = this.props.store.get('editingTodoNewTitle')
      switch (text) {
        case null:
          return
        case '':
          return this.props.onDestroy(this.props.todo)
        default:
          this.props.onSave(this.props.todo, text)
          this.props.store.set('editingTodoNewTitle')(null)
      }
    }

    render() {
      if (this.props.todo === this.props.store.get('editingTodo')) {
        return <Input
          autoFocus
          className='edit'
          value={this.props.store.get('editingTodoNewTitle') || ''}
          onBlur={() => this.onSubmit()}
          onChange={this.props.store.set('editingTodoNewTitle')}
          onKeyDown={this.onKeyDown}
        />
      }

      return <div className='view'>
        <input
          className='toggle'
          type='checkbox'
          checked={this.props.todo.status === 'completed'}
          onChange={e => this.props.onToggle(this.props.todo, e.currentTarget.checked)}
        />
        <label onDoubleClick={this.onEdit}>
          {this.props.todo.title}
        </label>
        <button
          className='destroy'
          onClick={() => this.props.onDestroy(this.props.todo)}
        />
      </div>
    }
  }
)

import React from 'react'
import { ENTER } from '../constants/KEYCODES'
import Store, { StoreProps } from '../store'
import { Input } from './Input'

class AddTodoItem extends React.Component<StoreProps> {

  render() {
    return <Input
      autoFocus={true}
      className='new-todo'
      onChange={this.props.store.set('addTodoTitle')}
      onKeyDown={this.onKeyDown}
      placeholder='What needs to be done?'
      value={this.props.store.get('addTodoTitle')}
    />
  }

  onKeyDown = (keyCode: number) => {
    let { store } = this.props
    switch (keyCode) {
      case ENTER:
        let title = store.get('addTodoTitle')
        if (title) {
          store.set('addTodoTitle')('')
          store.set('todos')([
            { status: 'active', title },
            ...store.get('todos')
          ])
        }
    }
  }
}

export default Store.withStore(AddTodoItem)

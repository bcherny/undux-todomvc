import * as React from 'react'
import { ENTER } from '../constants/KEYCODES'
import { Store, withStore } from '../store'
import { Input } from './Input'

export let AddTodoItem = withStore('addTodoTitle')(({ store }) =>
  <Input
    autoFocus={true}
    className='new-todo'
    onChange={store.set('addTodoTitle')}
    onKeyDown={onKeyDown(store)}
    placeholder='What needs to be done?'
    value={store.get('addTodoTitle')}
  />
)

let onKeyDown =
  (store: Store) =>
  (keyCode: number) => {
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

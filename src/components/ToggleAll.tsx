import { sum } from 'lodash'
import * as React from 'react'
import { TodoStatus } from '../datatypes'
import { withStore } from '../store'

type Props = {
  onChange(status: TodoStatus): void
}

export let ToggleAll = withStore('todos')<Props>(({ onChange, store }) => {

  let allTodos = store.get('todos')
  let activeCount = sum(allTodos.filter(_ => _.status === 'active'))

  return <input
    className='toggle-all'
    type='checkbox'
    onChange={e => onChange(e.currentTarget.checked ? 'completed' : 'active')}
    checked={activeCount === 0}
  />

})

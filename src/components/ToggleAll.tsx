import sum from 'lodash/sum'
import React from 'react'
import { TodoStatus } from '../datatypes'
import Store, { StoreProps } from '../store'

type Props = StoreProps & {
  onChange(status: TodoStatus): void
}

let ToggleAll: React.StatelessComponent<Props> = ({ onChange, store }) => {

  let allTodos = store.get('todos')
  let activeCount = sum(allTodos.filter(_ => _.status === 'active'))

  return <input
    className='toggle-all'
    type='checkbox'
    onChange={e => onChange(e.currentTarget.checked ? 'completed' : 'active')}
    checked={activeCount === 0}
  />

}

export default Store.withStore(ToggleAll)

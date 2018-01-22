import { connect, createStore, Store as BabyduxStore, withLogger } from 'undux'
import { Route, Todo } from './datatypes'
import { withEffects } from './effects'
import { fromLocalStorage } from './utils'

type Actions = {
  addTodoTitle: string
  editingTodo: Todo | null
  editingTodoNewTitle: string | null
  route: Route
  todos: Todo[]
}

let initialState = fromLocalStorage<Actions>({
  addTodoTitle: '',
  editingTodo: null,
  editingTodoNewTitle: null,
  route: '/all',
  todos: []
})

let store = withEffects(withLogger(
  createStore<Actions>(initialState)
))

export type Store = BabyduxStore<Actions>

export type StoreProps = {
  store: Store
}

export let withStore = connect(store)

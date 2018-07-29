import { connectToTree, Store, withLogger } from 'undux'
import { Route, Todo } from './datatypes'
import { withEffects } from './effects'
import { fromLocalStorage } from './utils'

export type State = {
  addTodoTitle: string
  editingTodo: Todo | null
  editingTodoNewTitle: string | null
  route: Route
  todos: Todo[]
}

let initialState = fromLocalStorage<State>({
  addTodoTitle: '',
  editingTodo: null,
  editingTodoNewTitle: null,
  route: '/all',
  todos: []
})

export default connectToTree(initialState, s => withEffects(withLogger((s))))

export type StoreProps = {
  store: Store<State>
}

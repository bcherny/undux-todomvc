export type Route = '/all' | '/active' | '/completed'

export type Todo = {
  status: TodoStatus
  title: string
}

export type TodoStatus = 'active' | 'completed'

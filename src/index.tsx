import * as React from 'react'
import { render } from 'react-dom'
import { withLogger } from 'undux'
import App from './components/App'
import { withEffects } from './effects'
import Store from './store'

render(
  <Store.Container effects={_ => withEffects(withLogger(_))}><App /></Store.Container>,
  document.getElementsByClassName('todoapp')[0]
)

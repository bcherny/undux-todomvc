import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import Store from './store'

render(
  <Store.Container><App /></Store.Container>,
  document.getElementsByClassName('todoapp')[0]
)

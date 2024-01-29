/* @refresh reload */
import { render } from 'solid-js/web'

import './scss/styles.scss';
import App from './App'

const root = document.getElementById('root')

render(() => <App />, root!)

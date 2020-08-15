import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import songs from './songs'

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    songs
  })

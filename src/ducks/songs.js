import { List, Map } from 'immutable'

import songClient from '../api/song'

const FETCH_SONGS = 'FETCH_SONGS'
const FETCH_SONGS_DONE = 'FETCH_SONGS_DONE'
const FETCH_SONGS_FAILED = 'FETCH_SONGS_FAILED'

const defaultState = Map({
  songs: List([])
})

export function fetchSongs() {
  return (dispatch) => {
    songClient.getTop20().then((data) => dispatch({ type: FETCH_SONGS_DONE, payload: data }))
  }
}

export default function (state = defaultState, action = {}) {
  const { type, payload } = action

  switch (type) {
    case FETCH_SONGS_DONE: {
      console.log(`PAYLOAD: ${JSON.stringify(payload, null, 2)}`)
      return state.set('songs', List(payload))
    }
    default:
      return state
  }
}

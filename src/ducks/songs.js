import { List, Map } from 'immutable'

const defaultState = Map({
  songs: List([])
})

export default function (state = defaultState, action = {}) {
  const { type } = action

  switch (type) {
    default:
      return state
  }
}

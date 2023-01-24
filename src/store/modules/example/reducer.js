import * as types from '../types'

const initialState = {
  buttonClicked: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.BUTTON_CLICK_REQUEST: {
      console.log(`I'm running the REQUEST`)
      return state
    }

    case types.BUTTON_CLICK_SUCCESS: {
      console.log(`Success :D`)
      const newState = { ...state }
      newState.buttonClicked = !newState.buttonClicked
      return newState
    }

    case types.BUTTON_CLICK_FAILURE: {
      console.log(`FAILURE  :(`)
      return state
    }

    default:
      return state
  }
}

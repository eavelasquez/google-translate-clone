import { useReducer } from 'react'

import { ActionTypes, type Action, type State } from './types.d'
import { Button } from 'react-bootstrap'

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  text: '',
  translatedText: '',
  loading: false
}

function reducer (state: State, action: Action) {
  const { type } = action

  if (type === ActionTypes.INTERCHANGE_LANGUAGES) {
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }

  if (type === ActionTypes.SET_FROM_LANGUAGE) {
    return {
      ...state,
      fromLanguage: action.payload
    }
  }

  if (type === ActionTypes.SET_TO_LANGUAGE) {
    return {
      ...state,
      toLanguage: action.payload
    }
  }

  if (type === ActionTypes.SET_TEXT) {
    return {
      ...state,
      loading: true,
      text: action.payload,
      translatedText: ''
    }
  }

  if (type === ActionTypes.SET_TRANSLATED_TEXT) {
    return {
      ...state,
      loading: false,
      translatedText: action.payload
    }
  }

  return state
}

function App () {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { fromLanguage } = state

  return (
    <div className='App'>
      <h1>Google Translate Clone</h1>

      <Button
        variant='link'
        onClick={() => { dispatch({ type: ActionTypes.SET_FROM_LANGUAGE, payload: 'es' }) }}
      >
        Interchange
      </Button>

      <pre>{JSON.stringify({ fromLanguage }, null, 2)}</pre>
    </div>
  )
}

export default App

import { useReducer } from 'react'

import { ActionTypes, type Action, type State } from '../types.d'

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

export function useStore () {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { fromLanguage, toLanguage, text, translatedText, loading } = state

  const interchangeLanguages = () => {
    dispatch({ type: ActionTypes.INTERCHANGE_LANGUAGES })
  }

  const setFromLanguage = (fromLanguage: string) => {
    dispatch({ type: ActionTypes.SET_FROM_LANGUAGE, payload: fromLanguage })
  }

  const setToLanguage = (toLanguage: string) => {
    dispatch({ type: ActionTypes.SET_TO_LANGUAGE, payload: toLanguage })
  }

  const setText = (text: string) => {
    dispatch({ type: ActionTypes.SET_TEXT, payload: text })
  }

  const setTranslatedText = (translatedText: string) => {
    dispatch({ type: ActionTypes.SET_TRANSLATED_TEXT, payload: translatedText })
  }

  return {
    fromLanguage,
    toLanguage,
    text,
    translatedText,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setText,
    setTranslatedText
  }
}

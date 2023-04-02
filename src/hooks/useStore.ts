import { useReducer } from 'react'

import { ActionType, type Action, type State, type Language, type FromLanguage } from '../types.d'
import { AUTO_DETECT_LANGUAGE } from '../utils/constants'

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  text: '',
  translatedText: '',
  loading: false
}

function reducer (state: State, action: Action) {
  const { type } = action

  if (type === ActionType.INTERCHANGE_LANGUAGES) {
    // If the fromLanguage is auto, we don't want to interchange it
    if (state.fromLanguage === AUTO_DETECT_LANGUAGE) return state

    return {
      ...state,
      fromLanguage: state.toLanguage,
      loading: state.text !== '',
      translatedText: '',
      toLanguage: state.fromLanguage
    }
  }

  if (type === ActionType.SET_FROM_LANGUAGE) {
    if (state.fromLanguage === action.payload) return state

    return {
      ...state,
      fromLanguage: action.payload,
      loading: state.text !== '',
      translatedText: ''
    }
  }

  if (type === ActionType.SET_TO_LANGUAGE) {
    if (state.toLanguage === action.payload) return state

    return {
      ...state,
      loading: state.text !== '',
      toLanguage: action.payload,
      translatedText: ''
    }
  }

  if (type === ActionType.SET_TEXT) {
    return {
      ...state,
      loading: action.payload !== '',
      text: action.payload,
      translatedText: ''
    }
  }

  if (type === ActionType.SET_TRANSLATED_TEXT) {
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
    dispatch({ type: ActionType.INTERCHANGE_LANGUAGES })
  }

  const setFromLanguage = (fromLanguage: FromLanguage) => {
    dispatch({ type: ActionType.SET_FROM_LANGUAGE, payload: fromLanguage })
  }

  const setToLanguage = (toLanguage: Language) => {
    dispatch({ type: ActionType.SET_TO_LANGUAGE, payload: toLanguage })
  }

  const setText = (text: string) => {
    dispatch({ type: ActionType.SET_TEXT, payload: text })
  }

  const setTranslatedText = (translatedText: string) => {
    dispatch({ type: ActionType.SET_TRANSLATED_TEXT, payload: translatedText })
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

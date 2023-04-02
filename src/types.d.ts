import { type AUTO_DETECT_LANGUAGE, type SUPPORTED_LANGUAGES } from './utils/constants'

export type Language = keyof typeof SUPPORTED_LANGUAGES
export type Auto_Language = typeof AUTO_DETECT_LANGUAGE
export type FromLanguage = Language | Auto_Language

export interface State {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
  translatedText: string
  loading: boolean
}

export enum ActionTypes {
  INTERCHANGE_LANGUAGES = 'INTERCHANGE_LANGUAGES',
  SET_FROM_LANGUAGE = 'SET_FROM_LANGUAGE',
  SET_TO_LANGUAGE = 'SET_TO_LANGUAGE',
  SET_TEXT = 'SET_TEXT',
  SET_TRANSLATED_TEXT = 'SET_TRANSLATED_TEXT'
}

export type Action =
  | { type: ActionTypes.INTERCHANGE_LANGUAGES }
  | { type: ActionTypes.SET_FROM_LANGUAGE, payload: FromLanguage }
  | { type: ActionTypes.SET_TO_LANGUAGE, payload: Language }
  | { type: ActionTypes.SET_TEXT, payload: string }
  | { type: ActionTypes.SET_TRANSLATED_TEXT, payload: string }

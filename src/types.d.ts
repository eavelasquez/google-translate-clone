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

export enum ActionType {
  INTERCHANGE_LANGUAGES = 'INTERCHANGE_LANGUAGES',
  SET_FROM_LANGUAGE = 'SET_FROM_LANGUAGE',
  SET_TO_LANGUAGE = 'SET_TO_LANGUAGE',
  SET_TEXT = 'SET_TEXT',
  SET_TRANSLATED_TEXT = 'SET_TRANSLATED_TEXT'
}

export type Action =
  | { type: ActionType.INTERCHANGE_LANGUAGES }
  | { type: ActionType.SET_FROM_LANGUAGE, payload: FromLanguage }
  | { type: ActionType.SET_TO_LANGUAGE, payload: Language }
  | { type: ActionType.SET_TEXT, payload: string }
  | { type: ActionType.SET_TRANSLATED_TEXT, payload: string }

export enum SectionType {
  From = 'from',
  To = 'to'
}

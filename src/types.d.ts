export interface State {
  fromLanguage: string
  toLanguage: string
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
  | { type: ActionTypes.SET_FROM_LANGUAGE, payload: string }
  | { type: ActionTypes.SET_TO_LANGUAGE, payload: string }
  | { type: ActionTypes.SET_TEXT, payload: string }
  | { type: ActionTypes.SET_TRANSLATED_TEXT, payload: string }

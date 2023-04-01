export interface State {
  fromLanguage: string
  loading: boolean
  text: string
  toLanguage: string
  translatedText: string
}

export enum ActionTypes {
  INTERCHANGE_LANGUAGES,
  SET_FROM_LANGUAGE,
  SET_TEXT,
  SET_TO_LANGUAGE,
  SET_TRANSLATED_TEXT
}

export type Action =
  | { type: ActionTypes.INTERCHANGE_LANGUAGES }
  | { type: ActionTypes.SET_FROM_LANGUAGE, payload: string }
  | { type: ActionTypes.SET_TEXT, payload: string }
  | { type: ActionTypes.SET_TO_LANGUAGE, payload: string }
  | { type: ActionTypes.SET_TRANSLATED_TEXT, payload: string }

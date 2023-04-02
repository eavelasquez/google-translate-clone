import { Form } from 'react-bootstrap'
import { type ChangeEvent, type FC } from 'react'

import { SUPPORTED_LANGUAGES } from '../utils/constants'
import { type FromLanguage, type Language } from '../types'

type Props =
  | { type: 'from', value: FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: 'to', value: Language, onChange: (language: Language) => void }

export const LanguageSelector: FC<Props> = ({ onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }

  return (
    <Form.Select
      aria-label='Select Language'
      onChange={handleChange}
    >
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  )
}
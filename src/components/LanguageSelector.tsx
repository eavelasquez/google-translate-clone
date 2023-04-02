import { Form } from 'react-bootstrap'
import { type ChangeEvent, type FC } from 'react'

import { AUTO_DETECT_LANGUAGE, SUPPORTED_LANGUAGES } from '../utils/constants'
import { type FromLanguage, type Language } from '../types'

type Props =
  | { type: 'from', value: FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: 'to', value: Language, onChange: (language: Language) => void }

export const LanguageSelector: FC<Props> = ({ type, value, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }

  return (
    <Form.Select aria-label='Select Language' onChange={handleChange} size='sm' value={value}>
      {type === 'from' && <option value={AUTO_DETECT_LANGUAGE}>Detect language</option>}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  )
}

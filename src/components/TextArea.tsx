import { Form } from 'react-bootstrap'
import { type ChangeEvent, type FC } from 'react'

import { SectionType } from '../types.d'

interface Props {
  type: SectionType
  loading?: boolean // undefined is the same as false
  text: string
  onChange: (text: string) => void
}

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) {
    return 'Text to translate...'
  }

  if (loading === true) {
    return 'Loading...'
  }

  return 'Translated text...'
}

export const TextArea: FC<Props> = ({ type, loading, text, onChange }) => {
  const autoFocus = type === SectionType.From
  const className = type === SectionType.From ? 'textarea-from' : 'textarea-to'
  const disabled = type === SectionType.To
  const placeholder = getPlaceholder({ type, loading })

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  function handleInput (e: ChangeEvent<HTMLTextAreaElement>) {
    e.target.style.height = 'auto'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  return (
    <Form.Control
      as='textarea'
      autoFocus={autoFocus}
      className={`mt-3 ${className}`}
      disabled={disabled}
      onChange={handleChange}
      onInput={handleInput}
      placeholder={placeholder}
      rows={6}
      size='lg'
      style={{ resize: 'none' }}
      value={text}
    />
  )
}

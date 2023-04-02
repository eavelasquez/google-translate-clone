import { Button, Col, Container, Form, Row } from 'react-bootstrap'

import { ArrowsIcon } from './components/Icons'
import { AUTO_DETECT_LANGUAGE } from './utils/constants'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { useStore } from './hooks/useStore'

function App () {
  const {
    fromLanguage,
    toLanguage,
    text,
    translatedText,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setText,
    setTranslatedText
  } = useStore()

  return (
    <Container fluid>
      <h1>Google Translate</h1>
      <Row>
        <Col xs={12} md={5}>
          <LanguageSelector type={SectionType.From} value={fromLanguage} onChange={setFromLanguage} />
          <Form.Control
            as='textarea'
            className='mt-2'
            onChange={e => { setText(e.target.value) }}
            placeholder='Enter text to translate...'
            rows={6}
            size='lg'
            value={text}
            autoFocus
          />
        </Col>

        <Col xs={12} md={2}>
          <Button
            variant='link'
            onClick={interchangeLanguages}
            disabled={fromLanguage === AUTO_DETECT_LANGUAGE}
          >
            <ArrowsIcon />
          </Button>
        </Col>

        <Col xs={12} md={5}>
          <LanguageSelector type={SectionType.To} value={toLanguage} onChange={setToLanguage} />
          <Form.Control
            as='textarea'
            className='mt-2'
            onChange={e => { setTranslatedText(e.target.value) }}
            placeholder='Translated text...'
            rows={6}
            size='lg'
            value={translatedText}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App

import { Button, Col, Container, Row } from 'react-bootstrap'

import { ArrowsIcon, LanguageSelector, TextArea } from './components'
import { AUTO_DETECT_LANGUAGE } from './utils/constants'
import { SectionType } from './types.d'
import { useStore } from './hooks/useStore'

function App () {
  const {
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
  } = useStore()

  return (
    <Container fluid>
      <h1>Google Translate</h1>
      <Row>
        <Col xs={12} md={5}>
          <LanguageSelector type={SectionType.From} value={fromLanguage} onChange={setFromLanguage} />
          <TextArea
            type={SectionType.From}
            text={text}
            onChange={setText}
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
          <TextArea
            type={SectionType.To}
            loading={loading}
            text={translatedText}
            onChange={setTranslatedText}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App

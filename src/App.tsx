import { Button, Col, Container, Row } from 'react-bootstrap'
import { useEffect } from 'react'

import { ArrowsIcon, LanguageSelector, TextArea } from './components'
import { AUTO_DETECT_LANGUAGE } from './utils/constants'
import { SectionType } from './types.d'
import { translate } from './services/translate'
import { useDebounce, useStore } from './hooks'

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

  const debouncedText = useDebounce(text, 250)

  useEffect(() => {
    if (debouncedText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedText })
      .then((translatedTextResult) => {
        if (translatedTextResult === null || translatedTextResult === undefined) return
        setTranslatedText(translatedTextResult)
      })
      .catch(() => {
        setTranslatedText('Something went wrong')
      })
  }, [fromLanguage, toLanguage, debouncedText])

  return (
    <Container fluid>
      <h1>
        <span className='google-translate-icon' />
        <span className='google-translate-text'>Translate</span>
      </h1>
      <Row>
        <Col xs={12} md={5}>
          <LanguageSelector type={SectionType.From} value={fromLanguage} onChange={setFromLanguage} />
          <TextArea
            type={SectionType.From}
            text={text}
            onChange={setText}
          />
        </Col>

        <Col xs={12} md={2} className='px-0'>
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

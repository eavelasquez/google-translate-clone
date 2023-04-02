import { Button, Col, Container, Row } from 'react-bootstrap'

import { ArrowsIcon } from './components/Icons'
import { AUTO_DETECT_LANGUAGE } from './utils/constants'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types'
import { useStore } from './hooks/useStore'

function App () {
  const { fromLanguage, toLanguage, interchangeLanguages, setFromLanguage, setToLanguage } = useStore()

  return (
    <Container fluid>
      <h1>Google Translate</h1>
      <Row>
        <Col>
          <LanguageSelector type={SectionType.From} value={fromLanguage} onChange={setFromLanguage} />
        </Col>

        <Col>
          <Button
            variant='link'
            onClick={interchangeLanguages}
            disabled={fromLanguage === AUTO_DETECT_LANGUAGE}
          >
            <ArrowsIcon />
          </Button>
        </Col>

        <Col>
          <LanguageSelector type={SectionType.To} value={toLanguage} onChange={setToLanguage} />
        </Col>
      </Row>
    </Container>
  )
}

export default App

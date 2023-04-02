import { Button, Col, Container, Row } from 'react-bootstrap'

import { useStore } from './hooks/useStore'
import { AUTO_DETECT_LANGUAGE } from './utils/constants'
import { ArrowsIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'

function App () {
  const { fromLanguage, toLanguage, interchangeLanguages, setFromLanguage, setToLanguage } = useStore()

  return (
    <Container fluid>
      <h1>Google Translate</h1>
      <Row>
        <Col>
          <LanguageSelector type='from' value={fromLanguage} onChange={setFromLanguage} />
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
          <LanguageSelector type='to' value={toLanguage} onChange={setToLanguage} />
        </Col>
      </Row>
    </Container>
  )
}

export default App

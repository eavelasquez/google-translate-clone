import { Button, Col, Container, Row } from 'react-bootstrap'

import { useStore } from './hooks/useStore'
import { AUTO_DETECT_LANGUAGE } from './utils/constants'
import { ArrowsIcon } from './components/Icons'

function App () {
  const { fromLanguage, toLanguage, interchangeLanguages } = useStore()

  return (
    <Container fluid>
      <h1>Google Translate</h1>
      <Row>
        <Col>
          <h2>From Language</h2>
          <p>{fromLanguage}</p>
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
          <h2>To Language</h2>
          <p>{toLanguage}</p>
        </Col>
      </Row>
    </Container>
  )
}

export default App

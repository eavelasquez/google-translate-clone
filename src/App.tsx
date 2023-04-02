import { Button, Col, Container, Overlay, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { useEffect, useRef, useState } from 'react'

import { ArrowsIcon, LanguageSelector, TextArea } from './components'
import { AUTO_DETECT_LANGUAGE } from './utils/constants'
import { SectionType } from './types.d'
import { translate } from './services/translate'
import { useDebounce, useStore } from './hooks'
import { ClipboardIcon } from './components/Icons'

function App () {
  const [showClipboardTooltip, setShowClipboardTooltip] = useState(false)
  const targetClipboard = useRef(null)

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

  const handleClipboardClick = () => {
    setShowClipboardTooltip(!showClipboardTooltip)
    void navigator.clipboard.writeText(translatedText)
  }

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

          <div className='clipboard-icon'>
            <TextArea
              type={SectionType.To}
              loading={loading}
              text={translatedText}
              onChange={setTranslatedText}
            />
            <OverlayTrigger
              key={'right'}
              placement={'right'}
              overlay={
                <Tooltip id={'tooltip-right'}>
                  Copy to clipboard
                </Tooltip>
              }
              rootClose={true}
            >
              <Button ref={targetClipboard} variant='link' disabled={loading} onClick={handleClipboardClick}>
                <ClipboardIcon />
              </Button>
            </OverlayTrigger>
            <Overlay target={targetClipboard.current} show={showClipboardTooltip} placement='bottom' rootClose={true} onHide={() => { setShowClipboardTooltip(false) }}>
              {(props) => (
                <Tooltip id='overlay-cliboard' {...props}>
                  Copied to clipboard
                </Tooltip>
              )}
            </Overlay>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default App

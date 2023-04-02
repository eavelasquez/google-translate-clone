import { Button, Col, Container, Overlay, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { useEffect, useRef, useState } from 'react'

import { ArrowsIcon, ClearIcon, ClipboardIcon, LanguageSelector, SpeakerIcon, TextArea } from './components'
import { AUTO_DETECT_LANGUAGE, VOICE_LANGUAGES } from './utils/constants'
import { SectionType, type Language } from './types.d'
import { translate } from './services/translate'
import { useDebounce, useStore } from './hooks'

function App () {
  const [showClipboardTooltip, setShowClipboardTooltip] = useState(false)
  const targetClipboard = useRef(null)
  const targetSpeaker = useRef(null)

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

  const debouncedText = useDebounce(text, 320)

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

  const handleClearClick = () => {
    setText('')
    setTranslatedText('')
  }

  const handleShowClipboardTooltip = () => {
    setShowClipboardTooltip(false)
  }

  const handleClipboardClick = () => {
    setShowClipboardTooltip(!showClipboardTooltip)
    void navigator.clipboard.writeText(translatedText)
  }

  const handleSpeakerClick = ({ language }: { language: Language }) => {
    const utterance = new SpeechSynthesisUtterance(translatedText)
    utterance.lang = VOICE_LANGUAGES[language]
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <h1>
        <span className='google-translate-icon' />
        <span className='google-translate-text'>Translate</span>
      </h1>
      <Row>
        <Col xs={12} md={5}>
          <LanguageSelector
            type={SectionType.From}
            value={fromLanguage}
            onChange={setFromLanguage}
          />

          <div className='textarea-icon-buttons'>
            <TextArea
              type={SectionType.From}
              text={text}
              onChange={setText}
            />

            <div className='textarea-clear-button'>
              <Button
                variant='link'
                onClick={handleClearClick}
                disabled={text === ''}
                hidden={text === ''}
              >
                <ClearIcon />
              </Button>
            </div>

            <div className='textarea-icon-buttons-from'>
              <OverlayTrigger
                key={'right'}
                placement={'right'}
                overlay={
                  <Tooltip id={'tooltip-right'}>
                    Listen to the text
                  </Tooltip>
                }
                rootClose={true}
                transition={false}
              >
                <Button
                  ref={targetSpeaker}
                  variant='link'
                  hidden={text === '' || loading || fromLanguage === AUTO_DETECT_LANGUAGE}
                  onClick={() => {
                    if (fromLanguage === AUTO_DETECT_LANGUAGE) return
                    handleSpeakerClick({ language: fromLanguage })
                  }}
                >
                  <SpeakerIcon />
                </Button>
              </OverlayTrigger>
            </div>
          </div>
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
          <LanguageSelector
            type={SectionType.To}
            value={toLanguage}
            onChange={setToLanguage}
          />

          <div className='textarea-icon-buttons'>
            <TextArea
              type={SectionType.To}
              loading={loading}
              text={translatedText}
              onChange={setTranslatedText}
            />

            <div className='textarea-icon-buttons-to'>
              <>
                <OverlayTrigger
                  key={'right'}
                  placement={'right'}
                  overlay={
                    <Tooltip id={'tooltip-right'}>
                      Copy to clipboard
                    </Tooltip>
                  }
                  rootClose={true}
                  transition={false}
                >
                  <Button
                    ref={targetClipboard}
                    variant='link'
                    disabled={loading}
                    onClick={handleClipboardClick}
                    hidden={text === '' || loading}
                  >
                    <ClipboardIcon />
                  </Button>
                </OverlayTrigger>
                <Overlay
                  target={targetClipboard.current}
                  show={showClipboardTooltip}
                  placement='bottom'
                  rootClose={true}
                  onHide={handleShowClipboardTooltip}
                  transition={false}
                >
                  {(props) => (
                    <Tooltip id='overlay-cliboard' {...props}>
                      Copied to clipboard
                    </Tooltip>
                  )}
                </Overlay>
              </>

              <>
                <OverlayTrigger
                  key={'right'}
                  placement={'right'}
                  overlay={
                    <Tooltip id={'tooltip-right'}>
                      Listen to the translation
                    </Tooltip>
                  }
                  rootClose={true}
                  transition={false}
                >
                  <Button
                    ref={targetSpeaker}
                    variant='link'
                    hidden={text === '' || loading}
                    onClick={() => {
                      handleSpeakerClick({ language: toLanguage })
                    }}
                  >
                    <SpeakerIcon />
                  </Button>
                </OverlayTrigger>
              </>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default App

import { Button } from 'react-bootstrap'

import { useStore } from './hooks/useStore'

function App () {
  const { fromLanguage, setFromLanguage } = useStore()

  return (
    <div className='App'>
      <h1>Google Translate Clone</h1>

      <Button
        variant='link'
        onClick={() => { setFromLanguage('es') }}
      >
        Interchange
      </Button>

      <pre>{JSON.stringify({ fromLanguage }, null, 2)}</pre>
    </div>
  )
}

export default App

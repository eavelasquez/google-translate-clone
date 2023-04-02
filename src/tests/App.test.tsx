import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

// TODO: mock translate service: https://vitest.dev/guide/mocking.html#functions
test('my app works as expected', async () => {
  const user = userEvent.setup()
  const app = render(<App />)

  const textareaFrom = app.getByPlaceholderText('Text to translate...')

  await user.type(textareaFrom, 'Hola, Mundo')
  const result = await app.findByDisplayValue(/Hello, World/i, {}, { timeout: 2000 })

  expect(result).toBeTruthy()
})

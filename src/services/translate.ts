import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'

import { SUPPORTED_LANGUAGES } from '../utils/constants'
import { type FromLanguage, type Language } from '../types'

const apiKey = import.meta.env.VITE_OPENAI_API_KEY

const config = new Configuration({ apiKey })
const openai = new OpenAIApi(config)

/**
 * TODO: Add validations to the text
 * TODO: Move the openai request to the backend
 */
export async function translate ({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}) {
  if (fromLanguage === toLanguage) return text

  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: 'You are a AI that translates text. You receive a text from the user. Do not answer, just translate it. The original language is surrounded by `{{` and `}}`. You can also receive {{auto}} which means you have to detect the language automatically. The language you translate to is surrounded by `[[` and `]]`.'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'Hola, Mundo {{Español}} [[English]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Hello, World'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'How are you? {{auto}} [[Deutsch]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Wie geht es dir?'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'Bon dia, com estàs? {{auto}} [[Español]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Buenos días, ¿cómo estás?'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'Bonjour, comment allez-vous? {{auto}} [[日本語]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'おはようございます、元気ですか？'
    }
  ]

  const fromLanguageCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
  const toLanguageCode = SUPPORTED_LANGUAGES[toLanguage]

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      ...messages,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `${text} {{${fromLanguageCode}}} [[${toLanguageCode}]]`
      }
    ]
  })

  return completion.data.choices[0]?.message?.content
}

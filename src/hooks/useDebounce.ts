import { useEffect, useState } from 'react'

export function useDebounce<T> (value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // update debounced value after delay
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay ?? 500)

    // cancel the timeout if value changes (also on delay change or unmount)
    // this is how we prevent debounced value from updating if value is changed ...
    // .. within the delay period. Timeout gets cleared and restarted.
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay]) // only re-run the effect if value or delay changes

  return debouncedValue
}
